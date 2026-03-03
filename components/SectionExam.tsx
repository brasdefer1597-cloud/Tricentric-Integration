import React, { useState } from 'react';
import Modal from './ui/Modal';
import LoadingSpinner from './ui/LoadingSpinner';
import { useAnalysis } from '../hooks/useAnalysis';
import { supabase } from '../lib/supabase';
import { calculateXPGained, shouldUnlockAchievement } from '../lib/gamification';
import type { CenterType } from '../types';

interface SectionExamProps {
  onEvaluationComplete?: () => void;
}

const SectionExam: React.FC<SectionExamProps> = ({ onEvaluationComplete }) => {
  const [bleeding, setBleeding] = useState<CenterType | ''>('');
  const [sacrifice, setSacrifice] = useState<CenterType | ''>('');
  const [oxygen, setOxygen] = useState<string[]>([]);
  const [synthesis, setSynthesis] = useState<string>('');

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const { analyze, loading: analyzing } = useAnalysis();

  const handleOxygenChange = (value: string) => {
    setOxygen(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleAcceptReality = async () => {
    if (!bleeding || !sacrifice) {
      alert("Completa el diagnóstico y el sacrificio primero.");
      return;
    }

    const result = await analyze({
      type: 'misery',
      bleeding: bleeding as CenterType,
      sacrifice: sacrifice as CenterType,
      oxygen,
    });

    setAiAnalysis(result);
    setIsModalOpen(true);
  };

  const handleAnalyzeSynthesis = async () => {
    if (!synthesis.trim()) {
      alert("Escribe tu síntesis primero.");
      return;
    }

    const result = await analyze({
      type: 'synthesis',
      synthesis,
    });

    setAiAnalysis(result);
    setIsModalOpen(true);
  };

  const handleSaveEvaluation = async () => {
    if (!bleeding || !sacrifice || !synthesis.trim()) {
      alert("Completa todos los campos antes de guardar.");
      return;
    }

    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Debes iniciar sesión para guardar evaluaciones.");
        return;
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!profile) {
        await supabase.from('user_profiles').insert({ id: user.id });
      }

      const today = new Date().toISOString().split('T')[0];
      const lastEvalDate = profile?.last_evaluation_date;
      const isConsecutiveDay = lastEvalDate === new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = lastEvalDate === today ? profile.streak_days : (isConsecutiveDay ? profile.streak_days + 1 : 1);

      const xpGained = calculateXPGained(newStreak);
      const newXP = (profile?.experience_points || 0) + xpGained;
      const newTotalEvals = (profile?.total_evaluations || 0) + 1;

      await supabase.from('evaluations').insert({
        user_id: user.id,
        bleeding_center: bleeding,
        sacrifice_center: sacrifice,
        oxygen_actions: oxygen,
        synthesis_text: synthesis,
        ai_analysis: aiAnalysis || '',
        xp_earned: xpGained,
      });

      await supabase.from('user_profiles').update({
        experience_points: newXP,
        total_evaluations: newTotalEvals,
        streak_days: newStreak,
        last_evaluation_date: today,
      }).eq('id', user.id);

      const achievementKeys = ['first_blood', 'week_warrior', 'ten_evaluations', 'level_5'];
      for (const key of achievementKeys) {
        if (shouldUnlockAchievement(key, { totalEvaluations: newTotalEvals, currentLevel: 1, streakDays: newStreak })) {
          const { data: achievement } = await supabase.from('achievements').select('id').eq('key', key).maybeSingle();
          if (achievement) {
            await supabase.from('user_achievements').insert({ user_id: user.id, achievement_id: achievement.id }).then(() => {}).catch(() => {});
          }
        }
      }

      setBleeding('');
      setSacrifice('');
      setOxygen([]);
      setSynthesis('');
      setAiAnalysis(null);

      alert(`Evaluación guardada. +${xpGained} XP ganados.`);

      if (onEvaluationComplete) onEvaluationComplete();

    } catch (error) {
      console.error('Error saving evaluation:', error);
      alert('Error al guardar la evaluación.');
    } finally {
      setSaving(false);
    }
  };
  
  const OXYGEN_OPTIONS = [
    "5 minutos de respiración consciente (Cuerpo)",
    "Escribir 1 verdad cruda sin edulcorar (Corazón)",
    "Hacer 1 cálculo real de supervivencia (Cabeza)"
  ];

  const loading = analyzing || saving;

  return (
    <>
      {isModalOpen && aiAnalysis && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="DIAGNÓSTICO DE LA IA"
          icon="🎯"
        >
          <p className="whitespace-pre-line">{aiAnalysis}</p>
        </Modal>
      )}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-400">🎯 EXAMEN SRAP - REALIDAD CRUDA</h2>
        
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-red-800">
          <div className="text-center mb-8">
            <div className="breathing-crudo w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💀</span>
            </div>
            <p className="text-gray-400 italic mb-4">
              "La iluminación no es paz perpetua. Es saber que el miedo en el pecho,
              el cálculo mental y el temblor en las manos son la orquesta normal de estar vivo."
            </p>
            <p className="text-yellow-400 font-semibold">
              La sabiduría es no dejar que ninguno ahogue a los otros.
            </p>
          </div>

          {loading && (
            <div className="my-8">
              <LoadingSpinner message={saving ? 'GUARDANDO REALIDAD...' : 'ANALIZANDO...'} />
            </div>
          )}

          <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">1. DIAGNÓSTICO CRUDO</h3>
                    <p className="text-gray-300 mb-4">¿Cuál de los tres centros está sangrando MÁS hoy?</p>
                    
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'cabeza' as CenterType, label: 'Cabeza', icon: '🧠', ringColor: 'ring-blue-400', bgColor: 'bg-blue-900' },
                  { id: 'corazon' as CenterType, label: 'Corazón', icon: '💔', ringColor: 'ring-red-400', bgColor: 'bg-red-900' },
                  { id: 'cuerpo' as CenterType, label: 'Cuerpo', icon: '🦶', ringColor: 'ring-green-400', bgColor: 'bg-green-900' },
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setBleeding(item.id)}
                    className={`flex items-center space-x-3 p-3 ${item.bgColor} bg-opacity-20 rounded-lg cursor-pointer transition-all duration-200 ring-2 ${bleeding === item.id ? item.ringColor : 'ring-transparent'}`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-bold text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">2. SACRIFICIO CONSCIENTE</h3>
                    <p className="text-gray-300 mb-4">¿A qué centro le toca ceder HOY para que los otros dos sobrevivan?</p>
                    
              <select
                value={sacrifice}
                onChange={e => setSacrifice(e.target.value as CenterType)}
                className="w-full bg-black bg-opacity-50 text-white p-3 rounded-lg border border-red-600 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              >
                <option value="">Elige el sacrificio de hoy...</option>
                <option value="cabeza">Cabeza: Aceptar caos, dejar de controlar</option>
                <option value="corazon">Corazón: Postergar sueños, aceptar realidad</option>
                <option value="cuerpo">Cuerpo: Ignorar cansancio, seguir moviéndose</option>
              </select>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">3. OXÍGENO DE SUPERVIVENCIA</h3>
                    <p className="text-gray-300 mb-4">¿Qué acción mínima puede dar oxígeno al centro más ahogado?</p>
                    
                    <div className="space-y-3">
                      {OXYGEN_OPTIONS.map(opt => (
                        <label key={opt} className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${oxygen.includes(opt) ? 'bg-red-900 bg-opacity-40 border border-red-600' : 'bg-gray-700'}`}>
                            <input
                              type="checkbox"
                              checked={oxygen.includes(opt)}
                              onChange={() => handleOxygenChange(opt)}
                              className="w-5 h-5 text-red-500 bg-gray-800 border-gray-600 rounded focus:ring-red-500 accent-red-500"
                            />
                            <span className="text-sm text-gray-300">{opt}</span>
                        </label>
                      ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 p-6 bg-red-900 bg-opacity-20 border border-red-700 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">💎 INTEGRACIÓN CRUDA</h3>
                <textarea 
                    id="synthesis-text"
                    value={synthesis}
                    onChange={e => setSynthesis(e.target.value)}
                    placeholder='Escribe tu síntesis realista. Ejemplo: "Hoy el cuerpo sangra más. Sacrificaré el control mental (cabeza) para dar 10 minutos de descanso al cuerpo. El corazón esperará hasta mañana."'
                    className="w-full h-32 bg-black bg-opacity-50 border border-yellow-600 rounded-lg p-4 text-white focus:outline-none resize-none focus:ring-2 focus:ring-yellow-400 transition-all"
                ></textarea>
                
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleAcceptReality}
                disabled={loading}
                className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg transition-all pulse-realidad disabled:bg-gray-700 disabled:cursor-not-allowed disabled:animate-none"
              >
                💀 ACEPTAR REALIDAD
              </button>
              <button
                onClick={handleAnalyzeSynthesis}
                disabled={loading || !synthesis.trim()}
                className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg transition-all disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                🔬 ANALIZAR SÍNTESIS
              </button>
              <button
                onClick={handleSaveEvaluation}
                disabled={loading || !bleeding || !sacrifice || !synthesis.trim()}
                className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg transition-all disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                💾 GUARDAR
              </button>
            </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default SectionExam;

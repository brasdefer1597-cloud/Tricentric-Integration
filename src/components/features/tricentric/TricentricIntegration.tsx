import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';

interface Props {
  kofiUrl: string;
}

const CENTERS = [
  {
    id: 'head',
    name: 'HEAD',
    icon: '🧠',
    desc: 'Thought • Logic • Analysis',
    cardClasses: 'hover:border-blue-500 focus-within:border-blue-500',
    titleClasses: 'text-blue-400',
    textareaClasses: 'border-blue-900 focus:border-blue-500',
  },
  {
    id: 'heart',
    name: 'HEART',
    icon: '💖',
    desc: 'Emotion • Intuition • Values',
    cardClasses: 'hover:border-red-500 focus-within:border-red-500',
    titleClasses: 'text-red-400',
    textareaClasses: 'border-red-900 focus:border-red-500',
  },
  {
    id: 'body',
    name: 'BODY',
    icon: '🦶',
    desc: 'Sensation • Instinct • Somatic Wisdom',
    cardClasses: 'hover:border-green-500 focus-within:border-green-500',
    titleClasses: 'text-green-400',
    textareaClasses: 'border-green-900 focus:border-green-500',
  },
] as const;

export default function TricentricIntegration({ kofiUrl }: Props) {
  const [userId, setUserId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id);
    });
  }, []);

  const { refreshProfile } = useProfile(userId);

  useEffect(
    () => () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    },
    [intervalId],
  );

  const toggleBreathing = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setBreathingPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
      }, 2000);
      setIntervalId(id);
      return;
    }

    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setBreathingPhase('inhale');
  };

  const finalizePractice = async () => {
    if (!userId) {
      alert('Por favor, inicia sesión para guardar tu progreso.');
      return;
    }

    setLoading(true);

    try {
      const { error: profileError } = await supabase.rpc('increment_xp', {
        amount: 50,
        u_id: userId,
      });

      if (profileError) {
        throw profileError;
      }

      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('title', 'Tricentric Earthquake')
        .single();

      if (achievement) {
        await supabase.from('user_achievements').upsert({
          user_id: userId,
          achievement_id: achievement.id,
        });
      }

      await refreshProfile();

      alert('¡Práctica finalizada y progreso guardado! Redirigiendo a Kofi para la versión digital.');
      window.open(kofiUrl, '_blank');
    } catch (err) {
      console.error(err);
      alert('Error al guardar el progreso. Pero la realidad sigue ahí.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tricentric-integration p-6 max-w-6xl mx-auto bg-gray-900 rounded-2xl border border-purple-900 my-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-white bg-gradient-to-r from-blue-400 via-red-400 to-green-400 bg-clip-text text-transparent">
        🎯 Integración Tricéntrica
      </h2>

      <p className="text-center text-gray-400 mb-8 italic">
        "La sabiduría no se trata de suprimir voces, sino de dirigir el coro interno."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {CENTERS.map((center) => (
          <div
            key={center.name}
            className={`centro-card rounded-2xl p-6 border-2 border-transparent transition-all ${center.cardClasses}`}
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{center.icon}</div>
              <h3 id={`title-${center.id}`} className={`font-bold text-xl ${center.titleClasses}`}>{center.name}</h3>
              <p className="text-xs text-gray-500 uppercase">{center.desc}</p>
            </div>
            <textarea
              aria-labelledby={`title-${center.id}`}
              className={`w-full h-32 p-3 rounded-lg bg-black bg-opacity-40 text-white border outline-none resize-none ${center.textareaClasses}`}
              placeholder={`¿Qué piensa / siente / percibe tu ${center.name.toLowerCase()}?...`}
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 mb-8 text-center border border-gray-700">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">🌬️ Práctica de Respiración Consciente</h3>
        <div
          className={`w-32 h-32 bg-gradient-to-br from-blue-400 to-green-400 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-[2000ms] ease-in-out ${
            intervalId ? (breathingPhase === 'inhale' ? 'scale-125' : 'scale-100') : 'opacity-50'
          }`}
        >
          <span className="text-4xl" aria-hidden="true">🌊</span>
        </div>
        <div className="mb-6 text-gray-300 min-h-[1.5rem]" role="status" aria-live="polite">
          {!intervalId && 'Presiona el botón para comenzar'}
          {intervalId && (breathingPhase === 'inhale' ? '↑ Inhalando profundamente (2s)' : '↓ Exhalando lentamente (2s)')}
        </div>
        <button
          onClick={toggleBreathing}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all mb-4"
        >
          {intervalId ? 'Detener Práctica' : 'Iniciar Práctica'}
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-900 via-red-900 to-green-900 rounded-2xl p-8 text-center border border-yellow-600">
        <h3 id="synthesis-title" className="text-2xl font-bold mb-4 text-white">🔄 Síntesis Integradora</h3>
        <textarea
          aria-labelledby="synthesis-title"
          className="w-full h-24 bg-black bg-opacity-50 border border-yellow-500 rounded-lg p-4 text-white focus:outline-none mb-6 resize-none"
          placeholder="Integra las tres voces aquí..."
        />
        <button
          onClick={finalizePractice}
          disabled={loading}
          aria-label="Reclamar versión digital en Ko-fi (se abre en una nueva pestaña)"
          className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'GUARDANDO...' : 'RECLAMAR VERSIÓN DIGITAL EN KOFI'}
        </button>
      </div>
    </div>
  );
}

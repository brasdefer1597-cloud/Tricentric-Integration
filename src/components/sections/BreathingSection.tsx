import React, { useState, useEffect } from 'react';
import type { CenterType } from '@/types';

const OXYGEN_TYPES: Array<{ id: CenterType; label: string; icon: string; classes: string }> = [
  {
    id: 'head',
    label: 'Oxígeno Mental',
    icon: '🧠',
    classes: 'bg-blue-900/30 hover:bg-blue-800/40 text-blue-300 border-blue-500/30',
  },
  {
    id: 'heart',
    label: 'Oxígeno Emocional',
    icon: '💔',
    classes: 'bg-red-900/30 hover:bg-red-800/40 text-red-300 border-red-500/30',
  },
  {
    id: 'body',
    label: 'Oxígeno Físico',
    icon: '🦶',
    classes: 'bg-green-900/30 hover:bg-green-800/40 text-green-300 border-green-500/30',
  },
];

const BreathingSection: React.FC = () => {
  const [activeOxygen, setActiveOxygen] = useState<CenterType | null>(null);
  const [phase, setPhase] = useState<'Inhale' | 'Exhale'>('Inhale');

  useEffect(() => {
    if (!activeOxygen) return;

    const interval = setInterval(() => {
      setPhase(prev => prev === 'Inhale' ? 'Exhale' : 'Inhale');
    }, 2000); // 4s total cycle: 2s inhale, 2s exhale

    return () => clearInterval(interval);
  }, [activeOxygen]);

  return (
    <section className="py-20 bg-black/40 backdrop-blur-md" id="breathing">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
          🌬️ ¿DOLIÓ? BIEN. AHORA RESPIRA.
        </h2>
        <p className="text-gray-500 mb-10 font-medium">El aire es el único recurso gratuito que te queda.</p>

        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-10 border border-red-900/30 shadow-2xl relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
                backgroundImage: 'radial-gradient(circle, #dc2626 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}
          ></div>

          <div
            className={`relative w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center transition-all duration-[2000ms] ease-in-out border-4 ${
              activeOxygen
                ? (phase === 'Inhale' ? 'scale-125' : 'scale-100') + ' border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.3)]'
                : 'border-gray-800'
            }`}
            role="status"
            aria-live="polite"
          >
            <span className="text-4xl filter drop-shadow-md" aria-hidden="true">
                {activeOxygen ? (phase === 'Inhale' ? '🫁' : '🌬️') : '💀'}
            </span>
            {activeOxygen && (
                <div className="absolute -bottom-12 w-full text-center">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-red-500 animate-pulse">
                        {phase === 'Inhale' ? 'INHALA' : 'EXHALA'}
                    </span>
                </div>
            )}
          </div>

          <p className="text-gray-300 mb-10 max-w-md mx-auto leading-relaxed">
            <strong className="text-yellow-500 uppercase tracking-wider">DECIDE:</strong> ¿Cuál de los tres centros necesita más oxígeno HOY?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10" role="group" aria-label="Seleccionar centro para respirar">
            {OXYGEN_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveOxygen((prev) => (prev === type.id ? null : type.id))}
                aria-pressed={activeOxygen === type.id}
                className={`py-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-2 font-black uppercase tracking-widest text-xs border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${type.classes} ${activeOxygen === type.id ? 'border-yellow-500 scale-105 shadow-lg bg-opacity-60' : 'border-transparent'}`}
              >
                <span className="text-2xl" aria-hidden="true">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>

          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
            <p className="text-sm text-gray-400 italic leading-relaxed">
              "No hay respuesta correcta. Solo elecciones y sus consecuencias. La sabiduría está en elegir siendo consciente de lo que estás sacrificando."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreathingSection;

import React from 'react';

const TruthsSection: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
            Las 3 Verdades <span className="text-red-600">Crudas</span>
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-red-600 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'CABEZA (El Tirano)',
            desc: 'Tu mente quiere control total, planes perfectos y evitar el caos. Pero el control es una ilusión que te drena el oxígeno.',
            icon: '🧠',
            accent: 'border-blue-500/50',
            bg: 'bg-blue-900/10'
          },
          {
            title: 'CORAZÓN (El Mártir)',
            desc: 'Tus emociones quieren salvar al mundo, ser amadas y cumplir sueños. Pero el martirio sin estrategia es suicidio lento.',
            icon: '💔',
            accent: 'border-red-500/50',
            bg: 'bg-red-900/10'
          },
          {
            title: 'CUERPO (El Esclavo)',
            desc: 'Tu biología solo quiere sobrevivir, descansar y reproducirse. Ignorar sus quejas es la forma más rápida de colapso.',
            icon: '🦶',
            accent: 'border-green-500/50',
            bg: 'bg-green-900/10'
          }
        ].map((truth, i) => (
          <div
            key={i}
            className={`group relative p-8 rounded-[32px] border ${truth.accent} ${truth.bg} backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl shadow-black/50`}
          >
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse">
                {truth.icon}
            </div>
            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wider">{truth.title}</h3>
            <p className="text-gray-400 leading-relaxed font-medium">
              {truth.desc}
            </p>

            <div className="absolute top-4 right-4 opacity-10 font-black text-4xl select-none">
                0{i+1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TruthsSection;

import React from 'react';

const HeaderSection: React.FC = () => {
  return (
    <header className="relative text-center py-20 overflow-hidden bg-black">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-900/20 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="inline-block mb-4 px-3 py-1 border border-red-500/50 rounded-full bg-red-500/10 backdrop-blur-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500">System Ready / SRAP v2.0</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
          <span className="block text-white">SRAP</span>
          <span className="block bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text text-transparent animate-gradient-x">
            RAW REALITIES
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 font-medium text-gray-400 max-w-3xl mx-auto leading-relaxed italic">
          "Tu corazón quiere cambiar el mundo, tu cuerpo ruega descanso, y tu cabeza sabe que mañana vence el alquiler."
        </p>

        <nav aria-label="Acceso rápido" className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#exam"
            className="group relative px-8 py-4 bg-red-600 overflow-hidden rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-900/20"
          >
            <div className="absolute inset-0 w-3 bg-white/20 -skew-x-12 -translate-x-10 group-hover:translate-x-20 transition-transform duration-700"></div>
            <span className="relative font-black text-white uppercase tracking-widest text-sm">Ir al Examen</span>
          </a>

          <a
            href="#integration"
            className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-black text-white uppercase tracking-widest text-sm"
          >
            Integración
          </a>
        </nav>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;

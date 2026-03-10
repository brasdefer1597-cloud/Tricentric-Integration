import React from 'react';

interface LevelBadgeProps {
  level: number;
  xp: number;
  nextLevelXP: number;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level, xp, nextLevelXP }) => {
  const progress = (xp / nextLevelXP) * 100;

  return (
    <div className="relative inline-block group" role="img" aria-label={`Nivel ${level}. Progreso: ${Math.round(progress)}%`}>
      <div className="bg-gradient-to-br from-yellow-500 via-red-600 to-black rounded-3xl p-[2px] shadow-2xl transition-transform duration-500 group-hover:scale-110">
        <div className="bg-black rounded-[22px] p-6 min-w-[100px] text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-1 opacity-80" aria-hidden="true">LVL</div>
            <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {level}
            </div>
          </div>
        </div>
      </div>

      {/* Mini circular progress indicator */}
      <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gray-900 rounded-full border-2 border-gray-800 flex items-center justify-center p-1 shadow-xl" aria-hidden="true">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-gray-800"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-yellow-500 transition-all duration-1000"
            strokeWidth="3"
            strokeDasharray="100 100"
            strokeDashoffset={100 - progress}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[8px] font-black text-yellow-500">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default LevelBadge;

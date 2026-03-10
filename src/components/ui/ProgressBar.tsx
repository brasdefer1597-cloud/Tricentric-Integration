import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  color?: 'red' | 'yellow' | 'green' | 'blue';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  color = 'red'
}) => {
  const percentage = Math.min((current / max) * 100, 100);

  const colorClasses = {
    red: 'from-red-600 to-red-400 shadow-red-900/20',
    yellow: 'from-yellow-600 to-yellow-400 shadow-yellow-900/20',
    green: 'from-green-600 to-green-400 shadow-green-900/20',
    blue: 'from-blue-600 to-blue-400 shadow-blue-900/20',
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-3">
        {label && (
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{label}</span>
        )}
        <span className="text-xs font-black text-white bg-gray-800 px-2 py-1 rounded-md border border-gray-700">
          {current} / {max} XP
        </span>
      </div>

      <div
        className="w-full h-4 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-1000 ease-in-out relative shadow-lg`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated pattern inside progress bar */}
          <div
            className="absolute inset-0 opacity-30 animate-[shimmer_2s_linear_infinite]"
            style={{
                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
                backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

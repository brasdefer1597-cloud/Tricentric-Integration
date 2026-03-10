import React from 'react';
import LevelBadge from '@/components/ui/LevelBadge';
import ProgressBar from '@/components/ui/ProgressBar';
import { getLevelTitle } from '@/lib/gamification';
import type { GamificationState } from '@/types';

interface GamificationDashboardProps {
  state: GamificationState;
}

const GamificationDashboard: React.FC<GamificationDashboardProps> = ({ state }) => {
  const { level, xp, nextLevelXP, streak, totalEvaluations, recentAchievements } = state;

  return (
    <div className="relative bg-black border border-white/5 rounded-[40px] p-8 md:p-10 shadow-2xl overflow-hidden group">
      {/* Background decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-auto">
          <LevelBadge level={level} xp={xp} nextLevelXP={nextLevelXP} />

          <div className="text-center sm:text-left">
            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter group-hover:text-red-500 transition-colors">
              {getLevelTitle(level)}
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-black rounded-full border border-yellow-500/20 uppercase tracking-[0.2em]">
                    Active Warrior
                </span>
                <span className="text-gray-500 text-xs font-bold">
                    {xp} / {nextLevelXP} XP Total
                </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/5 text-center transition-all hover:bg-white/10">
            <div className="text-4xl font-black text-white mb-1">{totalEvaluations}</div>
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Evaluations</div>
          </div>

          <div className="bg-red-600/10 backdrop-blur-sm p-6 rounded-3xl border border-red-500/20 text-center transition-all hover:bg-red-600/20">
            <div className="text-4xl font-black text-red-500 mb-1">{streak}</div>
            <div className="text-[10px] text-red-500/60 font-black uppercase tracking-widest">Day Streak</div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ProgressBar
          current={xp}
          max={nextLevelXP}
          label="Progreso de Realidad"
          color="red"
        />
      </div>

      {recentAchievements.length > 0 && (
        <div className="mt-12 border-t border-white/5 pt-8">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">LOGROS RECIENTES</h4>
                <div className="h-px flex-1 bg-white/5 mx-4" aria-hidden="true"></div>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recentAchievements.map((ua) => (
              <div
                key={ua.id}
                className="bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl p-4 flex items-center gap-4 border border-white/5 transition-all group/item"
                title={ua.achievement?.description}
              >
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-2xl border border-white/5 shadow-inner group-hover/item:scale-110 transition-transform">
                    {ua.achievement?.icon}
                </div>
                <div>
                  <div className="text-sm font-black text-white uppercase tracking-tight">
                    {ua.achievement?.title}
                  </div>
                  <div className="text-[10px] font-bold text-yellow-500">
                    +{ua.achievement?.xp_reward} XP UNLOCKED
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationDashboard;

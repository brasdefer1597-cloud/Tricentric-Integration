import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { calculateXPGained, shouldUnlockAchievement, calculateLevel } from '@/lib/gamification';
import type { CenterType } from '@/types';

export function useEvaluation(onComplete?: () => void) {
  const [saving, setSaving] = useState(false);

  const saveEvaluation = async (data: {
    bleeding: CenterType;
    sacrifice: CenterType;
    oxygen: string[];
    synthesis: string;
    aiAnalysis: string | null;
  }) => {
    const { bleeding, sacrifice, oxygen, synthesis, aiAnalysis } = data;
    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

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
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isConsecutiveDay = lastEvalDate === yesterday;
      const newStreak = lastEvalDate === today ? (profile?.streak_days || 0) : (isConsecutiveDay ? (profile?.streak_days || 0) + 1 : 1);

      const xpGained = calculateXPGained(newStreak);
      const newXP = (profile?.experience_points || 0) + xpGained;
      const newTotalEvals = (profile?.total_evaluations || 0) + 1;
      const newLevel = calculateLevel(newXP);

      // 1. Insert Evaluation
      await supabase.from('evaluations').insert({
        user_id: user.id,
        bleeding_center: bleeding,
        sacrifice_center: sacrifice,
        oxygen_actions: oxygen,
        synthesis_text: synthesis,
        ai_analysis: aiAnalysis || '',
        xp_earned: xpGained,
      });

      // 2. Update Profile
      await supabase.from('user_profiles').update({
        experience_points: newXP,
        total_evaluations: newTotalEvals,
        streak_days: newStreak,
        last_evaluation_date: today,
        current_level: newLevel,
      }).eq('id', user.id);

      // 3. Check Achievements
      const achievementKeys = ['first_blood', 'week_warrior', 'ten_evaluations', 'level_5', 'level_10'];
      for (const key of achievementKeys) {
        if (shouldUnlockAchievement(key, {
            totalEvaluations: newTotalEvals,
            currentLevel: newLevel,
            streakDays: newStreak
        })) {
          const { data: achievement } = await supabase.from('achievements').select('id').eq('key', key).maybeSingle();
          if (achievement) {
            await supabase.from('user_achievements').upsert({
              user_id: user.id,
              achievement_id: achievement.id,
            }, { onConflict: 'user_id,achievement_id' });
          }
        }
      }

      if (onComplete) onComplete();
      return { success: true, xpGained };

    } catch (error) {
      console.error('Error saving evaluation:', error);
      return { success: false, error };
    } finally {
      setSaving(false);
    }
  };

  return { saveEvaluation, saving };
}

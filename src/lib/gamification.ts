// Gamification engine - XP calculations and level progression
// CENTRALIZED SRAP LOGIC - Chalamandra Magistral Edition

export const LEVEL_CONFIG = {
  MAX_LEVEL: 10,
  BASE_XP_PER_EVALUATION: 50,
  STREAK_BONUS_PER_DAY: 10,
  XP_CURVE: [
    0,      // Level 1
    100,    // Level 2
    250,    // Level 3
    500,    // Level 4
    850,    // Level 5
    1300,   // Level 6
    1900,   // Level 7
    2700,   // Level 8
    3750,   // Level 9
    5000,   // Level 10
  ]
};

export const ACHIEVEMENT_KEYS = [
  'first_blood',
  'week_warrior',
  'month_survivor',
  'level_5',
  'level_10',
  'ten_evaluations',
  'honest_synthesis'
];

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_CONFIG.XP_CURVE.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_CONFIG.XP_CURVE[i]) {
      return i + 1;
    }
  }
  return 1;
}

export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= LEVEL_CONFIG.MAX_LEVEL) {
    return LEVEL_CONFIG.XP_CURVE[LEVEL_CONFIG.MAX_LEVEL - 1];
  }
  return LEVEL_CONFIG.XP_CURVE[currentLevel];
}

export function calculateXPGained(streakDays: number, hasHonestSynthesis: boolean = false): number {
  let xp = LEVEL_CONFIG.BASE_XP_PER_EVALUATION;
  xp += Math.min(streakDays, 30) * LEVEL_CONFIG.STREAK_BONUS_PER_DAY; // Cap streak bonus
  if (hasHonestSynthesis) xp += 50;
  return xp;
}

export function shouldUnlockAchievement(
  achievementKey: string,
  userStats: {
    totalEvaluations: number;
    currentLevel: number;
    streakDays: number;
  }
): boolean {
  const conditions: Record<string, boolean> = {
    'first_blood': userStats.totalEvaluations >= 1,
    'week_warrior': userStats.streakDays >= 7,
    'month_survivor': userStats.streakDays >= 30,
    'level_5': userStats.currentLevel >= 5,
    'level_10': userStats.currentLevel >= 10,
    'ten_evaluations': userStats.totalEvaluations >= 10,
  };

  return conditions[achievementKey] || false;
}

export function getLevelTitle(level: number): string {
  const titles = [
    'Salamandra Perdida',      // 1
    'Novicia del Dolor',       // 2
    'Malandra en Práctica',    // 3
    'Guerrera Fresa',          // 4
    'Decodificadora Chola',    // 5
    'Maestra de Sombras',      // 6
    'Sobreviviente Magistral', // 7
    'Comandante Salamandra',   // 8
    'Leyenda de Realidad',     // 9
    'Chalamandra Magistral',   // 10
  ];

  return titles[level - 1] || titles[0];
}

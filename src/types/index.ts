export type NavTab = 'inicio' | 'diccionario' | 'simulador' | 'progreso' | 'perfil';

export interface UserState {
  name: string;
  level: number;
  levelName: string;
  currentXP: number;
  nextLevelXP: number;
  streakDays: number;
  claimedStreakReward: boolean;
  avatarUrl: string;
  completedLessons: string[];
  bookmarkedTerms: string[];
  unlockedAchievements: string[];
  currencySymbol: string;
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpBonus: number;
}

export interface TopicLesson {
  id: string;
  category: string;
  categoryKey: 'ahorro' | 'tarjetas' | 'prestamos' | 'servicios';
  badge: string;
  title: string;
  desc: string;
  icon: string;
  durationMin: number;
  xpReward: number;
  conceptTitle: string;
  conceptDesc: string;
  audioDuration: string;
  explanationList: { title: string; desc: string }[];
  takeaway: string;
  quiz: LessonQuiz;
  audioUrl?: string;
}

export interface DictionaryTerm {
  id: string;
  sigla: string;
  name: string;
  category: 'siglas' | 'tarjetas' | 'prestamos' | 'ahorro' | 'gastos';
  shortDesc: string;
  badge: string;
  isPopular?: boolean;
  explanation: string;
  ruleOfGold: string;
  realWorldExample: string;
  bankTrap: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  category: string;
  xpReward: number;
  description: string;
  completed: boolean;
  progressText?: string;
  canClaim?: boolean;
}

export interface DailyMission {
  id: string;
  title: string;
  xp: number;
  completed: boolean;
  actionTab: NavTab;
}

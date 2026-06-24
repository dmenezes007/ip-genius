export interface UserStats {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedMissions: number;
  rankPos: number;
  streak: number;
  totalBadges: number;
  email: string;
}

export type MissionCategory = 'diaria' | 'semanal' | 'especial';
export type MissionStatus = 'pendente' | 'em_andamento' | 'concluida';

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: MissionCategory;
  progress: number;
  requirement: number;
  status: MissionStatus;
  iconName: string;
}

export type Rarity = 'comum' | 'raro' | 'lendario';

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  iconName: string;
  unlocked: boolean;
  dateUnlocked?: string;
  rarity: Rarity;
}

export interface RankPlayer {
  id: string;
  name: string;
  level: number;
  xp: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  xpGained?: number;
  type: 'missao' | 'emblema' | 'nivel' | 'diario';
}

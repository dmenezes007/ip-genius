import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { User } from '@supabase/supabase-js';
import { UserStats, Mission, Badge, ActivityLog } from './types';
import Dashboard from './components/Dashboard';
import Missions from './components/Missions';
import Ranking from './components/Ranking';
import Badges from './components/Badges';
import Profile from './components/Profile';
import Rewards from './components/Rewards';
import ModalAchievement from './components/ModalAchievement';
import AuraIcon from './components/AuraIcon';
import AuthScreen from './components/AuthScreen';
import { isCloudEnabled } from './lib/supabase';
import {
  STORAGE_KEYS,
  clearLocalSnapshot,
  getCurrentUser,
  loadRemoteState,
  onAuthChanged,
  readLocalSnapshot,
  saveRemoteState,
  signIn,
  signOut,
  signUp,
  writeLocalSnapshot,
  type PersistedAuraState,
} from './services/cloudState';

// Mock Initial Data sets
const INITIAL_STATS: UserStats = {
  name: 'Davison Menezes',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  level: 4,
  xp: 450,
  xpToNextLevel: 1000,
  completedMissions: 8,
  rankPos: 5,
  streak: 3,
  totalBadges: 2,
  email: 'davison.menezes@gmail.com'
};

const INITIAL_MISSIONS: Mission[] = [
  // Dailies
  { id: 'd1', title: 'Meditação Solar', description: 'Logue 10 min de respiração consciente', xpReward: 150, category: 'diaria', progress: 0, requirement: 1, status: 'pendente', iconName: 'brain' },
  { id: 'd2', title: 'Passos da Jornada', description: 'Caminhe ao menos 5.050 passos hoje', xpReward: 200, category: 'diaria', progress: 1, requirement: 2, status: 'em_andamento', iconName: 'target' },
  { id: 'd3', title: 'Foco Profissional', description: 'Pratique 20 min de estudos de design ou código', xpReward: 180, category: 'diaria', progress: 0, requirement: 1, status: 'pendente', iconName: 'game' },
  // Weeklies
  { id: 'w1', title: 'Inabalável', description: 'Complete 5 desafios diários consecutivos', xpReward: 600, category: 'semanal', progress: 3, requirement: 5, status: 'em_andamento', iconName: 'flame' },
  { id: 'w2', title: 'Evolução Intelectual', description: 'Estude 15 capítulos ou artigos técnicos', xpReward: 450, category: 'semanal', progress: 6, requirement: 15, status: 'em_andamento', iconName: 'compass' },
  { id: 'w3', title: 'Mente Ativa, Corpo Sãos', description: 'Treine musculação ou aeróbico no aplicativo', xpReward: 500, category: 'semanal', progress: 3, requirement: 3, status: 'em_andamento', iconName: 'heart' }, // will be claimable
  // Specials
  { id: 's1', title: 'Pioneiro da Aura', description: 'Suba para o Nível 5 de progresso pessoal', xpReward: 1000, category: 'especial', progress: 4, requirement: 5, status: 'em_andamento', iconName: 'sparkles' },
  { id: 's2', title: 'Embaixador da Guia', description: 'Convide 3 novos heróis usando link promocional', xpReward: 800, category: 'especial', progress: 0, requirement: 3, status: 'pendente', iconName: 'shield' },
  { id: 's3', title: 'Olho de Lince', description: 'Complete um total de 15 missões diárias', xpReward: 1200, category: 'especial', progress: 8, requirement: 15, status: 'em_andamento', iconName: 'trophy' }
];

const INITIAL_BADGES: Badge[] = [
  { id: 'b1', name: 'Primeiro Passo', description: 'Complete sua primeira missão diária na plataforma Aura com sucesso total.', category: 'Social', iconName: 'zap', unlocked: true, dateUnlocked: '20 Jun 2026', rarity: 'comum' },
  { id: 'b2', name: 'Chama Ativa', description: 'Mantenha sua sequência diária ativa por 3 dias seguidos ou mais.', category: 'Evolução', iconName: 'flame', unlocked: true, dateUnlocked: '20 Jun 2026', rarity: 'comum' },
  { id: 'b3', name: 'Mestre Semanal', description: 'Resgate o bônus de conclusão de 3 tarefas semanais inteiras.', category: 'Missões', iconName: 'award', unlocked: false, rarity: 'raro' },
  { id: 'b4', name: 'Nível Lendário', description: 'Atinja o Nível 5 ou mais de progresso em sua conta pessoal.', category: 'Evolução', iconName: 'sparkles', unlocked: false, rarity: 'lendario' },
  { id: 'b5', name: 'Pá de Ouro', description: 'Resgate o seu primeiro cupom/mimo oficial na loja da comunidade.', category: 'Carteira', iconName: 'gift', unlocked: false, rarity: 'raro' },
  { id: 'b6', name: 'Mestre da Mente', description: 'Complete 10 missões com o ícone de respiração e foco.', category: 'Foco', iconName: 'brain', unlocked: false, rarity: 'lendario' }
];

const INITIAL_REWARDS = [
  { id: 'r1', title: 'Voucher Starbucks', description: 'Bônus de R$ 25,00 para qualquer café expresso ou frapê.', cost: 650, iconName: 'coins', category: 'voucher' as const, claimed: false },
  { id: 'r2', title: 'Spotify Premium', description: 'Cupom de 1 mês grátis para aproveitar músicas offline.', cost: 1200, iconName: 'gift', category: 'voucher' as const, claimed: false },
  { id: 'r3', title: 'Gamer Pass Pro', description: 'Ingresso exclusivo de sorteio para ganhar um Xbox Series S.', cost: 300, iconName: 'target', category: 'game' as const, claimed: false },
  { id: 'r4', title: 'Avatar Dourado', description: 'Borda dourada animada de alta raridade para seu card pessoal.', cost: 500, iconName: 'sparkles', category: 'social' as const, claimed: false }
];

const INITIAL_ACTIVITIES: ActivityLog[] = [
  { id: 'l1', title: 'Plano Ativado!', description: 'Você iniciou os treinos e ingressou na carteira do progresso Aura.', timestamp: 'Ontem, 10:30', xpGained: 300, type: 'diario' },
  { id: 'l2', title: 'Emblema Desbloqueado', description: 'Parabéns, você conquistou "Primeiro Passo".', timestamp: 'Ontem, 14:20', type: 'emblema' },
  { id: 'l3', title: 'Ofensiva Aumentada', description: 'Você logou 3 dias seguidos. Continue firme!', timestamp: 'Hoje, 08:35', type: 'diario' }
];

type AppTab = 'inicio' | 'missoes' | 'ranking' | 'emblemas' | 'perfil' | 'recompensas';

function getDisplayNameFromUser(user: User | null): string {
  if (!user) return 'Novo Usuario';

  const metadataName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.user_metadata?.display_name;

  if (typeof metadataName === 'string' && metadataName.trim().length > 0) {
    return metadataName.trim();
  }

  const emailPrefix = user.email?.split('@')[0]?.replace(/[._-]+/g, ' ');
  if (emailPrefix && emailPrefix.trim().length > 0) {
    return emailPrefix
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  return 'Novo Usuario';
}

function buildInitialSnapshot(user: User | null): PersistedAuraState {
  const baseMissions = INITIAL_MISSIONS.map((mission) => ({
    ...mission,
    progress: 0,
    status: 'pendente' as const,
  }));

  const baseBadges = INITIAL_BADGES.map((badge) => ({
    ...badge,
    unlocked: false,
    dateUnlocked: undefined,
  }));

  const personalizedStats: UserStats = {
    ...INITIAL_STATS,
    name: getDisplayNameFromUser(user),
    email: user?.email ?? '',
    level: 1,
    xp: 0,
    completedMissions: 0,
    rankPos: 0,
    streak: 0,
    totalBadges: 0,
  };

  return {
    aura_user_stats: personalizedStats,
    aura_missions: baseMissions,
    aura_badges: baseBadges,
    aura_rewards: INITIAL_REWARDS.map((reward) => ({ ...reward, claimed: false })),
    aura_activities: [],
  };
}

function applyUserIdentity(snapshot: PersistedAuraState, user: User | null): PersistedAuraState {
  const currentStats = snapshot.aura_user_stats as UserStats | null;
  if (!currentStats || !user) return snapshot;

  const nextStats: UserStats = {
    ...currentStats,
    name: getDisplayNameFromUser(user),
    email: user.email ?? currentStats.email,
  };

  return {
    ...snapshot,
    aura_user_stats: nextStats,
  };
}

function hasCompleteSnapshot(snapshot: PersistedAuraState | null): snapshot is PersistedAuraState {
  if (!snapshot) return false;
  return (
    snapshot.aura_user_stats !== null &&
    snapshot.aura_missions !== null &&
    snapshot.aura_badges !== null &&
    snapshot.aura_rewards !== null &&
    snapshot.aura_activities !== null
  );
}

export default function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(!isCloudEnabled);
  const [bootstrapped, setBootstrapped] = useState(!isCloudEnabled);
  const [authLoading, setAuthLoading] = useState(false);
  const [appVersion, setAppVersion] = useState(0);
  const [syncError, setSyncError] = useState<string | null>(null);
  const lastSavedSnapshotRef = useRef('');

  useEffect(() => {
    if (!isCloudEnabled) return;

    let alive = true;
    getCurrentUser()
      .then((user) => {
        if (!alive) return;
        setAuthUser(user);
        setAuthReady(true);
      })
      .catch(() => {
        if (!alive) return;
        setAuthReady(true);
      });

    const subscription = onAuthChanged((user) => {
      setAuthUser(user);
      setBootstrapped(false);
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isCloudEnabled) return;
    if (!authReady) return;
    if (!authUser) {
      setBootstrapped(false);
      return;
    }

    let cancelled = false;

    const bootstrap = async () => {
      try {
        const remote = await loadRemoteState(authUser.id);
        if (cancelled) return;

        if (hasCompleteSnapshot(remote)) {
          const normalizedRemote = applyUserIdentity(remote, authUser);
          writeLocalSnapshot(normalizedRemote);
          await saveRemoteState(authUser.id, normalizedRemote);
        } else {
          const local = readLocalSnapshot();
          if (hasCompleteSnapshot(local)) {
            const normalizedLocal = applyUserIdentity(local, authUser);
            writeLocalSnapshot(normalizedLocal);
            await saveRemoteState(authUser.id, normalizedLocal);
          } else {
            const initial = buildInitialSnapshot(authUser);
            writeLocalSnapshot(initial);
            await saveRemoteState(authUser.id, initial);
          }
        }

        lastSavedSnapshotRef.current = JSON.stringify(readLocalSnapshot());
        setAppVersion((prev) => prev + 1);
        setBootstrapped(true);
        setSyncError(null);
      } catch {
        if (cancelled) return;
        setSyncError('Não foi possível sincronizar seus dados em nuvem.');
        setBootstrapped(true);
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [authReady, authUser]);

  useEffect(() => {
    if (!isCloudEnabled || !authUser || !bootstrapped) return;

    const syncTimer = setInterval(async () => {
      const snapshot = readLocalSnapshot();
      if (!hasCompleteSnapshot(snapshot)) return;

      const serialized = JSON.stringify(snapshot);
      if (serialized === lastSavedSnapshotRef.current) return;

      try {
        await saveRemoteState(authUser.id, snapshot);
        lastSavedSnapshotRef.current = serialized;
        setSyncError(null);
      } catch {
        setSyncError('Falha ao salvar alterações em nuvem. Tentaremos novamente.');
      }
    }, 2500);

    return () => clearInterval(syncTimer);
  }, [authUser, bootstrapped]);

  const handleSignIn = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      await signUp(email, password);
      await signIn(email, password);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    clearLocalSnapshot();
    setAuthUser(null);
    setBootstrapped(false);
  };

  if (isCloudEnabled && !authReady) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">Preparando autenticação...</div>;
  }

  if (isCloudEnabled && authReady && !authUser) {
    return <AuthScreen onSignIn={handleSignIn} onSignUp={handleSignUp} loading={authLoading} />;
  }

  if (isCloudEnabled && !bootstrapped) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">Sincronizando seus dados...</div>;
  }

  return <LocalApp snapshotVersion={appVersion} cloudMode={isCloudEnabled} syncError={syncError} onSignOut={handleSignOut} />;
}

function LocalApp({
  snapshotVersion,
  cloudMode,
  syncError,
  onSignOut,
}: {
  snapshotVersion: number;
  cloudMode: boolean;
  syncError: string | null;
  onSignOut: () => void;
}) {
  const logoSrc = `${import.meta.env.BASE_URL}logo-ip-genius.png`;

  // Sync core systems with LocalStorage
  const [stats, setStats] = useState<UserStats>(() => {
    const cached = localStorage.getItem(STORAGE_KEYS.stats);
    return cached ? JSON.parse(cached) : INITIAL_STATS;
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const cached = localStorage.getItem(STORAGE_KEYS.missions);
    return cached ? JSON.parse(cached) : INITIAL_MISSIONS;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const cached = localStorage.getItem(STORAGE_KEYS.badges);
    return cached ? JSON.parse(cached) : INITIAL_BADGES;
  });

  const [rewards, setRewards] = useState(() => {
    const cached = localStorage.getItem(STORAGE_KEYS.rewards);
    return cached ? JSON.parse(cached) : INITIAL_REWARDS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const cached = localStorage.getItem(STORAGE_KEYS.activities);
    return cached ? JSON.parse(cached) : INITIAL_ACTIVITIES;
  });

  useEffect(() => {
    const cachedStats = localStorage.getItem(STORAGE_KEYS.stats);
    const cachedMissions = localStorage.getItem(STORAGE_KEYS.missions);
    const cachedBadges = localStorage.getItem(STORAGE_KEYS.badges);
    const cachedRewards = localStorage.getItem(STORAGE_KEYS.rewards);
    const cachedActivities = localStorage.getItem(STORAGE_KEYS.activities);

    setStats(cachedStats ? JSON.parse(cachedStats) : INITIAL_STATS);
    setMissions(cachedMissions ? JSON.parse(cachedMissions) : INITIAL_MISSIONS);
    setBadges(cachedBadges ? JSON.parse(cachedBadges) : INITIAL_BADGES);
    setRewards(cachedRewards ? JSON.parse(cachedRewards) : INITIAL_REWARDS);
    setActivityLogs(cachedActivities ? JSON.parse(cachedActivities) : INITIAL_ACTIVITIES);
  }, [snapshotVersion]);

  // Navigation states
  const [activeTab, setActiveTab] = useState<AppTab>('inicio');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Celebrating overlays
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<{
    title: string;
    subtitle: string;
    icon: string;
    type: 'nivel' | 'emblema' | 'compra';
  }>({ title: '', subtitle: '', icon: 'sparkles', type: 'nivel' });

  // Real-time dynamic clock state
  const [timeStr, setTimeStr] = useState('12:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Write changes back to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.missions, JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.badges, JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.rewards, JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Method to insert a new activity log
  const pushActivity = (title: string, description: string, type: 'missao' | 'emblema' | 'nivel' | 'diario', xpGained?: number) => {
    const now = new Date();
    const timeLabel = 'Hoje, ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const newLog: ActivityLog = {
      id: `l_dyn_${Date.now()}`,
      title,
      description,
      timestamp: timeLabel,
      type,
      xpGained
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Helper trigger action when client completes/makes progress on a mission
  const handleCompleteMission = (id: string) => {
    const missionIndex = missions.findIndex((m) => m.id === id);
    if (missionIndex === -1) return;

    const mission = missions[missionIndex];
    if (mission.status === 'concluida') return;

    // Mutated references
    let updatedMissions = [...missions];
    let newProgress = mission.progress + 1;
    let earnedXP = 0;
    let didCompleteNow = false;

    // Check if the mission is instantly completable (progress >= requirement)
    if (newProgress >= mission.requirement) {
      newProgress = mission.requirement;
      
      // If it is already fully progressed and they clicked "Resgatar"
      if (mission.progress === mission.requirement) {
        // Redeem!
        earnedXP = mission.xpReward;
        updatedMissions[missionIndex] = {
          ...mission,
          progress: newProgress,
          status: 'concluida'
        };
        didCompleteNow = true;
      } else {
        // Just progressed to max, now wait for Claim ("Resgatar")
        updatedMissions[missionIndex] = {
          ...mission,
          progress: newProgress
        };
      }
    } else {
      // Just normal progression step
      updatedMissions[missionIndex] = {
        ...mission,
        progress: newProgress,
        status: 'em_andamento'
      };
    }

    setMissions(updatedMissions);

    // If they just claimed points: update state, check level-up and unlock-badges!
    if (didCompleteNow && earnedXP > 0) {
      pushActivity(
        `Missão Concluída!`,
        `Você resgatou o prêmio da tarefa "${mission.title}"`,
        'missao',
        earnedXP
      );

      // Mutate stats
      let nextLevel = stats.level;
      let nextXP = stats.xp + earnedXP;
      let nextXPToLevel = stats.xpToNextLevel;
      let triggerLevelUp = false;

      if (nextXP >= nextXPToLevel) {
        nextLevel += 1;
        nextXP = nextXP - nextXPToLevel;
        nextXPToLevel = Math.round(nextXPToLevel * 1.35);
        triggerLevelUp = true;
      }

      // Check Special badge trackers
      let newBadges = [...badges];
      let unlockedBadgeTriggered: Badge | null = null;

      // Rule A: Level Up to level 5 triggers 'Nível Lendário' badge
      if (triggerLevelUp && nextLevel >= 5) {
        const bLevelIndex = newBadges.findIndex((b) => b.id === 'b4');
        if (bLevelIndex !== -1 && !newBadges[bLevelIndex].unlocked) {
          const unlockedBadge = {
            ...newBadges[bLevelIndex],
            unlocked: true,
            dateUnlocked: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
          };
          newBadges[bLevelIndex] = unlockedBadge;
          unlockedBadgeTriggered = unlockedBadge;
        }
      }

      // Rule B: Complete 3 weekly missions triggers 'Mestre Semanal' badge
      // Count completed weeklies
      const completedWeekliesCount = updatedMissions.filter(m => m.category === 'semanal' && m.status === 'concluida').length;
      if (completedWeekliesCount >= 3) {
        const bWeekIndex = newBadges.findIndex((b) => b.id === 'b3');
        if (bWeekIndex !== -1 && !newBadges[bWeekIndex].unlocked) {
          const unlockedBadge = {
            ...newBadges[bWeekIndex],
            unlocked: true,
            dateUnlocked: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
          };
          newBadges[bWeekIndex] = unlockedBadge;
          unlockedBadgeTriggered = unlockedBadge;
        }
      }

      setBadges(newBadges);

      const computedStats: UserStats = {
        ...stats,
        xp: nextXP,
        level: nextLevel,
        xpToNextLevel: nextXPToLevel,
        completedMissions: stats.completedMissions + 1,
        totalBadges: newBadges.filter(b => b.unlocked).length,
        rankPos: Math.max(1, stats.rankPos - (triggerLevelUp ? 1 : 0)) // go up in rank when levelup
      };
      setStats(computedStats);

      // Prioritized Popups handling
      if (triggerLevelUp) {
        // Trigger Level-Up Celebration
        setModalDetails({
          title: `Nível ${nextLevel}!`,
          subtitle: `Incrível progresso! Você ultrapassou os limites e avançou para a Liga Diamante. Seus mimos também receberam super multiplicadores!`,
          icon: 'sparkles',
          type: 'nivel'
        });
        setModalOpen(true);
        pushActivity('Subiu de Nível!', `Seu perfil evoluiu para o Nível ${nextLevel}!`, 'nivel', 250);
      } else if (unlockedBadgeTriggered) {
        // Trigger Badge Celebration
        setModalDetails({
          title: unlockedBadgeTriggered.name,
          subtitle: unlockedBadgeTriggered.description + ` Este emblema foi eternizado em sua vitrine pessoal.`,
          icon: unlockedBadgeTriggered.iconName,
          type: 'emblema'
        });
        setModalOpen(true);
        pushActivity('Emblema Conquistado!', `Você desbloqueou o distintivo "${unlockedBadgeTriggered.name}"`, 'emblema');
      }
    }
  };

  // Method to claim items in the reward section with XP
  const handleClaimReward = (id: string, cost: number) => {
    if (stats.xp < cost) return;

    const rewardIndex = rewards.findIndex(r => r.id === id);
    if (rewardIndex === -1 || rewards[rewardIndex].claimed) return;

    // Mark reward as claimed
    const updatedRewards = [...rewards];
    updatedRewards[rewardIndex] = { ...rewards[rewardIndex], claimed: true };
    setRewards(updatedRewards);

    // Subtract points from user profile
    const nextXP = stats.xp - cost;

    // Check Badge 'Pá de Ouro' rule (claim first voucher)
    let newBadges = [...badges];
    let badgeTriggered: Badge | null = null;
    const bCupomIndex = newBadges.findIndex((b) => b.id === 'b5');
    if (bCupomIndex !== -1 && !newBadges[bCupomIndex].unlocked) {
      const unlockedBadge = {
        ...newBadges[bCupomIndex],
        unlocked: true,
        dateUnlocked: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      newBadges[bCupomIndex] = unlockedBadge;
      badgeTriggered = unlockedBadge;
    }
    setBadges(newBadges);

    setStats({
      ...stats,
      xp: nextXP,
      totalBadges: newBadges.filter(b => b.unlocked).length
    });

    pushActivity('Resgate Efetuado', `Você comprou "${rewards[rewardIndex].title}" por ${cost} XP`, 'diario');

    // Show celebratory modal for voucher purchase!
    setModalDetails({
      title: rewards[rewardIndex].title,
      subtitle: `Sua compra de "${rewards[rewardIndex].title}" foi aprovada! O código de barra do voucher e cópia impressa foram gerados em sua carteira Aura.`,
      icon: rewards[rewardIndex].iconName,
      type: 'compra'
    });
    setModalOpen(true);
  };

  // Profile name update helper
  const handleEditProfileName = (newName: string) => {
    setStats((prev) => ({ ...prev, name: newName }));
    pushActivity('Perfil Atualizado', `Seu nome de herói foi alterado para "${newName}"`, 'diario');
  };

  // Clear states to start fresh for demo presentation
  const handleResetDemodata = () => {
    localStorage.removeItem(STORAGE_KEYS.stats);
    localStorage.removeItem(STORAGE_KEYS.missions);
    localStorage.removeItem(STORAGE_KEYS.badges);
    localStorage.removeItem(STORAGE_KEYS.rewards);
    localStorage.removeItem(STORAGE_KEYS.activities);
    setStats(INITIAL_STATS);
    setMissions(INITIAL_MISSIONS);
    setBadges(INITIAL_BADGES);
    setRewards(INITIAL_REWARDS);
    setActivityLogs(INITIAL_ACTIVITIES);
    setActiveTab('inicio');
    alert('Os dados do protótipo foram limpos com sucesso!');
  };

  // View Router Dispatcher
  const renderActiveView = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <Dashboard
            stats={stats}
            missions={missions}
            badges={badges}
            onNavigate={(tab) => setActiveTab(tab as AppTab)}
            onCompleteMission={handleCompleteMission}
            onOpenBadgeDetails={(badge) => setSelectedBadge(badge)}
          />
        );
      case 'missoes':
        return (
          <Missions
            missions={missions}
            onCompleteMission={handleCompleteMission}
            xpValue={stats.xp}
          />
        );
      case 'ranking':
        return <Ranking stats={stats} />;
      case 'emblemas':
        return (
          <Badges
            badges={badges}
            activeBadge={selectedBadge}
            onSelectBadge={setSelectedBadge}
          />
        );
      case 'perfil':
        return (
          <Profile
            stats={stats}
            activityLogs={activityLogs}
            onResetDemodata={handleResetDemodata}
            onEditProfileName={handleEditProfileName}
          />
        );
      case 'recompensas':
        return (
          <Rewards
            stats={stats}
            rewards={rewards}
            onClaimReward={handleClaimReward}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col lg:flex-row items-center justify-center p-0 lg:p-6 select-none font-sans antialiased overflow-x-hidden relative">
      {cloudMode && (
        <button
          onClick={onSignOut}
          className="absolute top-4 right-4 z-40 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm"
        >
          Sair
        </button>
      )}

      {syncError && (
        <div className="absolute top-4 left-4 z-40 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-amber-700 shadow-sm">
          {syncError}
        </div>
      )}

      {/* Aesthetic Workspace Branding Info for client review (Desktop only, hidden on mobile) */}
      <div className="hidden lg:flex w-[300px] flex-col gap-6 mr-12 shrink-0 text-slate-800">
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="Logo IP Genius" className="w-11 h-11 rounded-lg object-contain bg-white border border-slate-200 p-1" />
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">IP Genius</h1>
        </div>
        <p className="text-slate-500 leading-relaxed text-sm">
          Protótipo de alta fidelidade para plataforma de engajamento gamificado.
        </p>
        
        <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Status Global</h3>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-full turquoise-gradient flex items-center justify-center text-white font-bold text-lg shadow-sm">
              IP
            </div>
            <div>
              <div className="text-base font-bold text-slate-800">IP Genius v1.0</div>
              <div className="text-xs text-cyan-600 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full animate-ping" />
                <span>Online & Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SMARTPHONE FRAME CONTAINER */}
      <div className="w-full md:w-[385px] h-screen md:h-[812px] bg-white md:rounded-[3rem] md:shadow-2xl md:border-[8px] md:border-[#1E293B] relative flex flex-col overflow-hidden shrink-0 transition-all">
        
        {/* Virtual smartphone Status Bar */}
        <div className="bg-[#06B6D4] text-white text-[11px] font-bold px-5 py-2.5 flex justify-between items-center z-30 shrink-0 border-b border-white/10 select-none">
          {/* Hour clock */}
          <span className="font-mono">{timeStr}</span>
          
          {/* Dynamic Notch representing physical camera block */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1.5 w-32 h-4.5 bg-[#1E293B] rounded-full z-45 border border-slate-900/40" />

          {/* Icons: Signals, Wifi, Battery percentage */}
          <div className="flex items-center gap-1.5 text-white/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c3.9 3.9 10.2 3.9 14.1 0l1.78-1.78C21.43 16.07 22 14.12 22 12c0-4.97-4.03-9-9-9z" opacity=".3"/><path d="M12 6c-3.31 0-6 2.69-6 6 0 1.48.54 2.81 1.41 3.86l1.41-1.41A3.95 3.95 0 0 1 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.05-.41 2.01-1.07 2.72l1.41 1.41A5.926 5.926 0 0 0 18 12c0-3.31-2.69-6-6-6z" opacity=".5"/><path d="M12 9c-1.66 0-3 1.34-3 3 0 .74.27 1.42.71 1.94l1.41-1.41c-.08-.16-.12-.34-.12-.53 0-1.1.9-2 2-2s2 .9 2 2c0 .19-.04.37-.12.53l1.41 1.41c.44-.52.71-1.2.71-1.94 0-1.66-1.34-3-3-3z"/></svg>
            <span>LTE</span>
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <div className="flex items-center gap-0.5 ml-0.5 bg-white/10 px-1 py-0.5 rounded border border-white/20">
              <span className="text-[8.5px] font-mono leading-none">98%</span>
              <div className="w-2 h-3.5 bg-white rounded-xs p-0.5 overflow-hidden flex items-end">
                <div className="bg-emerald-400 w-full h-[98%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Subview content container */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 w-full h-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* STICKY BOTTOM FIXED NAVIGATION DOCKED BAR (5 abas) */}
        <div className="bg-white border-t border-slate-200/80 px-4 py-2.5 flex justify-between justify-items-center items-center z-30 shrink-0 shadow-lg relative pb-5 md:pb-3 rounded-t-3xl">
          {/* Active indicator circle on background */}
          <div className="absolute inset-x-0 top-0 h-1 flex justify-around pointer-events-none px-4">
            {(['inicio', 'missoes', 'ranking', 'emblemas', 'perfil'] as AppTab[]).map((tab) => {
              const isActive = activeTab === tab || (tab === 'inicio' && activeTab === 'recompensas');
              return (
                <div key={tab} className="w-12 flex justify-center">
                  <div className={`h-1 rounded-b-md transition-all duration-300 ${
                    isActive ? 'bg-cyan-500 w-8 h-1 shadow-sm shadow-cyan-400' : 'bg-transparent w-0'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Abas */}
          {[
            { id: 'inicio', label: 'Início', icon: 'compass' },
            { id: 'missoes', label: 'Missões', icon: 'zap' },
            { id: 'ranking', label: 'Ranking', icon: 'medal' },
            { id: 'emblemas', label: 'Emblemas', icon: 'award' },
            { id: 'perfil', label: 'Perfil', icon: 'user' }
          ].map((tab) => {
            // Recompensas triggers highlight of 'inicio'
            const isActive = activeTab === tab.id || (tab.id === 'inicio' && activeTab === 'recompensas');
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AppTab)}
                className="flex flex-col items-center justify-center w-13 h-12 focus:outline-none transition-all group shrink-0 relative cursor-pointer"
              >
                {/* Visual bouncing overlay for active keys */}
                <motion.div
                  animate={isActive ? { scale: [1, 1.15, 1], y: [0, -3, 0] } : {}}
                  transition={{ duration: 0.35 }}
                  className={`flex flex-col items-center justify-center ${isActive ? 'text-cyan-600 font-extrabold' : 'text-slate-400 group-hover:text-slate-600'}`}
                >
                  <AuraIcon 
                    name={tab.icon} 
                    size={20} 
                    className={`transition-colors ${isActive ? 'stroke-2 text-cyan-600' : 'stroke-1.5'}`} 
                  />
                  <span className="text-[9.5px] tracking-tight mt-1 truncate">
                    {tab.label}
                  </span>
                </motion.div>
                
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-cyan-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* GLOBAL MOUNTED OVERLAYS: ModalAchievement */}
      <ModalAchievement
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalDetails.title}
        subtitle={modalDetails.subtitle}
        icon={modalDetails.icon}
        type={modalDetails.type}
      />
    </div>
  );
}

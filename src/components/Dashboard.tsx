import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserStats, Mission, Badge } from '../types';
import AuraIcon from './AuraIcon';

interface DashboardProps {
  stats: UserStats;
  missions: Mission[];
  badges: Badge[];
  onNavigate: (tab: string) => void;
  onCompleteMission: (id: string) => void;
  onOpenBadgeDetails: (badge: Badge) => void;
}

export default function Dashboard({
  stats,
  missions,
  badges,
  onNavigate,
  onCompleteMission,
  onOpenBadgeDetails
}: DashboardProps) {
  // Get active daily challenges (only daily category)
  const dailyMissions = missions
    .filter((m) => m.category === 'diaria')
    .slice(0, 3); // Top 3 daily

  // Get recently unlocked badges
  const unlockedBadges = badges
    .filter((b) => b.unlocked)
    .slice(0, 3); // Last 3 unlocked

  // Calculate percentage of XP progress
  const progressPercent = Math.min(Math.round((stats.xp / stats.xpToNextLevel) * 100), 100);

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-24 text-slate-800">
      {/* Premium FinTech Wallet-Inspired Header Card */}
      <div className="turquoise-gradient pt-8 pb-16 px-5 text-white rounded-b-[2.5rem] shadow-lg relative">
        {/* User Info Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer"
              onClick={() => onNavigate('perfil')}
            >
              <img
                src={stats.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                alt={stats.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full border-2 border-white/60 object-cover"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-500 w-3 h-3 rounded-full border-2 border-cyan-500" />
            </motion.div>
            <div>
              <p className="text-cyan-100 text-xs">Olá, bem-vindo de volta!</p>
              <h2 className="text-lg font-bold tracking-tight leading-tight">{stats.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Streak Indicator */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-xs cursor-pointer"
              onClick={() => onNavigate('perfil')}
            >
              <AuraIcon name="flame" className="text-orange-400" size={14} />
              <span className="font-bold">{stats.streak} dias</span>
            </motion.div>

            {/* Notifications Shortcut */}
            <button className="p-2 bg-white/10 hover:bg-white/15 rounded-full border border-white/10 backdrop-blur-md relative">
              <AuraIcon name="bell" size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
            </button>
          </div>
        </div>

        {/* Level Banner */}
        <div className="flex justify-between items-center mb-1 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-yellow-400 rounded-lg text-slate-900">
              <AuraIcon name="sparkles" size={16} />
            </div>
            <div>
              <p className="text-white/70 text-[10px] uppercase font-bold tracking-wider">Nível Atual</p>
              <p className="text-sm font-extrabold text-white">Nível {stats.level}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-cyan-100 font-semibold">{stats.xp} / {stats.xpToNextLevel} XP</span>
          </div>
        </div>
      </div>

      {/* Main Stat Panel Overlapping Header */}
      <div className="px-4 -mt-10 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-100 border border-slate-100"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Progresso Geral</p>
              <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-0.5">Pontuação Líder</h3>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full text-xs font-bold border border-cyan-100">
                <AuraIcon name="coins" size={14} />
                <span>Nível {stats.level}</span>
              </div>
            </div>
          </div>

          {/* Graphical Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
              <span>Evolução do Nível</span>
              <span className="font-bold text-cyan-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/40">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-[#06B6D4] h-full rounded-full shadow-[0px_0px_8px_rgba(6,182,212,0.6)]"
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Missões</p>
              <p className="text-base font-extrabold text-slate-800">{stats.completedMissions}</p>
            </div>
            <div className="border-x border-slate-100">
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Ranking</p>
              <p className="text-base font-extrabold text-slate-800">#{stats.rankPos}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Emblemas</p>
              <p className="text-base font-extrabold text-slate-800">{stats.totalBadges}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Buttons - Gamified Category Shortcuts */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-4 gap-2 bg-white p-3.5 rounded-2xl shadow-md shadow-slate-100 border border-slate-100/60">
          <button 
            onClick={() => onNavigate('missoes')}
            className="flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-cyan-50 hover:bg-cyan-100 text-cyan-600 flex items-center justify-center transition-colors shadow-sm">
              <AuraIcon name="zap" size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-600">Missões</span>
          </button>

          <button 
            onClick={() => onNavigate('ranking')}
            className="flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 flex items-center justify-center transition-colors shadow-sm">
              <AuraIcon name="trophy" size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-600">Ranking</span>
          </button>

          <button 
            onClick={() => onNavigate('emblemas')}
            className="flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-violet-50 hover:bg-violet-100 text-violet-600 flex items-center justify-center transition-colors shadow-sm">
              <AuraIcon name="award" size={18} />
            </div>
            <span className="text-[10px] font-bold text-slate-600">Emblemas</span>
          </button>

          <button 
            onClick={() => onNavigate('recompensas')}
            className="flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors shadow-sm relative">
              <AuraIcon name="gift" size={18} />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-600">Mimos</span>
          </button>
        </div>
      </div>

      {/* Daily Challenges (Desafios de hoje) */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-cyan-500 rounded-full" />
            Desafios de Hoje
          </h4>
          <button 
            onClick={() => onNavigate('missoes')}
            className="text-[11px] font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5"
          >
            Ver todas <AuraIcon name="chevronRight" size={12} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {dailyMissions.map((mission) => {
              const mPercentage = Math.min(Math.round((mission.progress / mission.requirement) * 100), 100);
              const isDone = mission.status === 'concluida';
              const isPendingAction = mission.status === 'pendente' && mission.progress < mission.requirement;
              const isClaimable = mission.progress >= mission.requirement && !isDone;

              return (
                <motion.div
                  key={mission.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3 relative overflow-hidden"
                >
                  {/* Category Accent Indicator */}
                  <div className="absolute top-0 left-0 w-1 bg-cyan-400 h-full" />

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isDone ? 'bg-slate-100 text-slate-400' : 'bg-cyan-50 text-cyan-600'
                    }`}>
                      <AuraIcon name={mission.iconName || 'target'} size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-extrabold text-slate-850 truncate ${isDone ? 'line-through text-slate-400' : ''}`}>
                        {mission.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{mission.description}</p>
                      
                      {/* Inner miniature progress bar */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isDone ? 'bg-slate-350' : 'bg-cyan-500'}`}
                            style={{ width: `${mPercentage}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-slate-500">
                          {mission.progress}/{mission.requirement}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Action Button */}
                  <div className="shrink-0 pl-1">
                    {isDone ? (
                      <div className="p-1 px-2.5 bg-slate-50 border border-slate-200 text-slate-400 rounded-full flex items-center gap-1 text-[9px] font-bold">
                        <AuraIcon name="check" size={10} className="text-slate-400" />
                        <span>Feito</span>
                      </div>
                    ) : isClaimable ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCompleteMission(mission.id)}
                        className="p-1.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-xl shadow-md shadow-emerald-200 text-[10px] font-extrabold flex items-center gap-1"
                      >
                        <AuraIcon name="sparkles" size={10} />
                        <span>Resgatar</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCompleteMission(mission.id)}
                        className="p-1.5 px-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl shadow-xs text-[10px] font-bold"
                      >
                        <span>Fazer</span>
                      </motion.button>
                    )}
                    <span className="block text-center text-[9px] text-slate-400 font-bold mt-1 font-mono">
                      +{mission.xpReward} XP
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Latest Achievements (Últimas conquistas) */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-violet-550 bg-violet-500 rounded-full" />
            Últimas Conquistas
          </h4>
          <button 
            onClick={() => onNavigate('emblemas')}
            className="text-[11px] font-bold text-violet-600 hover:text-violet-700 flex items-center gap-0.5"
          >
            Ver todas <AuraIcon name="chevronRight" size={12} />
          </button>
        </div>

        {unlockedBadges.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 text-slate-400 text-xs">
            <AuraIcon name="lock" className="mx-auto mb-2 text-slate-300" size={24} />
            Nenhuma conquista recente. Conclua missões para desbloquear!
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {unlockedBadges.map((badge) => {
              // Map rarity styles
              const rarityStyles = {
                comum: { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Comum' },
                raro: { bg: 'bg-cyan-50/70', text: 'text-cyan-600', label: 'Raro' },
                lendario: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Lendário' }
              }[badge.rarity];

              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenBadgeDetails(badge)}
                  className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center cursor-pointer relative"
                >
                  <div className={`w-11 h-11 rounded-full ${rarityStyles.bg} text-slate-800 flex items-center justify-center shadow-inner mb-2`}>
                    <AuraIcon name={badge.iconName} className={`${rarityStyles.text}`} size={22} />
                  </div>
                  
                  <span className="text-[10px] font-extrabold text-slate-700 truncate w-full">
                    {badge.name}
                  </span>
                  
                  <span className={`text-[8px] font-extrabold font-mono mt-0.5 px-1.5 py-0.5 rounded-full ${
                    badge.rarity === 'lendario' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {rarityStyles.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Gamified Evolution Advice Hint Block */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-2xl p-4 flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/10 text-cyan-600 flex items-center justify-center shrink-0">
            <AuraIcon name="brain" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-cyan-705 text-cyan-850">Auras Dica do Mestre</p>
            <p className="text-[9.5px] text-slate-500 leading-normal mt-0.5">
              Ganhe <span className="font-bold text-slate-705">+500 XP</span> completando conquistas de categoria "Especial" este mês!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

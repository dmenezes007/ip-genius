import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mission, MissionCategory } from '../types';
import AuraIcon from './AuraIcon';

interface MissionsProps {
  missions: Mission[];
  onCompleteMission: (id: string) => void;
  xpValue: number;
}

export default function Missions({ missions, onCompleteMission, xpValue }: MissionsProps) {
  const [activeCategory, setActiveCategory] = useState<MissionCategory>('diaria');

  // Filter missions based on active tab
  const filteredMissions = missions.filter((m) => m.category === activeCategory);

  // Count metrics for current tab
  const tabPendingCount = filteredMissions.filter(m => m.status !== 'concluida').length;
  const tabCompletedCount = filteredMissions.filter(m => m.status === 'concluida').length;
  const totalInTab = filteredMissions.length;

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-24 text-slate-800">
      {/* Top Gradient Header */}
      <div className="turquoise-gradient pt-7 pb-6 px-5 text-white shadow-md">
        <h2 className="text-xl font-extrabold tracking-tight">Painel de Missões</h2>
        <p className="text-cyan-100 text-[11px] mt-0.5">Cumpra os desafios para acumular XP e subir na liga.</p>
        
        {/* Status Indicator Bar */}
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <AuraIcon name="target" className="text-emerald-300" size={16} />
            <span className="font-semibold text-white/95">Disponíveis</span>
          </div>
          <p className="font-mono font-bold text-emerald-300">
            {tabCompletedCount} / {totalInTab} Concluídas
          </p>
        </div>
      </div>

      {/* Categories Tab Bar */}
      <div className="px-4 mt-4">
        <div className="bg-white p-1 rounded-full border border-slate-200/60 shadow-sm flex">
          {(['diaria', 'semanal', 'especial'] as MissionCategory[]).map((cat) => {
            const label = cat === 'diaria' ? 'Diárias' : cat === 'semanal' ? 'Semanais' : 'Especiais';
            const count = missions.filter(m => m.category === cat && m.status !== 'concluida').length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all relative ${
                  isActive ? 'text-cyan-705 text-cyan-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-cyan-50 border border-cyan-100/40 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  {label}
                  {count > 0 && (
                    <span className={`text-[8.5px] px-1.5 py-0.5 rounded-full font-mono text-center leading-none ${
                      isActive ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Missions List */}
      <div className="px-4 mt-5 flex-1">
        {filteredMissions.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 text-slate-400">
            <AuraIcon name="lock" className="mx-auto mb-2 text-slate-300" size={32} />
            Nenhuma missão disponível nesta categoria.
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            <AnimatePresence mode="popLayout">
              {filteredMissions.map((mission) => {
                const isCompleted = mission.status === 'concluida';
                const isClaimable = mission.progress >= mission.requirement && !isCompleted;
                const mPercentage = Math.min(Math.round((mission.progress / mission.requirement) * 100), 100);

                // Styling cards depending on category & state
                const categoryColorClass = {
                  diaria: 'bg-cyan-500',
                  semanal: 'bg-indigo-500',
                  especial: 'bg-amber-500'
                }[mission.category];

                return (
                  <motion.div
                    key={mission.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white rounded-2xl border p-4.5 shadow-sm transition-all relative overflow-hidden ${
                      isCompleted 
                        ? 'border-slate-200/60 bg-white/70 opacity-80' 
                        : isClaimable 
                          ? 'border-emerald-300 shadow-md shadow-emerald-50/50' 
                          : 'border-slate-100'
                    }`}
                  >
                    {/* Visual left colored ribbon */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      isCompleted ? 'bg-slate-300' : categoryColorClass
                    }`} />

                    <div className="flex justify-between items-start gap-3 mb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[8.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full ${
                            mission.category === 'diaria' 
                              ? 'bg-cyan-50 text-cyan-600 border border-cyan-100' 
                              : mission.category === 'semanal'
                                ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-150'
                          }`}>
                            {mission.category === 'diaria' ? 'Diária' : mission.category === 'semanal' ? 'Semanal' : 'Especial'}
                          </span>
                        </div>
                        <h4 className={`text-[13.5px] font-extrabold text-slate-800 leading-tight mt-1.5 ${
                          isCompleted ? 'line-through text-slate-400' : ''
                        }`}>
                          {mission.title}
                        </h4>
                        <p className={`text-[11px] text-slate-400 mt-1 leading-normal ${
                          isCompleted ? 'text-slate-350' : ''
                        }`}>
                          {mission.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-0.5 text-cyan-600 font-bold text-xs bg-cyan-50 px-2 py-0.5 rounded-lg border border-cyan-100/40 font-mono">
                          <span>+{mission.xpReward}</span>
                          <span className="text-[9px] font-sans font-extrabold uppercase">XP</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress tracking section */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center text-[9.5px] text-slate-500 font-semibold mb-1">
                          <span>Progresso</span>
                          <span className="font-mono font-bold">{mission.progress} / {mission.requirement} ({mPercentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/40">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${mPercentage}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              isCompleted 
                                ? 'bg-slate-300' 
                                : isClaimable 
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                  : mission.category === 'diaria'
                                    ? 'bg-cyan-500'
                                    : 'bg-indigo-500'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Dynamic CTA button */}
                      <div className="shrink-0">
                        {isCompleted ? (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-extrabold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 uppercase tracking-wider">
                            <AuraIcon name="checkCircle" className="text-slate-400" size={13} />
                            <span>Feito</span>
                          </div>
                        ) : isClaimable ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onCompleteMission(mission.id)}
                            className="flex items-center gap-1.5 text-[10.5px] text-white font-extrabold bg-gradient-to-r from-emerald-500 to-teal-400 px-3.5 py-2.5 rounded-xl shadow-md shadow-emerald-150 uppercase tracking-wider brightness-105"
                          >
                            <AuraIcon name="sparkles" size={12} />
                            <span>Resgatar</span>
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onCompleteMission(mission.id)}
                            className="flex items-center gap-1.5 text-[10.5px] text-white font-bold bg-cyan-500 hover:bg-cyan-600 px-4 py-2.5 rounded-xl shadow-xs uppercase tracking-wider"
                          >
                            <AuraIcon name="play" size={11} className="text-cyan-100" />
                            <span>Fazer</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Quick Gamification stats at bottom of missions */}
      <div className="px-4 mt-6">
        <div className="bg-slate-100 rounded-2xl p-4 flex justify-between items-center border border-slate-200/40">
          <div className="flex items-center gap-2">
            <AuraIcon name="coins" className="text-cyan-600" size={16} />
            <span className="text-[11px] font-extrabold text-slate-600">Saldo atual da liga</span>
          </div>
          <span className="font-mono text-xs font-bold text-cyan-600 truncate">{xpValue} XP Acumulado</span>
        </div>
      </div>
    </div>
  );
}

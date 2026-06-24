import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RankPlayer, UserStats } from '../types';
import AuraIcon from './AuraIcon';

interface RankingProps {
  stats: UserStats;
}

// Simulated players for all three leaderboard views
const LEADERBOARD_DATA: Record<'semana' | 'mes' | 'geral', RankPlayer[]> = {
  semana: [
    { id: '1', name: 'Juliana Paiva', level: 12, xp: 4250, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
    { id: 'current', name: 'Davison Menezes', level: 4, xp: 2850, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', isCurrentUser: true }, // will sync dynamically in UI
    { id: '3', name: 'Lucas Silveira', level: 8, xp: 2400, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
    { id: '4', name: 'Ana Beatriz', level: 9, xp: 1950, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { id: '5', name: 'Felipe Santos', level: 6, xp: 1800, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
    { id: '6', name: 'Mariana Costa', level: 7, xp: 1540, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
    { id: '7', name: 'Rodrigo Lima', level: 5, xp: 1200, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' }
  ],
  mes: [
    { id: '1', name: 'Ana Beatriz', level: 9, xp: 9550, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { id: '2', name: 'Juliana Paiva', level: 12, xp: 9100, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
    { id: '3', name: 'Lucas Silveira', level: 8, xp: 7800, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
    { id: '4', name: 'Felipe Santos', level: 6, xp: 6200, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
    { id: 'current', name: 'Davison Menezes', level: 4, xp: 4850, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', isCurrentUser: true },
    { id: '6', name: 'Mariana Costa', level: 7, xp: 4500, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
    { id: '7', name: 'Rodrigo Lima', level: 5, xp: 3900, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' }
  ],
  geral: [
    { id: '1', name: 'Guilherme Silva', level: 32, xp: 48900, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150' },
    { id: '2', name: 'Juliana Paiva', level: 12, xp: 31200, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
    { id: '3', name: 'Ana Beatriz', level: 9, xp: 28400, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { id: '4', name: 'Lucas Silveira', level: 8, xp: 21100, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
    { id: '5', name: 'Felipe Santos', level: 6, xp: 18400, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
    { id: '6', name: 'Mariana Costa', level: 7, xp: 16900, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
    { id: '7', name: 'Rodrigo Lima', level: 5, xp: 13200, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' },
    { id: 'current', name: 'Davison Menezes', level: 4, xp: 8550, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', isCurrentUser: true }
  ]
};

type RankFilter = 'semana' | 'mes' | 'geral';

export default function Ranking({ stats }: RankingProps) {
  const [activeFilter, setActiveFilter] = useState<RankFilter>('semana');

  // Synchronise active user's stats dynamically so changes inside App are visible in Leaderboard!
  const getLeaderboard = () => {
    const list = LEADERBOARD_DATA[activeFilter];
    return list.map((member) => {
      if (member.isCurrentUser) {
        let dynamicXP = stats.xp;
        
        // Multiplier to match standard ranges across filters
        if (activeFilter === 'mes') {
          dynamicXP = stats.xp + 2000;
        } else if (activeFilter === 'geral') {
          dynamicXP = stats.xp + 6000;
        }

        return {
          ...member,
          name: stats.name,
          avatar: stats.avatar,
          level: stats.level,
          xp: dynamicXP,
        };
      }
      return member;
    }).sort((a, b) => b.xp - a.xp); // Sort in descending order
  };

  const sortedLeaderboard = getLeaderboard();
  
  // Extract Top 3
  const top3 = sortedLeaderboard.slice(0, 3);
  // Reorder Top 3 specifically for Visual Podium representation: [Silver, Gold, Bronze] (2nd, 1st, 3rd)
  const podiumOrder = [
    top3[1] || null, // 2nd place (Silver)
    top3[0] || null, // 1st place (Gold)
    top3[2] || null  // 3rd place (Bronze)
  ];

  // Remaining list (Rank elements 4 and beyond)
  const remainingPlayers = sortedLeaderboard.slice(3);

  // Find active user rank index
  const currentUserIndex = sortedLeaderboard.findIndex((player) => player.isCurrentUser);
  const currentUserRankPos = currentUserIndex !== -1 ? currentUserIndex + 1 : 'N/A';

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-24 text-slate-800">
      {/* Top Header Card with Filter Buttons */}
      <div className="turquoise-gradient pt-7 pb-8 px-5 text-white shadow-md">
        <h2 className="text-xl font-extrabold tracking-tight">Super Liga de Heróis</h2>
        <p className="text-cyan-100 text-[11px] mt-0.5">Seu avanço se reflete aqui. Lidere o topo do ranking!</p>

        {/* Filter Navigation Menu */}
        <div className="flex bg-black/15 backdrop-blur-md p-1 rounded-xl border border-white/10 mt-5">
          {(['semana', 'mes', 'geral'] as RankFilter[]).map((filter) => {
            const label = filter === 'semana' ? 'Esforço Semanal' : filter === 'mes' ? 'Mensal' : 'Geral (Acumulado)';
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all relative ${
                  isActive ? 'text-cyan-900 bg-white shadow-inner font-extrabold' : 'text-cyan-100 hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Podium Display (Top 3 Users) */}
      <div className="bg-gradient-to-b from-indigo-50/40 to-slate-50 pt-8 pb-5 px-4">
        <div className="flex items-end justify-center gap-2 max-w-sm mx-auto">
          {podiumOrder.map((player, index) => {
            if (!player) return null;

            // podium positions: 2nd place (Silver), 1st place (Gold), 3rd place (Bronze)
            const isFirst = index === 1;
            const isSecond = index === 0;
            const isThird = index === 2;

            const crownStyle = isFirst ? 'text-amber-400 absolute -top-5 scale-110 drop-shadow-md' : 'hidden';
            const heightClass = isFirst ? 'h-36' : isSecond ? 'h-28' : 'h-24';
            const colorClass = isFirst 
              ? 'from-amber-400 to-yellow-500 text-white' 
              : isSecond 
                ? 'from-slate-350 to-slate-400 text-white' 
                : 'from-orange-400 to-amber-600 text-white';

            const rankNum = isFirst ? 1 : isSecond ? 2 : 3;
            const medalColor = isFirst ? 'bg-amber-400' : isSecond ? 'bg-slate-300' : 'bg-amber-600';

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center flex-1 min-w-0"
              >
                {/* Floating Avatar & Medal */}
                <div className="relative mb-2">
                  {isFirst && <AuraIcon name="sparkles" className={`${crownStyle} text-amber-400 animate-pulse`} size={18} />}
                  <img
                    src={player.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"}
                    alt={player.name}
                    referrerPolicy="no-referrer"
                    className={`rounded-full object-cover border-2 shadow-md ${
                      isFirst 
                        ? 'w-16 h-16 border-amber-400' 
                        : isSecond 
                          ? 'w-13 h-13 border-slate-300' 
                          : 'w-12 h-12 border-amber-600'
                    }`}
                  />
                  {/* Small absolute podium rank counter */}
                  <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold text-slate-900 border border-white flex items-center justify-center ${medalColor} text-white font-mono`}>
                    {rankNum}
                  </span>
                </div>

                {/* Name */}
                <p className="text-xs font-extrabold text-slate-800 text-center truncate w-full px-1">
                  {player.name}
                </p>
                <span className="text-[10px] text-slate-400 font-mono font-bold">{player.xp} XP</span>

                {/* Vertical Podium Column */}
                <div className={`w-full bg-gradient-to-b ${colorClass} mt-3 rounded-t-2xl shadow-md ${heightClass} flex flex-col items-center justify-center`}>
                  <p className="text-2xl font-black font-mono tracking-tighter opacity-90 leading-none">{rankNum === 1 ? '🥇' : rankNum === 2 ? '🥈' : '🥉'}</p>
                  <p className="text-[9px] font-black uppercase tracking-wider opacity-90 mt-1 font-mono">Nível {player.level}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Table (Participants ranked 4th and Lower) */}
      <div className="flex-1 px-4 mt-3">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-105">
          <AnimatePresence mode="popLayout">
            {remainingPlayers.map((player, index) => {
              const currentRank = index + 4;
              const isCurrentUser = player.isCurrentUser;

              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center justify-between p-3.5 ${
                    isCurrentUser ? 'bg-[#ECFEFF] border-l-4 border-l-[#06B6D4] relative font-bold' : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Rank index */}
                    <span className="w-5 text-center text-xs font-mono font-bold text-slate-405 text-slate-500">
                      #{currentRank}
                    </span>

                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={player.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"}
                        alt={player.name}
                        referrerPolicy="no-referrer"
                        className={`w-9.5 h-9.5 rounded-full object-cover border-2 ${
                          isCurrentUser ? 'border-cyan-500' : 'border-slate-100'
                        }`}
                      />
                      {isCurrentUser && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyan-500 rounded-full border border-white" />
                      )}
                    </div>

                    {/* User Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className={`text-xs font-extrabold truncate ${isCurrentUser ? 'text-cyan-900' : 'text-slate-800'}`}>
                          {player.name}
                        </p>
                        {isCurrentUser && (
                          <span className="text-[8.5px] uppercase font-bold tracking-wider px-1 bg-cyan-100 text-cyan-705 rounded">
                            Você
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Nível {player.level}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-xs font-mono font-bold ${isCurrentUser ? 'text-cyan-700' : 'text-slate-750'}`}>
                      {player.xp} XP
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Sticky Sticky Bottom Widget for User Position (if lower in ranking) */}
      {currentUserRankPos > 3 && (
        <div className="px-4 mt-4 shrink-0">
          <div className="bg-cyan-900 text-white rounded-2xl p-4 flex items-center justify-between border border-cyan-800/60 shadow-lg shadow-cyan-900/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <p className="text-sm font-extrabold font-mono">#{currentUserRankPos}</p>
              </div>
              <div>
                <p className="text-[10px] text-cyan-200">Sua posição geral</p>
                <p className="text-xs font-extrabold">Faltam {sortedLeaderboard[currentUserIndex - 1]?.xp - sortedLeaderboard[currentUserIndex]?.xp || 150} XP para subir de rank</p>
              </div>
            </div>
            
            <button 
              onClick={() => {}}
              className="p-1 px-3.5 bg-white text-cyan-900 rounded-lg text-[10px] font-extrabold uppercase hover:bg-cyan-50 focus:outline-none"
            >
              Rachar XP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

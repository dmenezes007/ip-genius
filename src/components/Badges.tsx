import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge, Rarity } from '../types';
import AuraIcon from './AuraIcon';

interface BadgesProps {
  badges: Badge[];
  activeBadge: Badge | null;
  onSelectBadge: (badge: Badge | null) => void;
  xpToShare?: number;
}

export default function Badges({ badges, activeBadge, onSelectBadge }: BadgesProps) {
  const [filter, setFilter] = useState<'todos' | 'conquistados' | 'bloqueados'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter logic
  const filteredBadges = badges.filter((b) => {
    // Tab filter
    if (filter === 'conquistados' && !b.unlocked) return false;
    if (filter === 'bloqueados' && b.unlocked) return false;

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q);
    }

    return true;
  });

  const totalBadgesCount = badges.length;
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;
  const badgeUnlockPercent = Math.round((unlockedBadgesCount / totalBadgesCount) * 100);

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-24 text-slate-800">
      {/* Top Banner Header */}
      <div className="turquoise-gradient pt-7 pb-6 px-5 text-white shadow-md">
        <h2 className="text-xl font-extrabold tracking-tight">Galeria de Emblemas</h2>
        <p className="text-cyan-100 text-[11px] mt-0.5">Seus feitos lendários eternizados em troféus digitais.</p>

        {/* Dynamic statistics row */}
        <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AuraIcon name="award" className="text-yellow-300" size={18} />
            <div>
              <p className="text-[10px] text-violet-100 font-bold uppercase tracking-wide">Progresso da Coleção</p>
              <p className="text-xs font-black text-white">{unlockedBadgesCount} de {totalBadgesCount} Conquistados</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-sm font-black text-yellow-300">{badgeUnlockPercent}%</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="px-4 mt-5">
        {/* Search */}
        <div className="relative mb-3.5">
          <input
            type="text"
            placeholder="Pesquisar emblema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm pl-9"
          />
          <span className="absolute left-3.5 top-3 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <AuraIcon name="x" size={14} />
            </button>
          )}
        </div>

        {/* Pill Tabs */}
        <div className="flex gap-2 bg-slate-200/50 p-1 rounded-xl">
          {(['todos', 'conquistados', 'bloqueados'] as const).map((tab) => {
            const label = tab === 'todos' ? 'Todos' : tab === 'conquistados' ? 'Conquistados' : 'Bloqueados';
            const isActive = filter === tab;

            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100 font-extrabold' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="px-4 mt-4 flex-1">
        {filteredBadges.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 text-slate-400 text-xs">
            <AuraIcon name="lock" className="mx-auto mb-2 text-slate-300" size={32} />
            Não encontramos nenhum emblema na busca. Suba de nível para habilitar mais!
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filteredBadges.map((badge) => {
              const rStyle = {
                comum: {
                  bg: 'bg-slate-50 text-slate-500 border-slate-200/55',
                  activeBg: 'bg-slate-100 border-slate-200 text-slate-705',
                  color: 'text-slate-500',
                  badgeNameColor: 'text-slate-800'
                },
                raro: {
                  bg: 'bg-cyan-50/50 text-cyan-600 border-cyan-150',
                  activeBg: 'bg-cyan-50 border-cyan-200 text-cyan-705',
                  color: 'text-cyan-600',
                  badgeNameColor: 'text-cyan-900'
                },
                lendario: {
                  bg: 'bg-amber-50 text-amber-600 border-amber-150',
                  activeBg: 'bg-amber-100/70 border-amber-200 text-amber-705',
                  color: 'text-amber-500',
                  badgeNameColor: 'text-amber-950 font-black'
                }
              }[badge.rarity];

              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelectBadge(badge)}
                  className={`bg-white rounded-2xl border p-3 flex flex-col items-center justify-between text-center cursor-pointer transition-all ${
                    badge.unlocked 
                      ? 'shadow-sm border-slate-100' 
                      : 'border-slate-200/40 opacity-55 saturate-50'
                  }`}
                >
                  {/* Badge Icon circle */}
                  <div className="relative mb-2 shrink-0">
                    <div className={`w-13 h-13 rounded-full flex items-center justify-center ${rStyle.bg} shadow-sm border`}>
                      <AuraIcon name={badge.iconName} className={`${badge.unlocked ? rStyle.color : 'text-slate-400'}`} size={24} />
                    </div>
                    
                    {/* Security Lock indicator if badge is LOCKED */}
                    {!badge.unlocked && (
                      <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-slate-800 border border-white text-white flex items-center justify-center">
                        <AuraIcon name="lock" size={10} />
                      </span>
                    )}

                    {/* Check indicator if badge is UNLOCKED */}
                    {badge.unlocked && (
                      <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500/90 border border-white text-white flex items-center justify-center">
                        <AuraIcon name="check" size={10} />
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] font-extrabold truncate w-full leading-tight ${rStyle.badgeNameColor}`}>
                    {badge.name}
                  </span>

                  <span className={`text-[8px] font-semibold uppercase tracking-wider font-mono mt-1 px-1.5 py-0.5 rounded ${
                    badge.rarity === 'lendario' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {badge.rarity}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Slide-Up Custom Modal (Emblem details popup) */}
      <AnimatePresence>
        {activeBadge && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end justify-center z-50">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-t-[2rem] w-full max-w-sm max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl relative border-t border-slate-200/80 p-6 text-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => onSelectBadge(null)}
                className="absolute top-5 right-5 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 cursor-pointer focus:outline-none transition-colors"
              >
                <AuraIcon name="x" size={14} />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                {/* Big Badge Icon */}
                <div className="relative mb-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${
                    activeBadge.unlocked 
                      ? activeBadge.rarity === 'lendario' 
                        ? 'bg-amber-50 border-amber-400 text-amber-600' 
                        : activeBadge.rarity === 'raro'
                          ? 'bg-cyan-50 border-cyan-400 text-cyan-600'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      : 'bg-slate-100 border-slate-300 text-slate-400 grayscale'
                  } shadow-md`}>
                    <AuraIcon name={activeBadge.iconName} size={36} />
                  </div>
                  
                  {/* Absolute Badge Category Icon Badge */}
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                    <AuraIcon name="shield" size={12} />
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {activeBadge.name}
                </h3>

                {/* Rarity and State tags */}
                <div className="flex gap-1.5 mt-2">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    activeBadge.rarity === 'lendario' 
                      ? 'bg-amber-100 text-amber-700' 
                      : activeBadge.rarity === 'raro'
                        ? 'bg-cyan-100 text-cyan-705'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {activeBadge.rarity}
                  </span>
                  
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    activeBadge.unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-500'
                  }`}>
                    {activeBadge.unlocked ? 'Desbloqueado' : 'Bloqueado'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-505 text-slate-500 mt-4 leading-relaxed max-w-xs">
                  {activeBadge.description}
                </p>

                {/* Unlock criteria statement */}
                <div className="bg-slate-50 border-slate-100 border rounded-2xl w-full p-4 mt-5 text-left">
                  <p className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Como Desbloquear</p>
                  <p className="text-xs text-slate-700 font-medium mt-1 leading-normal">
                    {activeBadge.unlocked 
                      ? 'Parabéns, você completou os desafios desta conquista com êxito!' 
                      : `Conclua missões especiais e aumente sua pontuação para liberar o emblema.`}
                  </p>
                  {activeBadge.unlocked && activeBadge.dateUnlocked && (
                    <div className="flex items-center gap-1.5 text-[9px] text-emerald-600 font-extrabold mt-3 border-t border-slate-200/50 pt-2 font-mono">
                      <AuraIcon name="calendar" size={11} />
                      Conquistado em: {activeBadge.dateUnlocked}
                    </div>
                  )}
                </div>

                {/* Mock Interactivity Action */}
                <div className="w-full flex gap-3 mt-6">
                  <button 
                    onClick={() => {}}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-150 text-slate-600 text-xs font-bold rounded-xl transition-colors active:scale-95"
                  >
                    Voltar
                  </button>
                  
                  <button 
                    onClick={() => {
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    disabled={!activeBadge.unlocked}
                    className="flex-1 py-3 turquoise-gradient text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-100/50 active:scale-95 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <AuraIcon name={copiedLink ? "check" : "share"} size={12} />
                    <span>{copiedLink ? "Link Copiado!" : "Compartilhar"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

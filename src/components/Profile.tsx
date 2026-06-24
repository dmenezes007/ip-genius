import React from 'react';
import { motion } from 'motion/react';
import { UserStats, ActivityLog } from '../types';
import AuraIcon from './AuraIcon';

interface ProfileProps {
  stats: UserStats;
  activityLogs: ActivityLog[];
  onResetDemodata: () => void;
  onEditProfileName: (newName: string) => void;
}

export default function Profile({ stats, activityLogs, onResetDemodata, onEditProfileName }: ProfileProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editName, setEditName] = React.useState(stats.name);

  const handleSave = () => {
    if (editName.trim()) {
      onEditProfileName(editName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-24 text-slate-850">
      {/* Dynamic Profile Header Canvas */}
      <div className="turquoise-gradient pt-8 pb-14 px-5 text-white flex flex-col items-center justify-center relative shadow-md">
        
        {/* Settings buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={onResetDemodata}
            className="p-2 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 backdrop-blur-md relative uppercase text-[9px] font-black tracking-wide cursor-pointer text-cyan-50 focus:outline-none"
            title="Resetar dados do protótipo"
          >
            <AuraIcon name="refresh" size={14} className="inline mr-1" />
            <span>Resetar</span>
          </button>
        </div>

        {/* Big Avatar */}
        <div className="relative mb-3">
          <img
            src={stats.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
            alt={stats.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full border-4 border-white/70 shadow-lg object-cover"
          />
          <span className="absolute bottom-0 right-0 bg-yellow-400 w-6 h-6 rounded-full border-2 border-cyan-500 flex items-center justify-center text-xs font-black shadow text-slate-900">
            {stats.level}
          </span>
        </div>

        {/* Editable Username */}
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-white text-slate-800 font-bold px-3 py-1 text-sm rounded-lg border border-slate-350 focus:outline-none w-44"
              maxLength={24}
              autoFocus
            />
            <button 
              onClick={handleSave}
              className="p-1 px-3.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-xs rounded-lg cursor-pointer"
            >
              Ok
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 mt-1 cursor-pointer" onClick={() => setIsEditing(true)}>
            <h3 className="text-lg font-black tracking-tight">{stats.name}</h3>
            <AuraIcon name="play" size={12} className="text-white/60 rotate-90" />
          </div>
        )}
        <p className="text-cyan-100 text-[11px] leading-tight font-mono">{stats.email}</p>

        {/* Mini Level tags */}
        <div className="flex items-center gap-1 bg-white/10 border border-white/10 mt-3 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md">
          <AuraIcon name="sparkles" className="text-yellow-300" size={12} />
          <span>Liga Diamante (Ativa)</span>
        </div>
      </div>

      {/* Stats Cards Overlap Grid */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3.5">
          {/* Item 1: Completed Missions */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white p-4 rounded-2.5xl p-4.5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <AuraIcon name="zap" size={18} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Missões</p>
              <p className="text-sm font-extrabold text-slate-800 leading-tight mt-0.5">{stats.completedMissions}</p>
            </div>
          </motion.div>

          {/* Item 2: League Rank */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white p-4 rounded-2.5xl p-4.5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AuraIcon name="trophy" size={18} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Liderança</p>
              <p className="text-sm font-extrabold text-slate-800 leading-tight mt-0.5">#{stats.rankPos} lugar</p>
            </div>
          </motion.div>

          {/* Item 3: Streak of active days */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white p-4 rounded-2.5xl p-4.5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <AuraIcon name="flame" size={18} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Sequência</p>
              <p className="text-sm font-extrabold text-slate-800 leading-tight mt-0.5">{stats.streak} dias</p>
            </div>
          </motion.div>

          {/* Item 4: Badges conquered */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white p-4 rounded-2.5xl p-4.5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <AuraIcon name="award" size={18} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Emblemas</p>
              <p className="text-sm font-extrabold text-slate-800 leading-tight mt-0.5">{stats.totalBadges} conquistados</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Activity Logs Timeline Feed */}
      <div className="px-5 mt-7">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <AuraIcon name="calendar" size={13} />
          Histórico Recente de Atividade
        </h4>

        {activityLogs.length === 0 ? (
          <div className="bg-white border rounded-2xl p-8 text-center text-slate-405 text-slate-400 text-xs">
            Ainda não há novas atividades cadastradas. Que tal completar a primeira missão?
          </div>
        ) : (
          <div className="relative border-l border-slate-205 pl-4.5 ml-1.5 flex flex-col gap-4">
            {activityLogs.map((log) => {
              // Icon mapping based on activity type
              const typeConfig = {
                missao: { bg: 'bg-cyan-55 bg-cyan-100', text: 'text-cyan-600', icon: 'zap' },
                emblema: { bg: 'bg-violet-55 bg-violet-100', text: 'text-violet-600', icon: 'award' },
                nivel: { bg: 'bg-amber-55 bg-amber-100', text: 'text-amber-600', icon: 'sparkles' },
                diario: { bg: 'bg-orange-55 bg-orange-100', text: 'text-orange-600', icon: 'flame' }
              }[log.type];

              return (
                <div key={log.id} className="relative group">
                  {/* Outer floating circle bullet points */}
                  <div className={`absolute -left-[27.5px] top-1 w-5.5 h-5.5 rounded-full ${typeConfig.bg} border-2 border-white flex items-center justify-center shadow-xs text-white`}>
                    <AuraIcon name={typeConfig.icon} className={`${typeConfig.text}`} size={10} />
                  </div>

                  <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-extrabold text-slate-800 leading-snug">{log.title}</p>
                      <span className="text-[9px] font-semibold text-slate-400 font-mono shrink-0 pl-2">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal">{log.description}</p>
                    
                    {log.xpGained && (
                      <div className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-600 rounded px-1.5 py-0.5 text-[8.5px] font-black font-mono mt-2.5">
                        <span>+{log.xpGained} XP</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

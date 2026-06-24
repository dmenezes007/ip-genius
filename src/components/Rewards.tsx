import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserStats } from '../types';
import AuraIcon from './AuraIcon';

interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  iconName: string;
  category: 'voucher' | 'game' | 'social';
  claimed: boolean;
}

interface RewardsProps {
  stats: UserStats;
  onClaimReward: (rewardId: string, cost: number) => void;
  rewards: RewardItem[];
}

export default function Rewards({ stats, onClaimReward, rewards }: RewardsProps) {
  // Compute available categories or stats
  const claimedCount = rewards.filter(r => r.claimed).length;

  return (
    <div className="flex flex-col bg-slate-50 min-h-full pb-24 text-slate-800">
      {/* Top Banner */}
      <div className="turquoise-gradient pt-7 pb-6 px-5 text-white shadow-md">
        <h2 className="text-xl font-extrabold tracking-tight">Shopping de Recompensas</h2>
        <p className="text-emerald-100 text-[11px] mt-0.5">Use o seu saldo acumulado para resgatar mimos exclusivos.</p>

        {/* Balance Display */}
        <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center shadow-inner">
              <AuraIcon name="coins" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-wide">Seu Saldo</p>
              <p className="text-sm font-extrabold text-white">{stats.xp} XP / AuraMoedas</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-emerald-100 font-bold uppercase">Resgates</p>
            <p className="text-xs font-mono font-black text-amber-300">{claimedCount} cupons ativos</p>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="px-4 mt-5 flex-1">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <AuraIcon name="gift" size={13} />
          Mimos Disponíveis para Resgatar
        </h4>

        <div className="grid grid-cols-2 gap-3.5">
          {rewards.map((reward) => {
            const canAfford = stats.xp >= reward.cost;
            const isClaimed = reward.claimed;

            const categoryStyle = {
              voucher: { bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
              game: { bg: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
              social: { bg: 'bg-amber-50 text-amber-600 border-amber-100' }
            }[reward.category];

            return (
              <motion.div
                key={reward.id}
                whileHover={{ y: -2 }}
                className={`bg-white rounded-2.5xl rounded-2xl border p-4.5 flex flex-col justify-between shadow-sm transition-all relative ${
                  isClaimed 
                    ? 'border-slate-200/60 bg-slate-50 opacity-80' 
                    : canAfford 
                      ? 'border-emerald-250 hover:shadow-md' 
                      : 'border-slate-100'
                }`}
              >
                {isClaimed && (
                  <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full z-10 shadow-xs">
                    Comprado
                  </span>
                )}

                <div>
                  {/* Icon */}
                  <div className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center mb-3 ${categoryStyle.bg}`}>
                    <AuraIcon name={reward.iconName} size={18} />
                  </div>

                  {/* Title */}
                  <p className="text-xs font-extrabold text-slate-800 leading-snug">
                    {reward.title}
                  </p>
                  
                  {/* Description */}
                  <p className="text-[10px] text-slate-400 leading-normal mt-1 min-h-[30px] line-clamp-2">
                    {reward.description}
                  </p>
                </div>

                {/* Footer and button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-semibold font-sans">Custo:</span>
                    <span className="font-mono font-extrabold text-cyan-600">{reward.cost} XP</span>
                  </div>

                  {isClaimed ? (
                    <button
                      disabled
                      className="w-full py-2 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-slate-200"
                    >
                      Disponível no Perfil
                    </button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onClaimReward(reward.id, reward.cost)}
                      disabled={!canAfford}
                      className={`w-full py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center focus:outline-none transition-colors border ${
                        canAfford 
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-650 cursor-pointer shadow-sm shadow-emerald-50' 
                          : 'bg-slate-50 text-slate-450 border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Resgatar' : 'XP Insuficiente'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Helper footer */}
      <div className="px-4 mt-6">
        <div className="bg-amber-50 rounded-2xl p-4 flex gap-3 items-center border border-amber-100">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AuraIcon name="gift" size={20} />
          </div>
          <div>
            <p className="text-[11px] font-extrabold text-amber-800">Sobre os Mimos</p>
            <p className="text-[9.5px] text-slate-500 leading-normal mt-0.5">
              Os mimos são liberados na hora. O código do voucher é enviado via e-mail e exibido em sua carteira digital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

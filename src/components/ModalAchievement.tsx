import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AuraIcon from './AuraIcon';

interface ModalAchievementProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  icon: string;
  type: 'nivel' | 'emblema' | 'compra';
}

export default function ModalAchievement({ isOpen, onClose, title, subtitle, icon, type }: ModalAchievementProps) {
  if (!isOpen) return null;

  const headerColors = {
    nivel: 'from-amber-400 via-yellow-400 to-amber-500 text-slate-900',
    emblema: 'from-violet-600 via-purple-500 to-indigo-600 text-white',
    compra: 'from-emerald-500 via-teal-400 to-emerald-600 text-white'
  }[type];

  const typeLabel = {
    nivel: 'Novo Nível Alcançado!',
    emblema: 'Emblema Desbloqueado!',
    compra: 'Resgate Efetuado com Sucesso!'
  }[type];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-55 p-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 20, stiffness: 250 }}
          className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative border border-slate-100"
        >
          {/* Sparkly background decoration */}
          <div className="absolute top-0 inset-x-0 h-44 bg-slate-100/50 -skew-y-6 transform origin-top-left -z-1" />

          {/* Golden/Purple High-contrast Top Badge area */}
          <div className={`bg-gradient-to-br ${headerColors} py-8 px-6 text-center relative overflow-hidden flex flex-col items-center`}>
            {/* Animated background highlights */}
            <div className="absolute w-48 h-48 bg-white/10 rounded-full -top-12 -right-12 blur-xl animate-pulse" />
            <div className="absolute w-48 h-48 bg-white/5 rounded-full -bottom-12 -left-12 blur-xl animate-pulse" />

            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFF275] bg-black/20 px-3.5 py-1 rounded-full px-3 py-1 font-mono">
              {typeLabel}
            </span>

            {/* Glowing Icon Container */}
            <div className="relative mt-5 mb-1">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-white/20 rounded-full scale-125 border border-white/25 border-dashed"
              />
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-800 scale-105 relative z-10">
                <AuraIcon 
                  name={icon} 
                  className={
                    type === 'nivel' 
                      ? 'text-amber-500' 
                      : type === 'compra' 
                        ? 'text-emerald-500' 
                        : 'text-violet-500'
                  } 
                  size={38} 
                />
              </div>
            </div>
          </div>

          {/* Info Details Section */}
          <div className="p-7 text-center bg-white flex flex-col items-center">
            {/* Confetti Micro-icon */}
            <span className="text-3xl">🎉</span>
            
            <h3 className="text-xl font-black text-slate-900 mt-2 leading-tight">
              {title}
            </h3>
            
            <p className="text-xs text-slate-500 mt-2.5 leading-relaxed max-w-xs">
              {subtitle}
            </p>

            {type === 'nivel' ? (
              <div className="mt-4 bg-amber-50 border border-amber-100 px-4 py-2.5 rounded-2xl text-[11px] font-bold text-amber-800">
                ⭐ Você desbloqueou +2 novos emblemas na galeria!
              </div>
            ) : type === 'emblema' ? (
              <div className="mt-4 bg-violet-50 border border-violet-100 px-4 py-2.5 rounded-2xl text-[11px] font-bold text-violet-800">
                💎 Reclame esta conquista no histórico do seu perfil.
              </div>
            ) : (
              <div className="mt-4 bg-emerald-55 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-2xl text-[11.5px] font-bold text-emerald-800">
                ✉️ O cupom de uso foi enviado para seu e-mail cadastrado!
              </div>
            )}

            {/* Acknowledge Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`w-full mt-6 py-3.5 rounded-2xl text-xs font-extrabold uppercase tracking-widest text-center cursor-pointer text-white shadow-md focus:outline-none ${
                type === 'nivel' 
                  ? 'bg-amber-500 shadow-amber-100/50 hover:bg-amber-600' 
                  : 'turquoise-gradient shadow-cyan-100/30 hover:opacity-95'
              }`}
            >
              Celebrar Conquista !
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

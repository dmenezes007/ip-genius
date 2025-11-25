
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { Lightbulb, Rocket, Brain } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center overflow-hidden font-display">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black"></div>
      
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
            <div className="bg-white p-6 rounded-3xl shadow-2xl relative z-10 flex gap-4">
                <Lightbulb className="w-12 h-12 text-amber-500 animate-bounce" />
                <Brain className="w-12 h-12 text-indigo-500 animate-pulse" />
                <Rocket className="w-12 h-12 text-cyan-500" />
            </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight text-center">
          IP <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Genius</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-medium tracking-wide mb-12 max-w-lg text-center leading-relaxed">
          Scale Up do Programa PI nas Escolas
        </p>

        <button 
          onClick={onComplete}
          className="group relative px-10 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all"
        >
          INICIAR JORNADA
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;

import { ChevronRight, GraduationCap } from 'lucide-react';
import { EducationLevel } from '../types';
import { LEVELS } from '../data/ipContent';

interface LevelSelectionProps {
  onSelectLevel: (level: EducationLevel) => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ onSelectLevel }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center font-display">Selecione seu Nível de Ensino</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {Object.entries(LEVELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onSelectLevel(key as EducationLevel)}
            className="group p-8 bg-white border-2 border-slate-100 hover:border-cyan-500 rounded-3xl shadow-lg hover:shadow-cyan-500/20 transition-all text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${key === 'Infantil' ? 'bg-orange-100 text-orange-600' : key === 'Medio' ? 'bg-purple-100 text-purple-600' : 'bg-cyan-100 text-cyan-600'}`}>
                 <GraduationCap className="w-8 h-8" />
              </div>
              <span className="text-xl font-bold text-slate-700 group-hover:text-cyan-600">{label}</span>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-cyan-500" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;

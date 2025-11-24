import { ArrowLeft, BookOpen, User } from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
  onBack: () => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center relative">
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-cyan-600 font-bold"><ArrowLeft className="w-5 h-5"/> Voltar</button>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center font-display">Como você vai acessar?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <button onClick={() => onSelectRole('Teacher')} className="p-10 bg-white border-2 border-indigo-100 hover:border-indigo-500 rounded-3xl shadow-xl hover:scale-105 transition-all flex flex-col items-center gap-4 text-center">
           <div className="p-6 bg-indigo-100 rounded-full text-indigo-600"><BookOpen className="w-12 h-12" /></div>
           <div>
             <h3 className="text-2xl font-bold text-slate-800">Sou Professor(a)</h3>
             <p className="text-slate-500 mt-2">Acessar Planos de Aula, BNCC e Metodologia.</p>
           </div>
        </button>
        <button onClick={() => onSelectRole('Student')} className="p-10 bg-white border-2 border-amber-100 hover:border-amber-500 rounded-3xl shadow-xl hover:scale-105 transition-all flex flex-col items-center gap-4 text-center">
           <div className="p-6 bg-amber-100 rounded-full text-amber-600"><User className="w-12 h-12" /></div>
           <div>
             <h3 className="text-2xl font-bold text-slate-800">Sou Estudante</h3>
             <p className="text-slate-500 mt-2">Acessar Jogos, Desafios e falar com Master PI.</p>
           </div>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;

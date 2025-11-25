import React, { useState } from 'react';
import { EducationLevel, UserRole } from './types';
import Layout, { SidebarItem } from './components/Layout';
import IntroScreen from './components/IntroScreen';
import LevelSelection from './components/LevelSelection';
import RoleSelection from './components/RoleSelection';
import ApiKeyModal from './components/ApiKeyModal';

// Icons for sidebar
import { 
  Home, 
  Book, 
  FlaskConical, 
  Users, 
  Lightbulb, 
  Puzzle, 
  Rocket,
  MessageCircle,
  ImageIcon
} from 'lucide-react';

// Professor Modules
import ProfessorHome from './src/modules/professor/ProfessorHome';
import ProfessorMetodologia from './src/modules/professor/ProfessorMetodologia';
import ProfessorBNCC from './src/modules/professor/ProfessorBNCC';
import ProfessorPlanos from './src/modules/professor/ProfessorPlanos';
import ProfessorAIAssistant from './src/modules/professor/ProfessorAIAssistant';

// Estudante Modules
import EstudanteHome from './src/modules/estudante/EstudanteHome';
import EstudanteConceitos from './src/modules/estudante/EstudanteConceitos';
import EstudanteJogos from './src/modules/estudante/EstudanteJogos';
import EstudanteInovadores from './src/modules/estudante/EstudanteInovadores';
import EstudanteMasterPI from './src/modules/estudante/EstudanteMasterPI';
import EstudanteImageGen from './src/modules/estudante/EstudanteImageGen';


const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [level, setLevel] = useState<EducationLevel | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeModule, setActiveModule] = useState('home');

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const resetFlow = () => {
    setLevel(null);
    setRole(null);
    setActiveModule('home');
  };

  const renderModule = () => {
    if (role === 'Teacher') {
      switch (activeModule) {
        case 'home': return <ProfessorHome />;
        case 'metodologia': return <ProfessorMetodologia />;
        case 'bncc': return <ProfessorBNCC />;
        case 'planos': return <ProfessorPlanos />;
        case 'ia': return <ProfessorAIAssistant level={level!} />;
        default: return <ProfessorHome />;
      }
    }
    if (role === 'Student') {
      switch (activeModule) {
        case 'home': return <EstudanteHome />;
        case 'conceitos': return <EstudanteConceitos />;
        case 'jogos': return <EstudanteJogos />;
        case 'inovadores': return <EstudanteInovadores />;
        case 'masterpi': return <EstudanteMasterPI level={level!} />;
        case 'imagegen': return <EstudanteImageGen />;
        default: return <EstudanteHome />;
      }
    }
    return null;
  };

  const teacherSidebar = (isOpen: boolean) => (
    <ul>
      <SidebarItem icon={<Home />} text="Visão Geral" isOpen={isOpen} active={activeModule === 'home'} onClick={() => setActiveModule('home')} />
      <SidebarItem icon={<Book />} text="Metodologia" isOpen={isOpen} active={activeModule === 'metodologia'} onClick={() => setActiveModule('metodologia')} />
      <SidebarItem icon={<Users />} text="BNCC" isOpen={isOpen} active={activeModule === 'bncc'} onClick={() => setActiveModule('bncc')} />
      <SidebarItem icon={<FlaskConical />} text="Planos de Aula" isOpen={isOpen} active={activeModule === 'planos'} onClick={() => setActiveModule('planos')} />
      <SidebarItem icon={<Rocket />} text="Assistente IA" isOpen={isOpen} active={activeModule === 'ia'} onClick={() => setActiveModule('ia')} />
    </ul>
  );

  const studentSidebar = (isOpen: boolean) => (
     <ul>
      <SidebarItem icon={<Home />} text="Minha Jornada" isOpen={isOpen} active={activeModule === 'home'} onClick={() => setActiveModule('home')} />
      <SidebarItem icon={<Lightbulb />} text="Conceitos" isOpen={isOpen} active={activeModule === 'conceitos'} onClick={() => setActiveModule('conceitos')} />
      <SidebarItem icon={<Puzzle />} text="Jogos e Desafios" isOpen={isOpen} active={activeModule === 'jogos'} onClick={() => setActiveModule('jogos')} />
      <SidebarItem icon={<Users />} text="Inovadores" isOpen={isOpen} active={activeModule === 'inovadores'} onClick={() => setActiveModule('inovadores')} />
      <SidebarItem icon={<MessageCircle />} text="Master PI" isOpen={isOpen} active={activeModule === 'masterpi'} onClick={() => setActiveModule('masterpi')} />
      <SidebarItem icon={<ImageIcon />} text="Gerador de Invenções" isOpen={isOpen} active={activeModule === 'imagegen'} onClick={() => setActiveModule('imagegen')} />
    </ul>
  );

  // --- Render Logic ---

  if (!apiKey || apiKey === "SUA_CHAVE_AQUI") {
    return <ApiKeyModal />;
  }

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  if (!level) {
    return <LevelSelection onSelectLevel={setLevel} />;
  }

  if (!role) {
    return <RoleSelection onSelectRole={setRole} onBack={() => setLevel(null)} />;
  }

  // Main application layout
  return (
    <Layout sidebarItems={(isOpen) => (
        <>{role === 'Teacher' ? teacherSidebar(isOpen) : studentSidebar(isOpen)}</>
    )}>
      {renderModule()}
    </Layout>
  );
};

export default App;
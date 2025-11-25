import React, { useState } from 'react';
import { EducationLevel, UserRole } from './types';
import IntroScreen from './components/IntroScreen';
import LevelSelection from './components/LevelSelection';
import RoleSelection from './components/RoleSelection';
import ProfessorDashboard from './components/Professor/ProfessorDashboard';
import EstudanteDashboard from './components/Estudante/EstudanteDashboard';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [level, setLevel] = useState<EducationLevel | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const resetFlow = () => {
    setLevel(null);
    setRole(null);
  };

  // Render Logic
  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  if (!level) {
    return <LevelSelection onSelectLevel={(selectedLevel) => setLevel(selectedLevel)} />;
  }

  if (!role) {
    return <RoleSelection onSelectRole={(selectedRole) => setRole(selectedRole)} onBack={() => setLevel(null)} />;
  }

  // Render the appropriate dashboard based on the selected role
  if (role === 'Professor') {
    return <ProfessorDashboard level={level} onReset={resetFlow} />;
  }

  if (role === 'Estudante') {
    return <EstudanteDashboard level={level} onReset={resetFlow} />;
  }

  // Fallback to reset the flow if no role is matched (should not happen in normal flow)
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button onClick={resetFlow} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Role not found. Reset.
      </button>
    </div>
  );
};

export default App;
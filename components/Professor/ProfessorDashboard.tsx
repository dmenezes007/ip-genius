import React from 'react';
import { EducationLevel } from '../../types';
import { professorContent } from '../../src/content/professorContent';

interface ProfessorDashboardProps {
  level: EducationLevel;
  onReset: () => void;
}

const ProfessorDashboard: React.FC<ProfessorDashboardProps> = ({ level, onReset }) => {
  const { 
    introducao, 
    metodologia, 
    correlacaoBNCC, 
    competencias, 
    categoriasTransversais, 
    curriculo, 
    planosDeAula, 
    eventos 
  } = professorContent;

  const Card: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <header className="flex items-center justify-between pb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">Portal do Professor</h1>
          <p className="text-lg text-gray-600">Nível de Ensino: <span className="font-semibold">{level}</span></p>
        </div>
        <button
          onClick={onReset}
          className="px-6 py-2 font-semibold text-white transition-transform duration-150 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 active:scale-95"
        >
          Voltar
        </button>
      </header>

      <main className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Introdução */}
        <Card title={introducao.title}>
          <p className="text-gray-700">{introducao.mission}</p>
        </Card>

        {/* Metodologia */}
        <Card title={metodologia.title}>
          <p className="mb-2 font-semibold text-gray-700">O ciclo do programa consiste em 5 fases:</p>
          <ul className="space-y-1 list-disc list-inside">
            {metodologia.ciclo.map(item => <li key={item} className="text-gray-600">{item}</li>)}
          </ul>
          <p className="mt-4 mb-2 font-semibold text-gray-700">Utilizamos Metodologias Ativas como:</p>
          <ul className="space-y-1 list-disc list-inside">
            {metodologia.metodologiasAtivas.map(item => <li key={item} className="text-gray-600">{item}</li>)}
          </ul>
        </Card>
        
        {/* BNCC */}
        <Card title={correlacaoBNCC.title}>
          <p className="mb-3 text-gray-700">{correlacaoBNCC.description}</p>
          <ul className="space-y-2">
            {correlacaoBNCC.codigos.map(item => (
              <li key={item.code} className="p-2 text-sm bg-gray-200 rounded">
                <strong className="text-gray-800">{item.code}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </Card>

        {/* Competências */}
        <Card title={competencias.title}>
          <ul className="space-y-2 list-disc list-inside">
            {competencias.items.map(item => <li key={item} className="text-gray-700">{item}</li>)}
          </ul>
        </Card>
        
        {/* Categorias Transversais */}
        <Card title={categoriasTransversais.title}>
          <ul className="space-y-3">
            {categoriasTransversais.items.map(item => (
              <li key={item.title}>
                <strong className="font-semibold text-gray-800">{item.title}:</strong>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Currículo */}
        <Card title={curriculo.title}>
          <ul className="space-y-2 list-disc list-inside">
            {curriculo.sugestoes.map(item => <li key={item} className="text-gray-700">{item}</li>)}
          </ul>
        </Card>

        {/* Planos de Aula */}
        <Card title={planosDeAula.title}>
          <ul className="space-y-3">
            {planosDeAula.exemplos.map(item => (
               <li key={item.title}>
                <strong className="font-semibold text-gray-800">{item.title}</strong>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Eventos */}
        <Card title={eventos.title}>
          <ul className="space-y-2 list-disc list-inside">
            {eventos.sugestoes.map(item => <li key={item} className="text-gray-700">{item}</li>)}
          </ul>
        </Card>

      </main>
    </div>
  );
};

export default ProfessorDashboard;

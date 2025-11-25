import React from 'react';
import { EducationLevel } from '../../types';
import { estudanteContent } from '../../src/content/estudanteContent';
// Imagens dos personagens
import MasterPi from '../../imgs/Master PI.png';
import SrCriativo from '../../imgs/Sr. Criativo.png';
import CidPi from '../../imgs/Cid PI.png';
import CapitaTech from '../../imgs/Capitã Tech.png';
import MestreMercado from '../../imgs/Mestre do Mercado.png';
import SuperTerra from '../../imgs/Planeta Terra.png';

interface EstudanteDashboardProps {
  level: EducationLevel;
  onReset: () => void;
}

const EstudanteDashboard: React.FC<EstudanteDashboardProps> = ({ level, onReset }) => {
  const {
    interfaces,
    jogos,
    desafios,
    curiosidades,
    conceitos,
    ods,
    gibis,
    equidade
  } = estudanteContent;

  const personagemImages: { [key: string]: string } = {
    "Master PI": MasterPi,
    "Sr. Criativo": SrCriativo,
    "Cid PI": CidPi,
    "Capitã Tech": CapitaTech,
    "Mestre do Mercado": MestreMercado,
    "Super Terra": SuperTerra
  };

  const Card: React.FC<{title: string; children: React.ReactNode; className?: string}> = ({ title, children, className }) => (
    <div className={`p-6 bg-white rounded-lg shadow-md ${className}`}>
      <h2 className="mb-4 text-2xl font-bold text-yellow-500">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-blue-50">
      <header className="flex items-center justify-between pb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-800">Explorador de Ideias</h1>
          <p className="text-lg text-gray-700">Sua jornada no nível <span className="font-semibold">{level}</span> começa agora!</p>
        </div>
        <button
          onClick={onReset}
          className="px-6 py-2 font-semibold text-white transition-transform duration-150 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 active:scale-95"
        >
          Voltar
        </button>
      </header>

      <main className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        
        <Card title={gibis.title} className="lg:col-span-3">
            <p className="mb-4 text-gray-700">{gibis.description}</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {gibis.personagens.map(p => (
                    <div key={p.name} className="text-center">
                        <img src={personagemImages[p.name]} alt={p.name} className="w-24 h-24 mx-auto mb-2 rounded-full shadow-lg"/>
                        <strong className="text-sm text-blue-800">{p.name}</strong>
                        <p className="text-xs text-gray-600">{p.role}</p>
                    </div>
                ))}
            </div>
        </Card>

        <Card title={interfaces.title}>
           <ul className="space-y-3">
            {interfaces.items.map(item => (
              <li key={item.title}>
                <strong className="font-semibold text-blue-700">{item.title}:</strong>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={conceitos.title}>
           <ul className="space-y-3">
            {conceitos.items.map(item => (
              <li key={item.title}>
                <strong className="font-semibold text-blue-700">{item.title}:</strong>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </Card>

         <Card title={jogos.title}>
            <ul className="space-y-2 list-disc list-inside">
                {jogos.items.map(item => <li key={item} className="text-gray-700">{item}</li>)}
            </ul>
        </Card>

        <Card title={desafios.title}>
            <ul className="space-y-2 list-disc list-inside">
                {desafios.items.map(item => <li key={item} className="text-gray-700">{item}</li>)}
            </ul>
        </Card>

        <Card title={curiosidades.title}>
             <ul className="space-y-2 list-disc list-inside">
                {curiosidades.items.map(item => <li key={item} className="text-gray-700">{item}</li>)}
            </ul>
        </Card>

        <Card title={ods.title}>
            <p className="text-gray-700">{ods.description}</p>
        </Card>

        <Card title={equidade.title}>
            <p className="text-gray-700">{equidade.text}</p>
        </Card>
      </main>
    </div>
  );
};

export default EstudanteDashboard;

import React from 'react';
import { estudanteContent } from '../../../src/content/estudanteContent';

// Import images statically
import SrCriativo from '../../../imgs/Pi nas Escolas - Head - Sr. Criativo.png';
import CidPi from '../../../imgs/Pi nas Escolas - Head - Cid PI.png';
import CapitaTech from '../../../imgs/Pi nas Escolas - Head - Capitã Tech.png';
import SuperTerra from '../../../imgs/Pi nas Escolas - Head - Super Terra.png';
import MestreMercado from '../../../imgs/Pi nas Escolas - Head - Mestre do Mercado.png';
import CidPiFull from '../../../imgs/Cid PI.png';

const personagemImages: { [key: string]: string } = {
  "Sr. Criativo": SrCriativo,
  "Cid PI": CidPi,
  "Capitã Tech": CapitaTech,
  "Super Terra": SuperTerra,
  "Mestre do Mercado": MestreMercado,
};

const EstudanteHome: React.FC = () => {
    const { gibis } = estudanteContent;

    return (
        <div>
            <div className="p-8 mb-8 text-white bg-yellow-500 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img src={CidPiFull} alt="Cid PI" className="w-40 h-40 rounded-full border-4 border-white shadow-lg"/>
                    <div>
                        <h1 className="text-4xl font-extrabold">Bem-vindo, jovem inventor!</h1>
                        <p className="mt-2 text-lg text-yellow-100 max-w-3xl">
                            Sou o Cid PI, e estou aqui para te ajudar a entender como proteger suas criações e respeitar as dos outros. Vamos começar essa jornada?
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">{gibis.title}</h2>
                <p className="mb-6 text-gray-600">{gibis.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
                    {gibis.personagens.map(p => (
                        <div key={p.name} className="flex flex-col items-center">
                            <img 
                                src={personagemImages[p.name] || 'https://picsum.photos/seed/placeholder/128'}
                                alt={p.name} 
                                className="w-24 h-24 object-contain rounded-full shadow-lg mb-2 transition-transform hover:scale-110"
                            />
                            <strong className="text-sm font-bold text-yellow-800">{p.name}</strong>
                            <p className="text-xs text-gray-500">{p.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EstudanteHome;


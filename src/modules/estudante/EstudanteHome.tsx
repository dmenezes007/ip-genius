import React from 'react';
import { estudanteContent } from '../../../src/content/estudanteContent';
import { EducationLevel } from '../../../types';

// Import full-body images
import SrCriativoFull from '../../../imgs/Sr. Criativo.png';
import CidPiFull from '../../../imgs/Cid PI.png';
import CapitaTechFull from '../../../imgs/Capitã Tech.png';
import SuperTerraFull from '../../../imgs/Planeta Terra.png';
import MestreMercadoFull from '../../../imgs/Mestre do Mercado.png';

// Import head images for the grid
import SrCriativoHead from '../../../imgs/Pi nas Escolas - Head - Sr. Criativo.png';
import CidPiHead from '../../../imgs/Pi nas Escolas - Head - Cid PI.png';
import CapitaTechHead from '../../../imgs/Pi nas Escolas - Head - Capitã Tech.png';
import SuperTerraHead from '../../../imgs/Pi nas Escolas - Head - Super Terra.png';
import MestreMercadoHead from '../../../imgs/Pi nas Escolas - Head - Mestre do Mercado.png';


const levelCharacters: { [key in EducationLevel]?: { img: string; name: string; message: string } } = {
  Infantil: { img: SrCriativoFull, name: 'Sr. Criativo', message: 'Olá, pequeno gênio! Sou o Sr. Criativo e vamos nos divertir muito criando coisas novas!' },
  Fundamental_I: { img: CidPiFull, name: 'Cid PI', message: 'E aí, futuro inventor! Sou o Cid PI e vou te mostrar como proteger suas ideias e respeitar as dos colegas.' },
  Fundamental_II: { img: CapitaTechFull, name: 'Capitã Tech', message: 'Saudações, explorador(a) da tecnologia! Sou a Capitã Tech. Juntos, vamos transformar o futuro com ciência e inovação.' },
  Medio: { img: MestreMercadoFull, name: 'Mestre do Mercado', message: 'Olá, visionário(a)! Eu sou o Mestre do Mercado. Vou te ensinar a transformar suas grandes ideias em negócios de sucesso.' },
  Superior: { img: SuperTerraFull, name: 'Super Terra', message: 'Olá, agente de mudança! Eu sou o Super Terra. Vamos usar a inovação para criar um planeta mais sustentável para todos.' },
};

const personagemHeadImages: { [key:string]: string } = {
  "Sr. Criativo": SrCriativoHead,
  "Cid PI": CidPiHead,
  "Capitã Tech": CapitaTechHead,
  "Super Terra": SuperTerraHead,
  "Mestre do Mercado": MestreMercadoHead,
}

interface EstudanteHomeProps {
  level: EducationLevel;
}

const EstudanteHome: React.FC<EstudanteHomeProps> = ({ level }) => {
    const { gibis } = estudanteContent;
    const character = levelCharacters[level] || levelCharacters['Fundamental_I']!;

    return (
        <div>
            <div className="p-8 mb-8 text-white bg-yellow-500 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img src={character.img} alt={character.name} style={{ maxHeight: '160px' }}/>
                    <div>
                        <h1 className="text-4xl font-extrabold">Bem-vindo, jovem inventor!</h1>
                        <p className="mt-2 text-lg text-yellow-100 max-w-3xl">
                            {character.message}
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
                                src={personagemHeadImages[p.name] || 'https://picsum.photos/seed/placeholder/128'}
                                alt={p.name} 
                                className="w-24 h-24 object-contain mb-2 transition-transform hover:scale-110"
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


import React from 'react';
import { estudanteContent } from '../../../src/content/estudanteContent';
import { Puzzle, Gamepad2 } from 'lucide-react';

const Card: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
    <div className="p-8 bg-white rounded-2xl shadow-xl h-full">
        <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-pink-100 rounded-full text-pink-600">{icon}</div>
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        </div>
        <ul className="space-y-3">
            {items.map(item => (
                <li key={item} className="flex items-center gap-3 p-3 text-lg text-gray-700 transition-colors bg-gray-50 rounded-lg hover:bg-pink-50">
                    <span className="font-mono text-pink-500">{'>'}</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const EstudanteJogos: React.FC = () => {
    const { jogos, desafios } = estudanteContent;

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <Card title={jogos.title} items={jogos.items} icon={<Puzzle />} />
            <Card title={desafios.title} items={desafios.items} icon={<Gamepad2 />} />
        </div>
    );
};

export default EstudanteJogos;

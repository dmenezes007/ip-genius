import React from 'react';
import { estudanteContent } from '../../../src/content/estudanteContent';
import { Users, HeartHandshake } from 'lucide-react';

const EstudanteInovadores: React.FC = () => {
    const { curiosidades, equidade } = estudanteContent;

    return (
        <div className="space-y-8">
            <div className="p-8 bg-white rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-teal-100 rounded-full text-teal-600"><Users /></div>
                    <h2 className="text-2xl font-bold text-gray-800">{curiosidades.title}</h2>
                </div>
                <ul className="space-y-3 list-disc list-inside">
                    {curiosidades.items.map(item => (
                        <li key={item} className="text-gray-700">{item}</li>
                    ))}
                </ul>
            </div>
            
            <div className="p-8 bg-white rounded-2xl shadow-lg">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-indigo-100 rounded-full text-indigo-600"><HeartHandshake /></div>
                    <h2 className="text-2xl font-bold text-gray-800">{equidade.title}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{equidade.text}</p>
            </div>
        </div>
    );
};

export default EstudanteInovadores;

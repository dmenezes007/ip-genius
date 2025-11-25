import React from 'react';
import { professorContent } from '../../../src/content/professorContent';
import { Layers, ShieldCheck, Target } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode; }> = ({ title, children, icon }) => (
    <div className="p-6 mb-8 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600">{icon}</div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        {children}
    </div>
);

const ProfessorBNCC: React.FC = () => {
    const { correlacaoBNCC, competencias } = professorContent;

    return (
        <div>
            <Section title={correlacaoBNCC.title} icon={<Layers />}>
                <p className="mb-4 text-gray-600">{correlacaoBNCC.description}</p>
                <div className="space-y-3">
                    {correlacaoBNCC.codigos.map(item => (
                        <div key={item.code} className="p-4 border border-gray-200 rounded-lg">
                            <p className="font-semibold text-purple-800">{item.code}</p>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title={competencias.title} icon={<ShieldCheck />}>
                 <ul className="space-y-2 list-disc list-inside">
                    {competencias.items.map(item => (
                        <li key={item} className="text-gray-700">
                           {item}
                        </li>
                    ))}
                </ul>
            </Section>
        </div>
    );
};

export default ProfessorBNCC;

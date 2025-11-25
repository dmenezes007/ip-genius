import React from 'react';
import { professorContent } from '../../../src/content/professorContent';
import { Zap, RotateCw, Projector } from 'lucide-react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600">{icon}</div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        {children}
    </div>
);

const ProfessorMetodologia: React.FC = () => {
    const { metodologia } = professorContent;

    return (
        <div className="space-y-8">
            <InfoCard title="Ciclo do Programa" icon={<RotateCw />}>
                <p className="mb-4 text-gray-600">Nossa metodologia é cíclica e contínua, garantindo que o aprendizado seja reforçado e aplicado em diferentes estágios.</p>
                <div className="flex flex-wrap gap-4">
                    {metodologia.ciclo.map((item, index) => (
                        <div key={item} className="flex items-center gap-2 p-3 text-gray-700 bg-gray-100 rounded-lg">
                            <span className="font-bold text-green-600">{index + 1}</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </InfoCard>

            <InfoCard title="Metodologias Ativas" icon={<Zap />}>
                 <p className="mb-4 text-gray-600">Adotamos abordagens de ensino modernas para engajar os alunos e tornar o aprendizado mais significativo e prático.</p>
                <ul className="space-y-3">
                    {metodologia.metodologiasAtivas.map(item => (
                        <li key={item} className="p-4 text-lg font-medium text-gray-800 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                            {item}
                        </li>
                    ))}
                </ul>
            </InfoCard>
        </div>
    );
};

export default ProfessorMetodologia;

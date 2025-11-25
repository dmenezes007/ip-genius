import React from 'react';
import { professorContent } from '../../../src/content/professorContent';
import { ClipboardList, CalendarDays, PenSquare } from 'lucide-react';

const Card: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="p-6 bg-white rounded-2xl shadow-lg h-full">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 rounded-full text-red-600">{icon}</div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        {children}
    </div>
);

const ProfessorPlanos: React.FC = () => {
    const { curriculo, planosDeAula, eventos } = professorContent;

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                 <Card title="Sugestão de Currículo" icon={<ClipboardList />}>
                    <ul className="space-y-2 list-disc list-inside">
                        {curriculo.sugestoes.map(item => (
                            <li key={item} className="text-gray-700">{item}</li>
                        ))}
                    </ul>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-8">
                <Card title="Exemplos de Planos de Aula" icon={<PenSquare />}>
                    <div className="space-y-4">
                        {planosDeAula.exemplos.map(item => (
                            <div key={item.title} className="p-4 bg-gray-50 rounded-lg">
                                <p className="font-bold text-red-800">{item.title}</p>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card title="Sugestões de Eventos" icon={<CalendarDays />}>
                    <ul className="space-y-2 list-disc list-inside">
                        {eventos.sugestoes.map(item => (
                            <li key={item} className="text-gray-700">{item}</li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default ProfessorPlanos;

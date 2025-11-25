import React from 'react';
import { professorContent } from '../../../src/content/professorContent';
import { Paintbrush, Shield, Cpu, Leaf, Briefcase, FlaskConical } from 'lucide-react';

const Card: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}> = ({ icon, title, description, onClick, className, style }) => (
  <div
    className={`p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer animate-fade-in-up ${className}`}
    style={{...style, animationFillMode: 'backwards'}}
    onClick={onClick}
  >
    <div className="flex items-start gap-4">
      <div className="p-3 bg-blue-100 rounded-full text-blue-600">{icon}</div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

const categoryIcons: { [key: string]: React.ReactNode } = {
  "Criatividade": <Paintbrush />,
  "Cidadania": <Shield />,
  "Tecnologia": <Cpu />,
  "Planeta": <Leaf />,
  "Negócios": <Briefcase />,
};

const ProfessorHome: React.FC = () => {
  const { introducao, categoriasTransversais } = professorContent;

  return (
    <div>
      <div className="p-8 mb-8 text-white bg-blue-600 rounded-2xl shadow-xl animate-fade-in-up">
        <h1 className="text-4xl font-extrabold">{introducao.title}</h1>
        <p className="mt-2 text-lg text-blue-100 max-w-3xl">{introducao.mission}</p>
      </div>

      <h2 className="mb-6 text-3xl font-bold text-gray-800 animate-fade-in-up" style={{animationDelay: '100ms'}}>Categorias Transversais do Programa</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoriasTransversais.items.map((item, index) => (
          <Card
            key={item.title}
            icon={categoryIcons[item.title] || <FlaskConical />}
            title={item.title}
            description={item.description}
            style={{ animationDelay: `${150 * (index + 1)}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessorHome;

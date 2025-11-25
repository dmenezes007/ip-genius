import React, { useState } from 'react';
import { estudanteContent } from '../../../src/content/estudanteContent';
import { Lightbulb, BookOpen, Scaling } from 'lucide-react';

const EstudanteConceitos: React.FC = () => {
    const { conceitos, interfaces } = estudanteContent;
    const [visibleSection, setVisibleSection] = useState('conceitos');

    const TabButton: React.FC<{ section: string; title: string }> = ({ section, title }) => (
        <button
            onClick={() => setVisibleSection(section)}
            className={`px-4 py-2 font-bold rounded-full transition-colors ${
                visibleSection === section 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-yellow-100'
            }`}
        >
            {title}
        </button>
    );

    return (
        <div>
            <div className="flex justify-center mb-8">
                <div className="flex p-2 space-x-2 bg-white rounded-full shadow-md">
                   <TabButton section="conceitos" title="Desvendando a PI"/>
                   <TabButton section="interfaces" title="PI em Todo Lugar!"/>
                </div>
            </div>

            {visibleSection === 'conceitos' && (
                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {conceitos.items.map(item => (
                        <div key={item.title} className="p-6 text-center bg-white rounded-lg shadow-lg">
                            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-yellow-500"/>
                            <h3 className="mb-2 text-xl font-bold text-gray-800">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {visibleSection === 'interfaces' && (
                 <div className="space-y-6">
                    {interfaces.items.map(item => (
                        <div key={item.title} className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-lg">
                            <BookOpen className="w-10 h-10 mt-1 text-yellow-500 flex-shrink-0"/>
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-gray-800">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EstudanteConceitos;

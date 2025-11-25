import React, { useState } from 'react';
import { generateInventionImage } from '../../../services/geminiService';
import { ImageIcon, Send, Loader, Sparkles } from 'lucide-react';

const EstudanteImageGen: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const url = await generateInventionImage(prompt);
            setImageUrl(url);
        } catch (e: any) {
            setError('Ocorreu um erro ao gerar a imagem. Tente novamente.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg">
            <header className="mb-8 text-center">
                <div className="inline-block p-4 mb-4 bg-purple-100 rounded-full text-purple-600">
                    <ImageIcon className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Gerador de Invenções</h1>
                <p className="mt-2 text-gray-500">Descreva sua invenção e deixe a IA dar vida a ela!</p>
            </header>

            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleGenerate()}
                        placeholder="Ex: um skate voador com luzes de neon"
                        className="flex-1 p-4 border rounded-full focus:ring-2 focus:ring-purple-500 outline-none"
                        disabled={isLoading}
                    />
                    <button onClick={handleGenerate} disabled={isLoading} className="p-4 text-white bg-purple-500 rounded-full hover:bg-purple-600 disabled:bg-gray-400">
                        <Sparkles />
                    </button>
                </div>

                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                    {isLoading && <Loader className="w-12 h-12 text-purple-500 animate-spin" />}
                    {error && <p className="text-red-500 p-4">{error}</p>}
                    {!isLoading && !error && imageUrl && (
                        <img src={imageUrl} alt="Invenção Gerada" className="w-full h-full object-contain rounded-lg" />
                    )}
                    {!isLoading && !error && !imageUrl && (
                        <p className="text-gray-400">Sua imagem aparecerá aqui...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EstudanteImageGen;

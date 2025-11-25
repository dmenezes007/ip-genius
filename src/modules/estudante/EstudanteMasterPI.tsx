import React, { useState, useEffect, useRef } from 'react';
import { askMasterPI } from '../../../services/geminiService';
import { MessageCircle, Send, Loader, Sparkles } from 'lucide-react';
import { EducationLevel } from '../../../types';
import MasterPi from '../../../imgs/Master PI.png';

interface EstudanteMasterPIProps {
    level: EducationLevel;
}

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const EstudanteMasterPI: React.FC<EstudanteMasterPIProps> = ({ level }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const aiResponse = await askMasterPI(currentInput, level);
            const aiMessage: Message = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (e: any) {
            setError('Ocorreu um erro ao falar com o Master PI. Tente novamente.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[80vh] bg-white rounded-2xl shadow-lg">
            <header className="p-6 border-b flex items-center gap-4">
                <img src={MasterPi} alt="Master PI" className="w-16 h-16 rounded-full shadow-md"/>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Converse com o Master PI</h1>
                    <p className="mt-1 text-gray-500">Tire suas dúvidas sobre o mundo da inovação!</p>
                </div>
            </header>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <img src={MasterPi} className="w-8 h-8 rounded-full flex-shrink-0"/>}
                        <div className={`max-w-xl p-4 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-yellow-400 text-gray-900 rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-3">
                        <img src={MasterPi} className="w-8 h-8 rounded-full flex-shrink-0"/>
                        <div className="max-w-lg p-4 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none shadow-sm">
                            <Loader className="w-5 h-5 animate-spin text-gray-500" />
                        </div>
                    </div>
                )}
                 {error && <p className="text-center text-red-500">{error}</p>}
                 <div ref={chatEndRef} />
            </div>

            <footer className="p-4 border-t bg-gray-50 rounded-b-2xl">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                        placeholder="Digite sua pergunta..."
                        className="flex-1 px-4 py-3 bg-white border rounded-full focus:ring-2 focus:ring-yellow-500 outline-none transition"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading} className="p-3 text-white bg-yellow-500 rounded-full hover:bg-yellow-600 disabled:bg-gray-400 transition-colors">
                        <Send />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default EstudanteMasterPI;

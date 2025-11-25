import React, { useState } from 'react';
import { askMasterPI } from '../../../services/geminiService';
import { Sparkles, Send, Loader } from 'lucide-react';
import { EducationLevel } from '../../../types'; // Assuming level is passed down

interface ProfessorAIAssistantProps {
    level: EducationLevel; // or get it from context
}

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const ProfessorAIAssistant: React.FC<ProfessorAIAssistantProps> = ({ level }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const aiResponse = await askMasterPI(input, level);
            const aiMessage: Message = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (e: any) {
            setError('Ocorreu um erro ao contatar o assistente de IA. Por favor, tente novamente.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[75vh] bg-white rounded-2xl shadow-lg">
            <header className="p-6 border-b">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Sparkles /></div>
                    <h1 className="text-2xl font-bold text-gray-800">Assistente de IA - Tira-dúvidas</h1>
                </div>
                <p className="mt-2 text-gray-500">Faça uma pergunta sobre Propriedade Intelectual e o Master PI irá te responder!</p>
            </header>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 p-1.5 bg-blue-500 text-white rounded-full flex-shrink-0"> <Sparkles/> </div>}
                        <div className={`max-w-lg p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2">
                        <div className="w-8 h-8 p-1.5 bg-blue-500 text-white rounded-full flex-shrink-0"> <Sparkles/> </div>
                        <div className="max-w-lg p-4 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
                            <Loader className="animate-spin" />
                        </div>
                    </div>
                )}
                 {error && <p className="text-red-500">{error}</p>}
            </div>

            <footer className="p-4 border-t">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                        placeholder="Digite sua pergunta..."
                        className="flex-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading} className="p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-400">
                        <Send />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ProfessorAIAssistant;

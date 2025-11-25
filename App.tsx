import React, { useState } from 'react';
import { EducationLevel, UserRole, LessonPlan } from './types';
// CORREÇÃO 1: Adicionada a importação de generateInventionImage
import { generateLessonPlan, askMasterPI, generateInventionImage } from './services/geminiService';
import IntroScreen from './components/IntroScreen';
import ApiKeyModal from './components/ApiKeyModal';
import LevelSelection from './components/LevelSelection';
import RoleSelection from './components/RoleSelection';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [level, setLevel] = useState<EducationLevel | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  
  // App State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<LessonPlan | null>(null);
  const [chatResponse, setChatResponse] = useState<string>('');
  const [chatInput, setChatInput] = useState('');
  
  // CORREÇÃO 2: Adicionados os estados para a geração de imagem que estavam faltando
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // AI Actions
  const handleGeneratePlan = async () => {
    if (!level) return;
    setIsLoading(true);
    setError(null);
    try {
      const topic = chatInput || "Propriedade Intelectual e Inovação";
      const plan = await generateLessonPlan(topic, level);
      setGeneratedPlan(plan);
    } catch (e: any) {
       handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !level) return;
    setIsLoading(true);
    setChatResponse('');
    setError(null);
    try {
      const resp = await askMasterPI(chatInput, level);
      setChatResponse(resp);
    } catch (e: any) {
        handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  // CORREÇÃO 3: Adicionada a função handleImageGen que estava faltando
  const handleImageGen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim()) return;
    
    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);
    
    try {
      const imageUrl = await generateInventionImage(imagePrompt);
      setGeneratedImage(imageUrl);
    } catch (e: any) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (err: any) => {
      console.error("An error occurred while calling the Gemini API:", JSON.stringify(err, null, 2));

      let errorMessage = "Ocorreu um erro ao consultar o Genius. Tente novamente.";
      
      const rawError = err.message || JSON.stringify(err);

      const errText = err.toString().toLowerCase();

      if (errText.includes('billing') || errText.includes('billable')) {
        errorMessage = "Erro de Faturamento: A sua chave de API está associada a um projeto que não tem uma conta de faturamento ativa. Por favor, acesse o Google Cloud Console e ative o faturamento para o projeto.";
      } else if (errText.includes('permission denied') || errText.includes('403')) {
        errorMessage = "Permissão Negada (403): Verifique se a sua chave de API tem as permissões necessárias e se a API Gemini está ativada no seu projeto Google Cloud.";
      } else if (errText.includes('api not enabled') || errText.includes('service has been disabled')) {
        errorMessage = "API Desativada: A API Gemini (ou Vertex AI) parece não estar ativada para seu projeto. Por favor, acesse o Google Cloud Console e ative-a.";
      } else if (errText.includes('api key not valid') || errText.includes('400')) {
        errorMessage = "Chave de API Inválida (400): A chave que você forneceu no arquivo .env.local parece ser inválida. Por favor, verifique se copiou a chave corretamente.";
      } else if (errText.includes("api key not found")) {
        errorMessage = "Chave de API não configurada. Por favor, configure VITE_GEMINI_API_KEY no seu arquivo .env.local";
      }
      
      setError(`${errorMessage}\n\nDetalhes do erro: ${rawError}`);
  }

  const resetFlow = () => {
    setLevel(null);
    setRole(null);
    setActiveTab('home');
    setGeneratedPlan(null);
    setChatResponse('');
    // Resetar também os estados da imagem ao reiniciar
    setGeneratedImage(null);
    setImagePrompt('');
    setError(null);
  };

  // Render Logic
  if (!apiKey || apiKey === "SUA_CHAVE_AQUI") {
    return <ApiKeyModal />;
  }

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  if (!level) {
    return <LevelSelection onSelectLevel={(selectedLevel) => setLevel(selectedLevel)} />;
  }

  if (!role) {
    return <RoleSelection onSelectRole={(selectedRole) => setRole(selectedRole)} onBack={() => setLevel(null)} />;
  }

  return (
    <Dashboard 
      level={level}
      role={role}
      activeTab={activeTab}
      isLoading={isLoading}
      generatedPlan={generatedPlan}
      chatResponse={chatResponse}
      chatInput={chatInput}
      // Agora estas variáveis existem!
      imagePrompt={imagePrompt}
      generatedImage={generatedImage}
      error={error}
      setChatInput={setChatInput}
      setImagePrompt={setImagePrompt}
      setActiveTab={setActiveTab}
      handleGeneratePlan={handleGeneratePlan}
      handleChat={handleChat}
      handleImageGen={handleImageGen}
      resetFlow={resetFlow}
    />
  );
};

export default App;
import React from 'react';
import { 
  GraduationCap, User, BookOpen, Lightbulb, ChevronRight, 
  ArrowLeft, Search, Sparkles, MessageCircle, AlertCircle,
  Key, CreditCard, ExternalLink, DollarSign, Brain,
  Target, Gamepad2
} from 'lucide-react';
import { EducationLevel, UserRole, LessonPlan } from '../types';
import { LEVELS, CHARACTERS, CATEGORIES, STATIC_CONTENT } from '../data/ipContent';

interface DashboardProps {
  level: EducationLevel;
  role: UserRole;
  activeTab: string;
  isLoading: boolean;
  generatedPlan: LessonPlan | null;
  chatResponse: string;
  chatInput: string;
  imagePrompt: string;
  generatedImage: string | null;
  error: string | null;
  
  setChatInput: (value: string) => void;
  setImagePrompt: (value: string) => void;
  setActiveTab: (tab: string) => void;
  handleGeneratePlan: () => void;
  handleChat: (e: React.FormEvent) => void;
  handleImageGen: (e: React.FormEvent) => void;
  resetFlow: () => void;
}

const NavBtn = ({ id, label, icon: Icon, active, set }: any) => (
    <button 
        onClick={() => set(id)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
            active === id 
            ? 'bg-slate-800 text-white shadow-lg' 
            : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
        }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

const Dashboard: React.FC<DashboardProps> = ({
  level, role, activeTab, isLoading, generatedPlan, chatResponse, chatInput,
  imagePrompt, generatedImage, error, setChatInput, setImagePrompt,
  setActiveTab, handleGeneratePlan, handleChat, handleImageGen, resetFlow
}) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={resetFlow}>
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white"><Lightbulb className="w-5 h-5" /></div>
              <span className="font-display font-bold text-xl text-slate-800">IP Genius</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="hidden md:inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">{LEVELS[level]}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${role === 'Teacher' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>
                {role === 'Teacher' ? 'Área do Professor' : 'Área do Aluno'}
              </span>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Module Nav */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-6 scrollbar-hide">
           {role === 'Teacher' ? (
             <>
               <NavBtn id="home" label="Início" icon={Brain} active={activeTab} set={setActiveTab} />
               <NavBtn id="planner" label="Gerador de Aulas (IA)" icon={Sparkles} active={activeTab} set={setActiveTab} />
               <NavBtn id="methodology" label="Metodologia" icon={BookOpen} active={activeTab} set={setActiveTab} />
               <NavBtn id="bncc" label="BNCC" icon={Target} active={activeTab} set={setActiveTab} />
             </>
           ) : (
             <>
               <NavBtn id="home" label="Missões" icon={Gamepad2} active={activeTab} set={setActiveTab} />
               <NavBtn id="chat" label="Pergunte ao Master PI" icon={MessageCircle} active={activeTab} set={setActiveTab} />
               <NavBtn id="studio" label="Laboratório de Invenções" icon={Sparkles} active={activeTab} set={setActiveTab} />
               <NavBtn id="curiosities" label="Curiosidades" icon={Lightbulb} active={activeTab} set={setActiveTab} />
             </>
           )}
        </div>

        {/* Dynamic Content Area */}
        <div className="animate-in fade-in duration-500">
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}

          {/* TEACHER: HOME */}
          {role === 'Teacher' && activeTab === 'home' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-full bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">Bem-vindo, Educador!</h2>
                        <p className="opacity-90 max-w-xl">O Programa IP Genius conecta Propriedade Intelectual à Base Nacional Comum Curricular. Utilize nossas ferramentas de IA para criar aulas inovadoras.</p>
                    </div>
                    <Brain className="absolute right-0 bottom-0 w-64 h-64 text-white opacity-10 translate-y-20 translate-x-20" />
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-indigo-500"/> Competências</h3>
                    <ul className="space-y-2">
                        {STATIC_CONTENT.Teacher.competencies.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></div>
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {CATEGORIES.map(cat => (
                        <div key={cat.id} className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-cyan-400 transition-colors group">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-cyan-50 group-hover:text-cyan-600 mb-3 transition-colors">
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-slate-800">{cat.label}</h4>
                            <p className="text-xs text-slate-500 mt-1">{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {/* TEACHER: PLANNER (AI) */}
          {role === 'Teacher' && activeTab === 'planner' && (
            <div className="max-w-3xl mx-auto">
               <div className="bg-white p-6 rounded-3xl shadow-lg border border-indigo-100 mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-amber-500" /> Gerador de Planos de Aula
                  </h2>
                  <p className="text-slate-500 mb-6">A IA do IP Genius cria planos alinhados à BNCC para o nível {LEVELS[level]}.</p>
                  
                  <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ex: Patentes e sustentabilidade, Direitos Autorais em músicas..."
                        className="flex-1 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button 
                        onClick={handleGeneratePlan}
                        disabled={isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
                      >
                        {isLoading ? 'Gerando...' : 'Gerar Aula'}
                      </button>
                  </div>
               </div>

               {generatedPlan && (
                 <div className="bg-white p-8 rounded-3xl shadow-xl animate-in slide-in-from-bottom-4 border-t-4 border-indigo-500">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">{generatedPlan.title}</h3>
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-bold text-slate-600">{generatedPlan.duration}</span>
                    </div>
                    
                    <div className="mb-6 bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">BNCC & Objetivos</h4>
                        <p className="text-sm text-slate-700 mb-2 font-medium">{generatedPlan.bncc}</p>
                        <ul className="list-disc pl-5 space-y-1">
                            {generatedPlan.objectives.map((o, i) => <li key={i} className="text-sm text-slate-600">{o}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">Atividades</h4>
                        <div className="space-y-4">
                            {generatedPlan.activities.map((act, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold shrink-0">{i + 1}</div>
                                    <p className="text-slate-700 mt-1">{act}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* TEACHER: METHODOLOGY & BNCC */}
          {role === 'Teacher' && (activeTab === 'methodology' || activeTab === 'bncc') && (
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
               {activeTab === 'methodology' ? (
                   <>
                     <h2 className="text-2xl font-bold text-slate-800 mb-4">{STATIC_CONTENT.Teacher.methodology.title}</h2>
                     <p className="text-slate-600 mb-8 leading-relaxed">{STATIC_CONTENT.Teacher.methodology.description}</p>
                     <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {STATIC_CONTENT.Teacher.methodology.steps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl">
                                <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold mb-2">{i+1}</div>
                                <span className="font-bold text-slate-700 text-sm">{step}</span>
                            </div>
                        ))}
                     </div>
                   </>
               ) : (
                   <>
                     <h2 className="text-2xl font-bold text-slate-800 mb-6">BNCC no Nível {LEVELS[level]}</h2>
                     <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                        <p className="text-lg text-indigo-900 font-medium leading-relaxed">
                            {STATIC_CONTENT.Teacher.bncc[level]}
                        </p>
                     </div>
                   </>
               )}
            </div>
          )}

          {/* STUDENT: HOME */}
          {role === 'Student' && activeTab === 'home' && (
              <div className="space-y-8">
                  <div className="bg-amber-500 rounded-3xl p-8 text-white flex items-center justify-between">
                      <div>
                          <h2 className="text-3xl font-bold mb-2">Olá, Inventor!</h2>
                          <p className="opacity-90">Pronto para criar o futuro hoje?</p>
                      </div>
                      <Gamepad2 className="w-24 h-24 opacity-20" />
                  </div>

                  <h3 className="font-bold text-slate-500 uppercase tracking-wider">Desafios da Semana</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {STATIC_CONTENT.Student.challenges.map((challenge, i) => (
                          <div key={i} className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-amber-400 transition-colors shadow-sm cursor-pointer" onClick={() => setActiveTab('studio')}>
                              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4 font-bold">{i+1}</div>
                              <p className="font-bold text-slate-700">{challenge}</p>
                              <div className="mt-4 text-xs font-bold text-amber-600 uppercase flex items-center gap-1">Começar <ChevronRight className="w-3 h-3"/></div>
                          </div>
                      ))}
                  </div>

                  <h3 className="font-bold text-slate-500 uppercase tracking-wider mt-8">Seu Time de Mentores</h3>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                      {CHARACTERS.map((char, i) => (
                          <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 text-center flex flex-col items-center gap-2">
                              <char.icon className={`w-8 h-8 ${char.color}`} />
                              <span className="text-xs font-bold text-slate-700">{char.name}</span>
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {/* STUDENT: CHAT (MASTER PI) */}
          {role === 'Student' && activeTab === 'chat' && (
             <div className="max-w-2xl mx-auto h-[600px] flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-4 bg-indigo-600 text-white flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full"><Brain className="w-6 h-6" /></div>
                    <div>
                        <h3 className="font-bold">Master PI</h3>
                        <p className="text-xs opacity-80">Mentor Virtual de Inteligência</p>
                    </div>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
                    {!chatResponse ? (
                        <div className="text-center text-slate-400 mt-10">
                            <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>Faça uma pergunta sobre Invenções ou Ciência!</p>
                        </div>
                    ) : (
                        <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 mt-1">PI</div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-slate-700 border border-slate-100 leading-relaxed">
                                {chatResponse}
                            </div>
                        </div>
                    )}
                    {isLoading && <div className="text-xs text-slate-400 text-center animate-pulse">Master PI está pensando...</div>}
                </div>

                <form onSubmit={handleChat} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                    <input 
                        className="flex-1 bg-slate-100 border-none rounded-xl px-4 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Digite sua pergunta..."
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                    />
                    <button type="submit" disabled={isLoading} className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"><ChevronRight/></button>
                </form>
             </div>
          )}

          {/* STUDENT: STUDIO (IMAGE GEN) */}
          {role === 'Student' && activeTab === 'studio' && (
             <div className="max-w-3xl mx-auto">
                 <div className="text-center mb-8">
                     <h2 className="text-2xl font-bold text-slate-800 mb-2">Laboratório de Invenções</h2>
                     <p className="text-slate-500">Descreva sua invenção ou marca e a IA vai desenhá-la!</p>
                 </div>

                 <form onSubmit={handleImageGen} className="flex gap-2 mb-8">
                     <input 
                        className="flex-1 border-2 border-slate-200 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="Ex: Um robô que planta árvores, Logotipo de suco de laranja..."
                        value={imagePrompt}
                        onChange={e => setImagePrompt(e.target.value)}
                     />
                     <button type="submit" disabled={isLoading} className="bg-amber-500 hover:bg-amber-600 text-white px-8 rounded-2xl font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-105">
                         {isLoading ? 'Criando...' : 'Criar'}
                     </button>
                 </form>

                 {generatedImage ? (
                     <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 animate-in zoom-in duration-500">
                         <img src={generatedImage} alt="Invention" className="w-full rounded-2xl" />
                         <div className="mt-4 text-center">
                            <a href={generatedImage} download="minha-invencao.png" className="text-amber-600 font-bold hover:underline">Baixar Invenção</a>
                         </div>
                     </div>
                 ) : (
                     <div className="border-2 border-dashed border-slate-200 rounded-3xl h-64 flex items-center justify-center text-slate-400">
                         <div className="text-center">
                             <Sparkles className="w-10 h-10 mx-auto mb-2 opacity-50" />
                             <p>Sua arte aparecerá aqui</p>
                         </div>
                     </div>
                 )}
             </div>
          )}
          
           {/* STUDENT: CURIOSITIES */}
           {role === 'Student' && activeTab === 'curiosities' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {STATIC_CONTENT.Student.curiosities.map((item, i) => (
                     <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:scale-105 transition-transform">
                         <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mb-4"><Lightbulb className="w-6 h-6" /></div>
                         <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                         <p className="text-slate-600">{item.content}</p>
                     </div>
                 ))}
                 <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white flex flex-col justify-center">
                    <h3 className="font-bold text-xl mb-2">Você sabia?</h3>
                    <p className="opacity-90">A propriedade intelectual protege suas ideias para que você ganhe crédito por elas!</p>
                 </div>
              </div>
           )}

        </div>
      </main>
    </div>
  );
}

export default Dashboard;

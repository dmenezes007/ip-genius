
import { EducationLevel, UserRole } from '../types';
import { Lightbulb, Users, Cpu, Globe, Briefcase, BookOpen, Gamepad2, PenTool, Brain, Target } from 'lucide-react';

export const LEVELS: Record<EducationLevel, string> = {
  'Infantil': 'Educação Infantil',
  'Fundamental_I': 'Ensino Fundamental - Anos Iniciais',
  'Fundamental_II': 'Ensino Fundamental - Anos Finais',
  'Medio': 'Ensino Médio'
};

export const CHARACTERS = [
  { name: 'Master PI', role: 'O Mentor', color: 'text-indigo-500', icon: Brain },
  { name: 'Sr. Criativo', role: 'Foco em Criatividade', color: 'text-amber-500', icon: PenTool },
  { name: 'Cid PI', role: 'Foco em Cidadania', color: 'text-emerald-500', icon: Users },
  { name: 'Capitã Tech', role: 'Foco em Tecnologia', color: 'text-cyan-500', icon: Cpu },
  { name: 'Super Terra', role: 'Foco em Planeta', color: 'text-green-600', icon: Globe },
  { name: 'Mestre do Mercado', role: 'Foco em Negócios', color: 'text-purple-500', icon: Briefcase },
];

export const CATEGORIES = [
  { id: 'criatividade', label: 'Criatividade', icon: Lightbulb, desc: 'Inovação e produção artística' },
  { id: 'cidadania', label: 'Cidadania', icon: Users, desc: 'Cultura de respeito' },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu, desc: 'Ciência e inovação' },
  { id: 'planeta', label: 'Planeta', icon: Globe, desc: 'Sustentabilidade' },
  { id: 'negocios', label: 'Negócios', icon: Briefcase, desc: 'Empreendedorismo' },
];

export const STATIC_CONTENT = {
  Teacher: {
    methodology: {
      title: "Metodologia ProAtiva",
      steps: ["Prospecção", "Sensibilização", "Formação", "Aplicação", "Avaliação"],
      description: "Utilizamos Metodologias Ativas como Design Thinking e Sala de Aula Invertida para conectar PI à realidade dos alunos."
    },
    competencies: [
      "Visão crítica e ética",
      "Colaboração em equipe",
      "Pensamento científico",
      "Respeito à criação intelectual"
    ],
    bncc: {
      'Infantil': "EI03EO03 - Ampliar as relações interpessoais, desenvolvendo atitudes de participação e cooperação.",
      'Fundamental_I': "EF15AR04 - Experimentar diferentes formas de expressão artística, fazendo uso sustentável de materiais.",
      'Fundamental_II': "EF69AR33 - Discutir a pirataria e o direito autoral como proteção à criação.",
      'Medio': "EMIFLGG01 - Investigar e analisar o funcionamento das produções intelectuais e culturais. EMIFMAT04 - Reconhecer a PI como motor de inovação."
    }
  },
  Student: {
    curiosities: [
      { title: "O Pai da Aviação", content: "Santos Dumont não patenteou o 14-Bis para que a humanidade pudesse usá-lo livremente!" },
      { title: "Escorredor de Arroz", content: "Foi inventado pela brasileira Therezinha Beatriz Alves de Andrade em 1959." },
      { title: "Bina", content: "O identificador de chamadas foi criado pelo mineiro Nélio Nicolai." }
    ],
    challenges: [
      "Crie sua própria marca para um suco natural.",
      "Desenhe uma invenção que ajude a limpar a escola.",
      "Identifique 3 marcas de produtos na sua mochila."
    ]
  }
};

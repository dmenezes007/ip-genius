import { ProfessorContent } from './contentTypes';

export const professorContent: ProfessorContent = {
  introducao: {
    title: "Introdução ao Programa PI nas Escolas",
    mission: "Conectar a Propriedade Intelectual (PI) com a ciência, tecnologia e inovação ao ambiente escolar, estimulando a criatividade e o respeito à criação.",
  },
  metodologia: {
    title: "Metodologia do Programa",
    ciclo: ["Prospecção", "Sensibilização", "Formação", "Aplicação", "Avaliação"],
    metodologiasAtivas: ["Design Thinking", "Sala de Aula Invertida", "Aprendizagem Baseada em Projetos"],
  },
  correlacaoBNCC: {
    title: "Correlação com a BNCC",
    description: "A PI se conecta diretamente com as competências gerais da Base Nacional Comum Curricular, promovendo o pensamento crítico e a criatividade. Para o Ensino Médio, habilidades específicas são mobilizadas:",
    codigos: [
      { code: "EMIFLGG01", description: "Investigar processos de produção e circulação da cultura e das mídias." },
      { code: "EMIFMAT04", description: "Reconhecer produtos e/ou processos criativos por meio de fruição, vivências e reflexão crítica." },
      { code: "EMIFCNT07", description: "Identificar e explicar questões socioculturais e ambientais relacionadas a fenômenos físicos, químicos e/ou biológicos." }
    ],
  },
  competencias: {
    title: "Competências Desenvolvidas",
    items: [
      "Visão crítica e analítica sobre o mundo",
      "Compreensão da ética na produção e uso do conhecimento",
      "Colaboração e trabalho em equipe",
      "Pensamento científico, crítico e criativo",
      "Respeito e valorização da criação intelectual"
    ],
  },
  categoriasTransversais: {
    title: "Categorias Transversais",
    items: [
      { title: "Criatividade", description: "Foco em inovação, produção artística e soluções originais." },
      { title: "Cidadania", description: "Desenvolvimento de uma cultura de respeito aos direitos e deveres." },
      { title: "Tecnologia", description: "Aplicação da ciência para a criação de novas tecnologias." },
      { title: "Planeta", description: "Conexão entre inovação, sustentabilidade e recursos naturais." },
      { title: "Negócios", description: "Estímulo ao empreendedorismo e à geração de valor a partir de ideias." },
    ],
  },
  curriculo: {
    title: "Sugestão de Currículo",
    sugestoes: [
      "Noções Básicas de Propriedade Intelectual",
      "Direitos Autorais na Produção Escolar",
      "Marcas e a Identidade de um Projeto",
      "Patentes, Inovação e o Método Científico",
      "Indicações Geográficas e a Valorização Regional"
    ],
  },
  planosDeAula: {
    title: "Exemplos de Planos de Aula",
    exemplos: [
      { title: "Educação Infantil: 'Quem fez esse desenho?'", description: "Atividade para introduzir o conceito de autoria e criação a partir de desenhos e histórias criadas pelas crianças." },
      { title: "Ensino Fundamental: 'Detetives da Marca'", description: "Jogo investigativo onde os alunos identificam marcas famosas e discutem o que as torna únicas." },
      { title: "Ensino Médio: 'Simulação de uma Startup'", description: "Projeto prático onde os alunos desenvolvem uma ideia de negócio, criando uma marca e um protótipo de produto/serviço, discutindo como proteger suas criações." }
    ],
  },
  eventos: {
    title: "Sugestões de Eventos Escolares",
    sugestoes: [
      "Feira de Ciências com foco em Inovação e Patentes",
      "Concurso de Redação e Desenho sobre os Riscos da Pirataria",
      "Hackathon de Soluções Sustentáveis para a Escola",
      "Oficina de Criação de Marcas para projetos da escola",
      "Semana da Propriedade Intelectual com palestras de inventores locais"
    ],
  },
};

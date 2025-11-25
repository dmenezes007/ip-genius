
export interface ProfessorContent {
  introducao: {
    title: string;
    mission: string;
  };
  metodologia: {
    title:string;
    ciclo: string[];
    metodologiasAtivas: string[];
  };
  correlacaoBNCC: {
    title:string;
    description: string;
    codigos: { code: string; description: string }[];
  };
  competencias: {
    title:string;
    items: string[];
  };
  categoriasTransversais: {
    title:string;
    items: { title: string; description: string }[];
  };
  curriculo: {
    title:string;
    sugestoes: string[];
  };
  planosDeAula: {
    title:string;
    exemplos: { title: string; description: string }[];
  };
  eventos: {
    title:string;
    sugestoes: string[];
  };
}

export interface EstudanteContent {
  interfaces: {
    title: string;
    items: { title: string; description: string }[];
  };
  jogos: {
    title: string;
    items: string[];
  };
  desafios: {
    title: string;
    items: string[];
  };
  curiosidades: {
    title: string;
    items: string[];
  };
  conceitos: {
    title: string;
    items: { title: string; description: string }[];
  };
  ods: {
    title: string;
    description: string;
  };
  gibis: {
    title: string;
    description: string;
    personagens: { name: string; role: string }[];
  };
  equidade: {
    title: string;
    text: string;
  };
}

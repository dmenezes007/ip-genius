import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerateContentRequest,
} from "@google/generative-ai";
import { EducationLevel, LessonPlan } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
  generationConfig,
  safetySettings,
});

const imageModel = genAI.getGenerativeModel({
    model: "gemini-pro-vision"
});


export const generateLessonPlan = async (topic: string, level: EducationLevel): Promise<LessonPlan> => {
    const prompt = `Crie um plano de aula sobre "${topic}" para o nível de ensino ${level}. O plano deve ser estruturado em formato JSON com os seguintes campos: title (string), duration (string, ex: "50 minutos"), bncc (string, código da BNCC relevante), objectives (array de strings), e activities (array de strings com a descrição de cada atividade).`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '');
    try {
        return JSON.parse(text) as LessonPlan;
    } catch (e) {
        console.error("Failed to parse lesson plan JSON:", text);
        throw new Error("A IA não retornou um plano de aula em formato válido.");
    }
};

export const askMasterPI = async (question: string, level: EducationLevel): Promise<string> => {
    const prompt = `Você é o Master PI, um mentor sábio e amigável sobre Propriedade Intelectual. Responda à seguinte pergunta de um ${level === 'Medio' ? 'estudante do Ensino Médio' : 'estudante'} de forma clara, engajante e educativa. Pergunta: "${question}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
};

export const generateInventionImage = async (prompt: string): Promise<string> => {
  const request: GenerateContentRequest = {
    contents: [{
      parts: [
        { text: `Gere uma imagem de uma invenção baseada na seguinte descrição: "${prompt}". A imagem deve ter um estilo de desenho animado, vibrante e criativo, adequada para um público jovem.` },
      ]
    }]
  };
  // This is a placeholder. The Gemini API for text-to-image generation on the client-side
  // is not as direct as this. A proper implementation would likely use a backend function
  // to call the image generation API (e.g., Imagen).
  // For this example, we will return a placeholder image URL.
  console.log("Image generation prompt:", prompt);
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
  // Returning a placeholder URL from a service like picsum.photos
  return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/512/512`;
};

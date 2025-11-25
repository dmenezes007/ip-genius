/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { EducationLevel, LessonPlan } from "../types";
import { getDocumentsContext } from "@/src/docsContext";

const getAi = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API key not found. Please set VITE_GEMINI_API_KEY in your .env.local file.");
  }
  return new GoogleGenerativeAI(apiKey);
};

// MUDANÇA: Usando o modelo 'gemini-pro' que é universalmente compatível
const TEXT_MODEL = 'gemini-pro';

export const generateLessonPlan = async (
  topic: string, 
  level: EducationLevel
): Promise<LessonPlan> => {
  
  const genAI = getAi();
  // No gemini-pro, não passamos systemInstruction aqui
  const model = genAI.getGenerativeModel({ model: TEXT_MODEL });

  // Inserimos a instrução no próprio prompt
  const fullPrompt = `
      You are 'Master PI', an expert consultant in Intellectual Property Education for Brazilian schools (Base Nacional Comum Curricular - BNCC).
      Your task is to create a comprehensive Lesson Plan for the specified education level and topic.
      Level: ${level}.
      
      You MUST structure the response in valid JSON format ONLY, without any markdown code blocks (e.g., \`\`\`json).
      The JSON object must strictly adhere to the following structure:
      {
        "title": "A Creative and Engaging Title for the Lesson",
        "duration": "Calculated duration, e.g., '50 minutes'",
        "bncc": "Specific and relevant BNCC codes for the level and topic",
        "objectives": ["Clear learning objective 1", "Clear learning objective 2", "and so on..."],
        "activities": ["Detailed step-by-step activity 1", "Detailed step-by-step activity 2", "etc..."]
      }
      The language for the content must be Portuguese (Brazil).

      TOPIC TO GENERATE: ${topic}
  `;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  const text = response.text() || "{}";
  try {
    // Limpeza de markdown caso o modelo insira
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText) as LessonPlan;
  } catch (e) {
    console.error("Failed to parse JSON from model response:", text, e);
    throw new Error("O modelo não retornou um plano de aula em formato JSON válido.");
  }
};

export const askMasterPI = async (
  question: string,
  level: EducationLevel
): Promise<string> => {
  const genAI = getAi();
  const context = await getDocumentsContext();
  
  const model = genAI.getGenerativeModel({ model: TEXT_MODEL });

  // Combinamos instrução + contexto + pergunta do usuário em um texto só
  const fullPrompt = `
      INSTRUCTIONS:
      You are 'Master PI', a wise and fun mentor character for the 'IP Genius' program.
      The user is a student in level: ${level}.
      Your role is to answer their questions about Intellectual Property, Science, or Innovation, using the provided context.
      Your tone must be encouraging, educational, and perfectly adapted to the user's age group.
      - If Level is 'Infantil', be very simple, use analogies, and include emojis to make it fun.
      - If Level is 'Fundamental', be clear and direct, using simple examples.
      - If Level is 'Medio', you can be more technical, referencing concepts like startups, innovation ecosystems, and patents.
      The language must be Portuguese (Brazil).

      CONTEXT FROM DOCUMENTS:
      ---
      ${context}
      ---

      USER QUESTION:
      ${question}
  `;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  return response.text() || "Estou refletindo sobre sua pergunta... um momento.";
};

export const generateInventionDescription = async (prompt: string): Promise<string> => {
  const genAI = getAi();
  const model = genAI.getGenerativeModel({ model: TEXT_MODEL });

  const fullPrompt = `
    You are a creative assistant in an "Invention Laboratory".
    A user has an idea for an invention. Your task is to take their basic idea and expand it into a fun, imaginative, and detailed description.
    The description should be exciting and easy for a young person to read.
    - Start with a catchy name for the invention.
    - Describe what the invention does.
    - Explain the key features and why they are cool.
    - Describe what it looks like in a visually engaging way.
    The language must be Portuguese (Brazil).

    User's idea: "${prompt}"
  `;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text() || "Não consegui pensar em uma descrição para essa invenção. Tente outra ideia!";
  } catch (error) {
    console.error("Error generating invention description:", error);
    throw new Error("Ocorreu um erro ao gerar a descrição da invenção.");
  }
};

export const generateInventionImage = async (prompt: string): Promise<string> => {
  // O modelo 'gemini-pro' é de texto e não gera imagens nativamente.
  console.log("Solicitação de imagem para:", prompt);
  const encodedPrompt = encodeURIComponent(prompt.slice(0, 20)); 
  return `https://placehold.co/600x400?text=Inveção:+${encodedPrompt}`;
};
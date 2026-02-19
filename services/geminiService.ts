import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateInstagramCaption = async (topic: string, role: string): Promise<string> => {
  if (!apiKey) {
    return "Modo Demo: Chave de API ausente. Por favor, configure suas variáveis de ambiente para ver a mágica da IA!";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Você é um gerente de mídia social para um ${role} (ex: Dentista, Médico, Terapeuta).
      Escreva uma legenda profissional e engajadora para o Instagram sobre: "${topic}".
      Inclua 3-5 hashtags relevantes.
      O idioma deve ser PORTUGUÊS (Brasil).
      Mantenha o tom profissional, mas acessível aos pacientes.
      Formate de forma limpa com emojis.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Falha ao gerar conteúdo.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao gerar a legenda. Por favor, tente novamente.";
  }
};
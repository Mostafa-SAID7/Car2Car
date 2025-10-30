
import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAi = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            console.error("API_KEY environment variable not set.");
            throw new Error("API key is missing.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};


export const startChat = () => {
    const aiInstance = getAi();
    chat = aiInstance.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are AutoBot, a friendly and knowledgeable car maintenance assistant for AutoCare Pro. Provide concise, helpful answers related to car issues, service appointments, and vehicle care. Keep responses brief and to the point.",
        },
    });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
    if (!chat) {
        startChat();
    }

    try {
        if(chat){
            const result = await chat.sendMessage({ message });
            return result.text;
        }
        return "Chat not initialized.";
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
};
   
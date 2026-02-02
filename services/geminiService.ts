
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getProductRecommendations = async (query: string, products: Product[]) => {
  const productListStr = products.map(p => `${p.name} (Category: ${p.category}, Price: $${p.price})`).join(', ');
  
  const prompt = `
    You are the "Tamata AI Assistant" for a digital product store named "Tamata" (طماطة). 
    A user is looking for something. Based on our current inventory, suggest the best product or explain why we don't have it.
    Inventory: [${productListStr}]
    User Query: "${query}"
    
    Response format: Keep it friendly and concise. If you suggest a product, use the exact name from the list. 
    Explain briefly why it fits their needs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of trouble connecting to my brain. Please try again or browse our categories!";
  }
};

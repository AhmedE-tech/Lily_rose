// src/services/aiService.js
import { personalityPrompt } from '../utils/constants';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export class AIService {
  static async getAIResponse(userMessage, conversationHistory = []) {
    const messages = [
      {
        role: "system",
        content: personalityPrompt
      },
      ...conversationHistory.slice(-6), // Last 3 exchanges
      {
        role: "user",
        content: userMessage
      }
    ];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Lily Rose AI"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct:free",
          messages: messages,
          temperature: 0.8,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      return "I'm having trouble thinking right now. Could you try again?";
    }
  }
}
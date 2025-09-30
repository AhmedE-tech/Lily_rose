// src/hooks/useConversation.js
import { useState, useEffect } from 'react';
import { MemoryService } from '../services/memoryService';
import { AIService } from '../services/aiService';

export const useConversation = (sessionId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [sessionId]);

  const loadHistory = async () => {
    const history = await MemoryService.getConversationHistory(sessionId);
    const formattedMessages = history.flatMap(conv => [
      { id: `user_${conv.timestamp}`, type: 'user', text: conv.user_message, timestamp: conv.timestamp },
      { id: `ai_${conv.timestamp}`, type: 'ai', text: conv.ai_response, timestamp: conv.timestamp }
    ]);
    setMessages(formattedMessages);
  };

  const sendMessage = async (text) => {
    const userMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      text: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await AIService.getAIResponse(text, messages);
      
      const aiMessage = {
        id: `ai_${Date.now()}`,
        type: 'ai',
        text: aiResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Save to memory
      await MemoryService.saveConversation(sessionId, text, aiResponse);
      
      return aiResponse;
    } catch (error) {
      console.error('Error in conversation:', error);
      const errorMessage = {
        id: `error_${Date.now()}`,
        type: 'ai',
        text: "I'm having trouble responding right now. Please try again.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
};

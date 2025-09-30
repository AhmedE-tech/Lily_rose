// src/utils/helpers.js
export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const simulateTypingDelay = (text) => {
  // Simulate human typing speed (50ms per word)
  const wordCount = text.split(' ').length;
  return Math.min(Math.max(wordCount * 50, 1000), 3000);
};

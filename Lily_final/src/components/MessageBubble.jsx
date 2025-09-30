// src/components/MessageBubble.jsx
import React from 'react';
import { User, Bot, CheckCheck } from 'lucide-react';
import { formatTime } from '../utils/helpers';

export const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className={`flex items-end space-x-2 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-2xl flex items-center justify-center shadow-lg ${
          isUser ? 'bg-gradient-to-r from-gray-400 to-gray-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}>
          {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
        </div>
        
        {/* Message Bubble */}
        <div className={`relative px-4 py-3 rounded-3xl shadow-sm transition-all duration-300 ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md border border-gray-200/50 dark:border-gray-600/50'
        }`}>
          <p className="text-sm whitespace-pre-wrap leading-relaxed font-medium">{message.text}</p>
          
          {/* Message Status */}
          <div className={`flex items-center space-x-1 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs opacity-70">
              {formatTime(message.timestamp)}
            </span>
            {isUser && message.status === 'delivered' && (
              <CheckCheck className="w-3 h-3 text-blue-200" />
            )}
          </div>
          
          {/* Tail */}
          <div className={`absolute bottom-0 w-3 h-3 ${
            isUser 
              ? 'right-0 transform translate-x-1/2 bg-blue-500 rounded-br-full'
              : 'left-0 transform -translate-x-1/2 bg-white dark:bg-gray-700 rounded-bl-full border-l border-b border-gray-200/50 dark:border-gray-600/50'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

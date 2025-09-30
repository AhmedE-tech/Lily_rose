// src/hooks/useVoiceRecorder.js
import { useState, useRef } from 'react';
import { SpeechService } from '../services/speechService';

export const useVoiceRecorder = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognizerRef = useRef(null);

  const startListening = async () => {
    try {
      setTranscript('Listening...');
      setIsListening(true);

      recognizerRef.current = await SpeechService.startRecognition(
        (text, type) => {
          if (type === 'final') {
            setTranscript(text);
          }
        },
        (error) => {
          console.error('Speech recognition error:', error);
          setTranscript('Error with speech recognition');
          setIsListening(false);
        }
      );
    } catch (error) {
      console.error('Failed to start listening:', error);
      setTranscript('Microphone access denied');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognizerRef.current) {
      SpeechService.stopRecognition(recognizerRef.current);
      recognizerRef.current = null;
    }
    setIsListening(false);
    return transcript;
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening
  };
};

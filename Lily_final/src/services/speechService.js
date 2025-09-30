// src/services/speechService.js
export class SpeechService {
  static async initialize() {
    // Azure Speech SDK loads in browser
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      import.meta.env.VITE_AZURE_SPEECH_KEY,
      "eastus"
    );
    speechConfig.speechRecognitionLanguage = "en-US";
    return speechConfig;
  }

  static async startRecognition(onResult, onError) {
    const speechConfig = await this.initialize();
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {
      onResult(e.result.text, 'interim');
    };

    recognizer.recognized = (s, e) => {
      if (e.result.text) {
        onResult(e.result.text, 'final');
      }
    };

    recognizer.startContinuousRecognitionAsync();
    return recognizer;
  }

  static stopRecognition(recognizer) {
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();
    }
  }
}
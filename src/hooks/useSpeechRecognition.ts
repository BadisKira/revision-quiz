import { useState, useEffect, useRef, useCallback } from "react";

export function useSpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [variation, setVariation] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window ).SpeechRecognition ||
      (window ).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error(
        "Votre navigateur ne supporte pas l'API SpeechRecognition."
      );
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "fr-FR";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setVariation((prev)=>{
        if(prev === 0 ) return 2;
        return Math.ceil((event.timeStamp - prev ) % 8)
      })
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece;
        }
      }
      setTranscript((prev) => prev + finalTranscript);
    };

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startRecognition = useCallback(() => {
    if (recognitionRef.current) {
      setTranscript("");
      recognitionRef.current.start();
    }
  }, []);

  const stopRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return { isRecording,variation, transcript, startRecognition, stopRecognition };
}

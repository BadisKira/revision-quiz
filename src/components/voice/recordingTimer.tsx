"use client";
import { useEffect, useState } from "react";

export interface RecordingTimerProps {
    duration: number;
    onTimerComplete: () => void;
  }
  
export const RecordingTimer: React.FC<RecordingTimerProps> = ({
    duration,
    onTimerComplete,
  }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
  
    useEffect(() => {
      if (timeLeft === 0) {
        onTimerComplete();
        return;
      }
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }, [timeLeft, onTimerComplete]);
  
    return (
      <div className="text-center p-4">
        <p>
          En écoute... Temps restant : {timeLeft} seconde{timeLeft > 1 ? "s" : ""}
        </p>
      </div>
    );
  };
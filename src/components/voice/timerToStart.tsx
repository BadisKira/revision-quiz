import { useEffect, useState } from "react";

export interface TimerToStartProps {
  onCountdownComplete: () => void;
  duration?: number
}

export const TimerToStart: React.FC<TimerToStartProps> = ({
  duration,
  onCountdownComplete,
}) => {
  const [count, setCount] = useState(duration ?? 5);

  useEffect(() => {
    if (count === 0) {
      onCountdownComplete();
      return;
    }
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count, onCountdownComplete]);

  return (
    <div className="text-center p-4">
      <p>L'enregistrement de la réponse commencera dans {count}...</p>
    </div>
  );
};
import QuizProvider from "@/lib/context/QuizProvider";
import { ReactNode } from "react";

export default function LayoutQuiz({ children }: { children: ReactNode }) {
  return <QuizProvider>{children}</QuizProvider>;
}

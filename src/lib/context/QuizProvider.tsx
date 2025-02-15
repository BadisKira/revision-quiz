'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { QuizProviderType } from './quizContext';
import { QuizModel } from '@/type/quiz';




const QuizContext = createContext<QuizProviderType | undefined>(undefined);

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuiz must be used within a QuizProvider');
  return context;
}

export default function QuizProvider({ quizData, children }: { quizData?:QuizModel , children: ReactNode }) {
  const [quiz,setQuiz]  = useState(quizData);
  return (
    <QuizContext.Provider value={{ quiz , setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

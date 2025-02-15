"use client";
import { QuizModel } from "@/type/quiz";
import { createContext } from "react";

export type QuizProviderType = {
    quiz?:QuizModel,
    setQuiz:(quiz:QuizModel) =>  void;
}
export const QuizContext = createContext<QuizProviderType | undefined>(undefined);

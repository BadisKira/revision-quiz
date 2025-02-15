import { Achievement } from "./achievement";
import { Question, QuestionModel } from "./question";

export interface Quiz {
  questions: Question[];
}

export interface QuizModel {
  id: string;
  theme:string;
  id_creator: string;
  type: string;
  tags: string;
  is_public: boolean;
  questions: QuestionModel[];
  context?:string,
  questionCount: number;
  difficulty: QuizDifficulty;
  achievements?:Achievement[]
}

export type QuizDifficulty =  "Intermédiare" | "Facile" | "Difficile"; 
export interface CreateQuizBody {
  theme: string;
  id_creator: string;
  type: string;
  tags: string;
  is_public: boolean;
  context?:string,
  questionCount: number;
  difficulty: QuizDifficulty
}
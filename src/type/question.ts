import { AnswerModel } from "./answer";

export interface Question {
    content: string;
    answers: AnswerModel[];
    explanation: string;

}
  
  
export interface QuestionModel {
    id: string;      
    quiz_id: string; 
    content: string; 
    answers: AnswerModel[];
    explanation: string;

}

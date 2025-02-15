"use client";
import {  QuizModel } from "@/type/quiz";
import QuestionComponent from "../question/questionComponent";



export default function QuizComponent({ quiz }: { quiz: QuizModel }) {
  const { questions } = quiz;
  return (
    <div className="">
      {questions.map((question, index) => {
        return <div key={index}>
            <QuestionComponent question={question}/>
        </div>;
      })}
    </div>
  );
}

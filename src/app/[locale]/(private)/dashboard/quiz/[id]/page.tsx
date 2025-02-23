"use client";

import QuizSolver from "@/components/quiz/quizSolver";
import { useQuiz } from "@/lib/context/QuizProvider";
import { use, useEffect } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { quiz,setQuiz } = useQuiz();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const apiUrl = process.env.NEXT_PUBLIC_URL! + "/api";
  useEffect(() => {
    if (quiz === undefined) {
      fetch(`${apiUrl}/quizzes/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setQuiz(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [apiUrl, id, quiz, setQuiz]);
  return <div>{quiz && <QuizSolver quiz={quiz} />}</div>;
}

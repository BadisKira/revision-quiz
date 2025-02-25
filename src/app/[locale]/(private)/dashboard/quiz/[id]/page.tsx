"use client";

import QuizSolver from "@/components/quiz/quizSolver";
import LoaderComponent from "@/components/shared/LoaderComponent";
import { useQuiz } from "@/lib/context/QuizProvider";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { quiz, setQuiz } = useQuiz();
  const [loading, setLoading] = useState(false);
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const apiUrl = process.env.NEXT_PUBLIC_URL! + "/api";

  useEffect(() => {
    async function fetchQuiz() {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/quizzes/${id}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (quiz === undefined) {
      fetchQuiz();
    }
  }, [apiUrl, id, quiz, setQuiz]);

  return (
    <div>
      {loading ? (
        <LoaderComponent text="Chargement du quiz..." />
      ) : (
        quiz && <QuizSolver quiz={quiz} />
      )}
    </div>
  );
}

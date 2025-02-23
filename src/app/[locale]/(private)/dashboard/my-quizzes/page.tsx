"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2 } from "lucide-react";
import { QuizModel } from "@/type/quiz";
import { deleteQuiz } from "@/app/actions/deleteQuiz";
import { FormEvent, useEffect, useState } from "react";
import { getQuizzes } from "@/app/actions/getQuizzes";

export default function QuizDashboard() {
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizModel[]>([]);
  useEffect(() => {
    getQuizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);

  const handleDeleteQuiz = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    const id = await deleteQuiz(formData);

    if (id) {
      setQuizzes((prev) => {
        return prev.filter((quiz) => quiz.id !== id);
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto space-y-4">
      <h1 className="text-3xl font-semibold">Mes Quiz</h1>

      {/**
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
        {quizzes && quizzes.length > 0 ? (
          quizzes.map((quiz: QuizModel) => (
            <Card key={quiz.id} className="flex flex-col max-h-80">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="">{quiz.theme}</CardTitle>
                <div className="space-x-2">
                  <Badge variant="outline">{quiz.type}</Badge>
                  <Badge variant="outline">
                    {quiz.is_public ? "publique" : "privé"}
                  </Badge>
                  <Badge variant="outline">{quiz.difficulty}</Badge>
                  <Badge variant="outline">{quiz.questionCount}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                <div className="p-2 bg-muted rounded-lg h-28 overflow-auto">
                  <strong className="text-sm">Contexte </strong>{" "}
                  <p className="text-sm text-muted-foreground">
                    {quiz.context}
                  </p>
                </div>
                {Array.isArray(quiz.achievements) &&
                  quiz.achievements.length > 0 && (
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`text-sm flex items-center justify-center 
                        font-semibold text-muted-foreground h-10 w-10 
                        ${
                          quiz.achievements[0].score >= 50
                            ? "text-green-500 border-green-700"
                            : "text-red-500 border-red-700"
                        }
                        border-4 border-spacing-2 
                         rounded-full `}
                        >
                          {quiz.achievements[0].score}%
                        </div>
                      </div>{" "}
                      <p>
                        <span className="text-xs">Fait le </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(
                            quiz.achievements[0].created_at.toString()
                          )}
                        </span>
                      </p>{" "}
                    </div>
                  )}
              </CardContent>
              <CardFooter className=" flex items-center justify-between">
                <Link href={`/dashboard/quiz/${quiz.id}`}>
                  <Button variant="outline">Voir le Quiz</Button>
                </Link>
                <form onSubmit={handleDeleteQuiz}>
                  <input type="hidden" name="id" value={quiz.id} />
                  {!loading ? (
                    <button type="submit">
                      <Trash2 />
                    </button>
                  ) : (
                    <Loader2 />
                  )}
                </form>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>Aucun Quiz</p>
        )}
      </div>
    </div>
  );
}

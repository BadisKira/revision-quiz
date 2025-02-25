

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
import { Loader2, Trash2, BookOpen, Lock, Unlock, Award } from "lucide-react";
import { QuizModel } from "@/type/quiz";
import { deleteQuiz } from "@/app/actions/quiz/deleteQuiz";
import { FormEvent, useEffect, useState } from "react";
import { getQuizzes } from "@/app/actions/quiz/getQuizzes";
import LoaderComponent from "@/components/shared/LoaderComponent";
import { PaginationComponent } from "@/components/shared/PaginationComponent";

const pageSize = 10;

export default function QuizDashboard() {
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizModel[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getQuizzes(page, pageSize).then((response) => {
      const { data, count } = response as { data: QuizModel[]; count: number };
      setCount(count);
      setQuizzes(data);
    });
  }, [page]);

  const handleDeleteQuiz = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    const id = await deleteQuiz(formData);

    if (id) {
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mes Quiz</h1>
      
      </div>

      <div className="space-y-6">
        {quizzes && quizzes.length > 0 ? (
          quizzes.map((quiz: QuizModel) => (
            <Card key={quiz.id} className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-xl">{quiz.theme}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {quiz.is_public ? (
                      <Unlock className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Badge variant="secondary" className="font-medium">
                      {quiz.type}
                    </Badge>
                    <Badge variant="outline" className="font-medium">
                      {quiz.difficulty}
                    </Badge>
                    <Badge variant="outline" className="font-medium">
                      {quiz.questionCount} questions
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                {quiz.context && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {quiz.context}
                    </p>
                  </div>
                )}

                {Array.isArray(quiz.achievements) && quiz.achievements.length > 0 && (
                  <div className="mt-4 flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <div
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          quiz.achievements[0].score >= 50
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {quiz.achievements[0].score}%
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Complété le {formatDate(quiz.achievements[0].created_at.toString())}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="bg-muted/5 pt-4">
                <div className="flex items-center justify-between w-full">
                  <Link href={`/dashboard/quiz/${quiz.id}`}>
                    <Button variant="default">
                      Voir le Quiz
                    </Button>
                  </Link>
                  <form onSubmit={handleDeleteQuiz} className="ml-auto">
                    <input type="hidden" name="id" value={quiz.id} />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      type="submit"
                      disabled={loading}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </Button>
                  </form>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <LoaderComponent text="Chargement de mes quiz ..." />
        )}
      </div>

      {quizzes && quizzes.length > 0 && (
        <div className="mt-8">
          <PaginationComponent
            pageSize={pageSize}
            totalElements={count}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}
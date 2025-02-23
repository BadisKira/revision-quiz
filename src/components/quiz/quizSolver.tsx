"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Brain, Tag, CheckCircle2, XCircle } from "lucide-react";
import { QuizModel } from "@/type/quiz";
import { CreateAchievementBody } from "@/type/achievement";
import { useUser } from "@/lib/context/ClientProvider";

export default function QuizSolver({ quiz }: { quiz: QuizModel }) {
  const { user } = useUser();
  const apiUrl = process.env.NEXT_PUBLIC_URL! + "/api";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleSingleAnswer = (value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const hasMultipleAnswers =
    currentQuestion.answers.filter((a) => a.is_correct).length > 1;

  const handleMultipleAnswers = (answerId: string) => {
    const currentAnswers = (userAnswers[currentQuestion.id] as string[]) || [];
    const newAnswers = currentAnswers.includes(answerId)
      ? currentAnswers.filter((id) => id !== answerId)
      : [...currentAnswers, answerId];

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: newAnswers,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctAnswers = 0;

    quiz.questions.forEach((question) => {
      const correctAnswerIds = question.answers
        .filter((answer) => answer.is_correct)
        .map((answer) => answer.id);

      const userAnswer = userAnswers[question.id];

      if (Array.isArray(userAnswer)) {
        // Pour les questions à choix multiples
        const isCorrect =
          correctAnswerIds.length === userAnswer.length &&
          correctAnswerIds.every((id) => userAnswer.includes(id!));
        if (isCorrect) correctAnswers++;
      } else {
        // Pour les questions à choix unique
        if (correctAnswerIds.includes(userAnswer as string)) {
          correctAnswers++;
        }
      }
    });

    setScore(() => (correctAnswers / quiz.questions.length) * 100);
    saveAchievement((correctAnswers / quiz.questions.length) * 100);
  };

  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnswered = userAnswers[currentQuestion.id] !== undefined;

  const isUserAnswer = (answerId: string) => {
    const userAnswer = userAnswers[currentQuestion.id];
    if (Array.isArray(userAnswer)) {
      return userAnswer.includes(answerId);
    }
    return userAnswer === answerId;
  };

  const saveAchievement = async (score:number) => {
    const eleement: CreateAchievementBody = {
      quiz_id: quiz.id,
      user_id: user.id,
      result: score >= 50 ? "Reussi" : "Perdu",
      score: score,
    };

    await fetch(`${apiUrl}/achievements`, {
      method: "post",
      body: JSON.stringify(eleement),
    });
  };

  return (
    <div className="container max-w-3xl mx-auto px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <CardTitle>
                {quiz.theme} - generated by {quiz.type}{" "}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1">
                {quiz.tags.split(",").map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full my-1 text-sm py-2 text-muted-foreground">
            {quiz.context}
          </div>
          <Progress value={progress} className="h-2" />
          <CardDescription className="mt-2">
            Question {currentQuestionIndex + 1} sur {quiz.questions.length}
            {isSubmitted && (
              <span className="ml-4 font-medium">
                Score final: {score.toFixed(0)}%
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                {currentQuestion.content}
              </h3>

              {hasMultipleAnswers ? (
                <div className="space-y-3">
                  {currentQuestion.answers.map((answer) => (
                    <div
                      key={answer.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={answer.id}
                        checked={(
                          (userAnswers[currentQuestion.id] as string[]) || []
                        ).includes(answer.id!)}
                        onCheckedChange={() =>
                          handleMultipleAnswers(answer.id!)
                        }
                        disabled={isSubmitted}
                      />
                      <label
                        htmlFor={answer.id}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2
                          ${
                            isSubmitted && answer.is_correct
                              ? "text-green-600"
                              : isSubmitted &&
                                isUserAnswer(answer.id!) &&
                                !answer.is_correct
                              ? "text-red-600"
                              : ""
                          }
                        `}
                      >
                        {answer.content}
                        {isSubmitted && answer.is_correct && (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                        {isSubmitted &&
                          isUserAnswer(answer.id!) &&
                          !answer.is_correct && (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup
                  onValueChange={handleSingleAnswer}
                  value={userAnswers[currentQuestion.id] as string}
                  disabled={isSubmitted}
                >
                  {currentQuestion.answers.map((answer) => (
                    <div
                      key={answer.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={answer.id!} id={answer.id} />
                      <label
                        htmlFor={answer.id}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2
                          ${
                            isSubmitted && answer.is_correct
                              ? "text-green-600"
                              : isSubmitted &&
                                isUserAnswer(answer.id!) &&
                                !answer.is_correct
                              ? "text-red-600"
                              : ""
                          }
                        `}
                      >
                        {answer.content}
                        {isSubmitted && answer.is_correct && (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                        {isSubmitted &&
                          isUserAnswer(answer.id!) &&
                          !answer.is_correct && (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {isSubmitted && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Explication :</h4>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse molestias, dolore ipsa eum ut ex expedita, quia,
                    exercitationem fugit porro perferendis consequuntur? Nostrum
                    esse quis voluptatibus laboriosam obcaecati fuga atque
                    ratione laudantium, debitis at dicta nihil velit nulla
                    maiores hic sed quisquam dolore veritatis vitae adipisci id
                    error minima autem.{" "}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Précédent
            </Button>
            {isLastQuestion && !isSubmitted ? (
              <Button
                onClick={handleSubmit}
                disabled={!hasAnswered}
                className="bg-green-600 hover:bg-green-700"
              >
                Soumettre
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!hasAnswered || (isLastQuestion && isSubmitted)}
              >
                Suivant
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

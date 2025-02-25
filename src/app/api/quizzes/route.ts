import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Question, QuestionModel } from "@/type/question";
import { createQuiz } from "@/lib/clientAI";
import { CreateQuizBody, QuizDifficulty, QuizModel } from "@/type/quiz";


export async function POST(request: Request) {
  const supabase = await createClient();
  const body = (await request.json()) as CreateQuizBody;

  const quizResult = await createQuiz({
    theme: body.theme,
    difficulty: body.difficulty as QuizDifficulty,
    context: body.context,
    numberQuestion: body.questionCount,
  });

  if ("error" in quizResult) {
    return NextResponse.json({ error: quizResult.error }, { status: 400 });
  }
  const generatedQuestions = quizResult.questions as Question[];

  const { data: quizData, error: quizError } = await supabase
    .from("quiz")
    .insert({
      id_creator: body.id_creator,
      type: body.type,
      tags: body.tags,
      is_public: body.is_public,
      theme: body.theme,
      context: body.context,
      difficulty: body.difficulty,
      questionCount: body.questionCount,
    })
    .select("id")
    .single();

  if (quizError || !quizData) {
    return NextResponse.json(
      { error: quizError?.message || "Erreur lors de la création du quiz." },
      { status: 400 }
    );
  }

  const questionsPayload = generatedQuestions.map((question) => ({
    quiz_id: quizData.id,
    content: question.content,
    explanation:question.explanation
  }));

  const { data: questionsData, error: questionsError } = await supabase
    .from("questions")
    .insert(questionsPayload)
    .select("*");

  if (questionsError || !questionsData) {
    return NextResponse.json(
      {
        error:
          questionsError?.message ||
          "Erreur lors de l'insertion des questions.",
      },
      { status: 400 }
    );
  }

  const questionsWithAnswers: QuestionModel[] = await Promise.all(
    questionsData.map(async (insertedQuestion, index) => {
      const questionAnswers = generatedQuestions[index].answers;
      const { data: answersData, error: answersError } = await supabase
        .from("answers")
        .insert(
          questionAnswers.map((answer) => ({
            question_id: insertedQuestion.id,
            content: answer.content,
            is_correct: answer.is_correct,
          }))
        )
        .select("*");

      if (answersError) {
        throw new Error(answersError.message);
      }
      return {
        ...insertedQuestion,
        answers: answersData,
      } as QuestionModel;
    })
  );

  const response: QuizModel = {
    id: quizData.id,
    theme: body.theme,
    id_creator: body.id_creator,
    type: body.type,
    tags: body.tags,
    is_public: body.is_public,
    questions: questionsWithAnswers,
    context: body.context,
    questionCount: body.questionCount,
    difficulty: body.difficulty,
  };

  return NextResponse.json(response);
}

"use server";

import { CorrectingAnswers, createQuestion } from "@/lib/clientAI";
import { IACorrection, VoicedAnswer, VoicedQuestion } from "@/type/voice";


export async function generateQuestionAction(): Promise<VoicedQuestion> {
    const data = await createQuestion({
        theme: "Spring boot",
        difficulty: 'Facile',
        context: "Je suis un dev junior en quete de mission"
    });

    if ("error" in data) {
        return { content: "" };
    }
    return data;
}


export async function correctAnswerAction({
    answer
}: {
    answer: VoicedAnswer
}): Promise<IACorrection | { error: string }> {
    const data = await CorrectingAnswers(
        { question: answer.question.content, userAnswer: answer.content }
    );
    console.log("DATA +++=> " , data);
    if ("error" in data) {
        return { error: "Une erreur est survenue lors de la correction -action " };
    }
    return data;
}

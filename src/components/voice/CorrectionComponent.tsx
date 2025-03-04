import { correctAnswerAction } from "@/app/actions/quiz/manageQuizVoice";
import { IACorrection } from "@/type/voice";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ReactMarkdown from 'react-markdown';

export default function CorrectionComponent({ answerContent, questionContent }: { answerContent: string, questionContent: string }) {
    const [loading, setLoading] = useState(true);
    const [iaCorrection, setIaCorrection] = useState<IACorrection>();
    useEffect(() => {
        async function generateCorrection() {
            setLoading(true);
            const data = await correctAnswerAction({
                answer: {
                    content: answerContent,
                    question: {
                        content: questionContent
                    }
                }
            });
            if ("error" in data) {
                console.log("ERROR");
                return;
            }
            setIaCorrection(data);
            setLoading(false);
        }
        if (answerContent !== "") {
            generateCorrection();
        }
    }, [answerContent,questionContent]);

    if (loading) {
        return <div>
            Correction en cours ... 
        </div>
    }
    return (
        <Card className="w-full shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Résultat de la correction</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <h2 className="text-md font-semibold">Résumé de la réponse</h2>
                    <p className=" text-sm text-gray-700">{iaCorrection?.resumeAnswer}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-md font-semibold">Verdict</h2>
                    <p className=" text-sm text-gray-700">{iaCorrection?.verdict}</p>
                </div>
                <div>
                    <h2 className="text-md font-semibold">Correction</h2>
                    <div className="text-sm text-gray-700">
                        <ReactMarkdown>{iaCorrection?.correction}</ReactMarkdown>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
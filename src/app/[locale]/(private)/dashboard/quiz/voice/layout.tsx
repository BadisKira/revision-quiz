import { generateQuestionAction } from "@/app/actions/quiz/sendAnswerVoice";

type VoiceLayoutProps = {
    children: React.ReactNode;
};

export default async function RootLayout({
    children,
}: Readonly<VoiceLayoutProps>) {

    // const data = await generateQuestionAction();
    return (
        <>
            {children}
        </>
    );
}

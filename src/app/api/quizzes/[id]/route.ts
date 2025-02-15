import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: id_quiz } = await params;

  if (!id_quiz) {
    return NextResponse.json(
      { error: "id_quiz manquant dans l'URL." },
      { status: 400 }
    );
  }
  const supabase = await createClient();
  const { data: quizData, error: quizError } = await supabase
    .from("quiz")
    .select(`*,questions(*,answers(*))`)
    .eq("id", id_quiz)
    .single();

  if (quizError || !quizData) {
    return NextResponse.json(
      { error: quizError?.message || "Quiz non trouvé." },
      { status: 400 }
    );
  }

  return NextResponse.json(quizData);
}

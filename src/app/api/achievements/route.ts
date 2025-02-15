import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { CreateAchievementBody } from "@/type/achievement";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = (await request.json()) as CreateAchievementBody;


  const { data: achievement, error } = await supabase
    .from("achievements")
    .upsert({
      quiz_id: body.quiz_id,
      user_id: body.user_id,
      result: body.result,
      score: body.score,
      created_at: ((new Date()).toISOString()).toLocaleString(),
    });

  if (error) {
    return NextResponse.json(
      {
        error:
          error?.message ||
          "Erreur est survenue lors de l'enregistrement de votre résultat.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(achievement);
}

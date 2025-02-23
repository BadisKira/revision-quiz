"use server";

import { createClient } from "@/lib/supabase/server";

export async function getQuizzes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quiz")
    .select(`*, achievements(result,score,created_at)`);

  if (error) {
    console.error("Erreur lors de la récupération des quiz :", error);
    return [];
  }
  return data;
}

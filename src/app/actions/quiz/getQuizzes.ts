"use server";

import { createClient } from "@/lib/supabase/server";

export async function getQuizzes(page = 1, pageSize = 10) {
  const supabase = await createClient();
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;

  const { data, error, count } = await supabase
    .from("quiz")
    .select(`*, achievements(result,score,created_at)`, { count: "exact" })
    .range(from, to);

  if (error) {
    console.error("Erreur lors de la récupération des quiz :", error);
    return [];
  }
  return { data, count };
}

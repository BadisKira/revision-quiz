"use server";

import { createClient } from "@/lib/supabase/server";

export async function deleteQuiz(formData: FormData): Promise<void> {
  const id = formData.get("id");

  const supabase = await createClient();
  const { error } = await supabase.from("quiz").delete().eq("id", id);


  if (error) {
    console.error("Erreur lors de la suppression du quiz :", error);
  }
}

"use server"
import { createClient } from "@/lib/supabase/server";
import { DashboardStats } from "@/type/stats";

export async function getData() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_user_quiz_stats");

  if (error) {
    console.error(error);
    return {
      error,
    };
  }

  return data as DashboardStats;
}

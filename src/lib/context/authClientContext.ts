"use client";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

type AuthClientProviderType = {
    supabase:SupabaseClient,
}
export const AuthClientContext = createContext<AuthClientProviderType | undefined>(undefined);

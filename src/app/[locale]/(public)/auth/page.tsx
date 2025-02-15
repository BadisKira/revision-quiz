"use client";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "@/i18n/routing";
export default function AuthPage() {
  const router = useRouter();
  const googleAuth = async () => {
    const supabaseClient = await createClient();
    const { data,  } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",

      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (data) {
      router.replace("/dashboard");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Button onClick={googleAuth}>
        <Chrome />
        Login with Google
      </Button>
    </div>
  );
}

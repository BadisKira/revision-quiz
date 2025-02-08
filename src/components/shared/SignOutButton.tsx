"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { useRouter } from "@/i18n/routing";

export default function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    try {
      const { error } = await createClient().auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
      window.location.href = '/';
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
    }
  };
  return (
    <div className="px-3 py-2">
      <Button onClick={signOut} className="w-full" variant="default">
        Sign Out
      </Button>
    </div>
  );
}

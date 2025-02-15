"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";


export default function SignOutButton({isIcon = false}:{isIcon?:boolean}) {

  const signOut = async () => {
    try {
      const { error } = await createClient().auth.signOut();
      if (error) {
        console.error("Une erreur s'est produite lors de la déconnexion:", error);
      }
      window.location.href = '/';
    } catch (err) {
      console.error("Une erreur s'est produite lors de la déconnexion:", err);
    }
  };
  return (
    <div className="px-3 py-2">
      
      <Button onClick={signOut} className="w-full" variant="default">
        {isIcon ? <LogOut /> : "Se déconnecter"}
      </Button>
    </div>
  );
}

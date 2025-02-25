"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton({
  classname
}: {
  classname?:string
}) {
  const signOut = async () => {
    try {
      const { error } = await createClient().auth.signOut();
      if (error) {
        console.error(
          "Une erreur s'est produite lors de la déconnexion:",
          error
        );
      }
      window.location.href = "/";
    } catch (err) {
      console.error("Une erreur s'est produite lors de la déconnexion:", err);
    }
  };
  return (
    <Button variant={"outline"} onClick={signOut} className={"flex gap-2 items-center "+classname }>
      <LogOut size={18}/>
      <span className="text-xs">Se déconnecter</span>
    </Button>
  );
}

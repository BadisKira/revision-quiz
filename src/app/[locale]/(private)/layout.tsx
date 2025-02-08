import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/i18n/routing";
import ClientProvider, { UserWithToken } from "@/lib/context/ClientProvider";

export const metadata: Metadata = {
  title: "Focus",
  description: "",
};

export default async function RootPrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect({
      href: "http://localhost:3000/auth",
      locale: "",
    });
  }
  
  else {
    const user:UserWithToken = {
      ...session.user,
      accessToken:session.access_token
    }
    return <ClientProvider user={user}>{children}</ClientProvider>;

  }

}

import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/i18n/routing";
import ClientProvider, { UserWithToken } from "@/lib/context/ClientProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/appSidebar";

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
    
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect({
      href: process.env.NEXT_PUBLIC_URL + "/auth",
      locale: "",
    });
  } else {
    const user: UserWithToken = {
      ...session.user,
      accessToken: session.access_token,
    };
    return (
      <ClientProvider user={user}>
        <SidebarProvider>
          <AppSidebar />
          <main className=" w-full p-6">
            {/* <div className="h-16 flex items-center ">
              <Input
                className="max-w-96 "
                placeholder="Rechercher des quiz..."
              />
            </div> */}
            {children}
          </main>
        </SidebarProvider>
      </ClientProvider>
    );
  }
}

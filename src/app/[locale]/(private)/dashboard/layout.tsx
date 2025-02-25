import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "@/i18n/routing";
import ClientProvider, { UserWithToken } from "@/lib/context/ClientProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "QuizIA",
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
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="block">
                      <BreadcrumbPage>
                        Ton application de quiz préféré
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className=" w-full p-6">
            
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ClientProvider>
    );
  }
}

"use client";
import {
  Brain,
  HammerIcon,
  Sparkles,
  FileText,
  Home,
  Voicemail,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/routing";
import FooterAppSidebar from "./footerAppSidebar";

const items = [
  {
    title: "Accueil",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Créer",
    href: "/dashboard/quiz/create",
    icon: HammerIcon,
  },
  {
    title: "Générer",
    href: "/dashboard/quiz/ia",
    icon: Sparkles,
  },
  {
    title: "Talk with it",
    href: "/dashboard/quiz/voice",
    icon: Voicemail ,
  },
  {
    title: "Mes Quiz",
    href: "/dashboard/my-quizzes",
    icon: FileText,
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className=" mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">TechQuizAI</span>
            </Link>
          </SidebarGroupLabel>
          {/* <SidebarTrigger
            className="ml-auto absolute top-2 z-20 right-2"
            onClick={() => {
              setOpenMobile(!openMobile);
            }}
          /> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.href}>
                    <SidebarMenuButton asChild>
                      <span>
                        <item.icon />
                        <span>{item.title}</span>
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <FooterAppSidebar />
      </SidebarFooter>
    </Sidebar>
  );
}

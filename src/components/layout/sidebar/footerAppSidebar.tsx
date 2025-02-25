import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { UserMenu } from "../userMenu";
import { useUser } from "@/lib/context/ClientProvider";

export default function FooterAppSidebar(){
    const {isMobile} = useSidebar();
    const {user} = useUser();
    return (
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu isMobile={isMobile} user={user}/>
          </SidebarMenuItem>
        </SidebarMenu>
    )
}
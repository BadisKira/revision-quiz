"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import SignOutButton from "@/components/shared/SignOutButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/lib/context/ClientProvider";
import { Link } from "@/i18n/routing";
import { Button } from "../../ui/button";

export default function AppSidebarFooter({
  openMobile,
}: {
  openMobile: boolean;
}) {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full py-2 px-3 flex items-center justify-between text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <div
            className={`flex items-center gap-2 ${
              !openMobile && "relative -left-3"
            }`}
          >
            <Avatar className="h-7 w-7">
              <AvatarFallback className="uppercase">
                {user?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {openMobile && (
              <span className="truncate text-xs font-semibold">
                {user?.email}
              </span>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem className="cursor-pointer">
          <Link href={"/dashboard/profile"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex justify-center items-center">
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

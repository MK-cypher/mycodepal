"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Code2, LogOut, User, UserCircle} from "lucide-react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {useUser} from "./context/UserContext";
import {signOut} from "@/app/(auth)/actions";

export default function UserBtn() {
  const {user} = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user?.avatar ? (
          <div className="shrink-0 w-10 h-10 rounded-full">
            <img src={user?.avatar} alt="User" className="w-full h-full rounded-full object-cover" />
          </div>
        ) : (
          <UserCircle />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuLabel className="mb-2">{user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Link href={"/profile"} className="w-full px-2 py-1.5 flex items-center gap-2">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Link href={"/my-snippets"} className="w-full px-2 py-1.5 flex items-center gap-2">
                <Code2 />
                My Snippets
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 p-0 cursor-pointer" onClick={signOut}>
              <div className="flex items-center gap-2 px-2 py-1.5 w-full">
                <LogOut />
                Log out
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link href={"signin"} className={`${buttonVariants()} w-full`}>
              Signin
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

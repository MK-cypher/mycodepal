"use client";
import {useEditor} from "@/components/context/EditorContext";
import {THEMES} from "@/lib/monacoConfig";
import React from "react";
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
import {signOut} from "@/app/(auth)/actions";
import {useUser} from "@/components/context/UserContext";

export default function MobileThemeSelector() {
  const {theme, updateTheme} = useEditor();
  const {user} = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user?.avatar ? (
          <div className="shrink-0 w-8 h-8 rounded-full">
            <img src={user?.avatar} alt="User" className="w-full h-full rounded-full object-cover" />
          </div>
        ) : (
          <UserCircle />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] max-h-[calc(100svh-5rem)] overflow-y-auto">
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
            <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
            <div className="space-y-1">
              {THEMES.map((item, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={() => {
                    updateTheme(item.id);
                  }}
                  className={`${
                    theme == item.id ? "bg-primary/30 outline outline-2 outline-primary outline-offset-0" : ""
                  }`}
                >
                  <div className="flex w-full py-1 items-center gap-2">
                    <div
                      className="w-3 h-3 flex justify-center items-center rounded-full border-primary"
                      style={{backgroundColor: item.color, boxShadow: `inset 0 0 ${item.color}`}}
                    ></div>
                    {item.label}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
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

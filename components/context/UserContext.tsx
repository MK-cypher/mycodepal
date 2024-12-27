"use client";

import {saveSnippet} from "@/app/actions/snippets";
import {useToast} from "@/hooks/use-toast";
import Cookies from "js-cookie";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";

const userContext = createContext<any>(undefined);

export const UserProvider = ({children, user}: {children: ReactNode; user: any}) => {
  const {toast} = useToast();
  const share = async () => {
    if (user && Cookies.get("share-title")) {
      const title = Cookies.get("share-title")!;
      const language = Cookies.get("share-language")!;
      const code = Cookies.get("share-code")!;
      console.log("share save");
      console.log(title);
      const {error} = JSON.parse(await saveSnippet(title, code, language));
      if (error) {
        toast({title: "Something went Wrong", variant: "destructive"});
      } else {
        Cookies.remove("share-title")!;
        Cookies.remove("share-language")!;
        Cookies.remove("share-code")!;
        toast({title: "Snippet Saved Successfully", variant: "success"});
      }
    }
  };
  useEffect(() => {
    share();
  }, []);
  return <userContext.Provider value={{user}}>{children}</userContext.Provider>;
};

export const useUser = (): any => {
  const context = useContext(userContext);
  if (!context) throw new Error("need user context provider");
  return context;
};

"use client";
import {saveSnippet} from "@/app/actions/snippets";
import {useEditor} from "@/components/context/EditorContext";
import {useUser} from "@/components/context/UserContext";
import {Button, buttonVariants} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useToast} from "@/hooks/use-toast";
import Cookies from "js-cookie";
import {Share} from "lucide-react";
import {useRouter} from "next/navigation";
import {FormEvent, useState} from "react";

export default function ShareBtn() {
  const {user} = useUser();
  const router = useRouter();
  const {savedCode, language} = useEditor();
  const {toast} = useToast();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [publicSnippet, setPublicSnippet] = useState(true);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (user) {
      const {error} = JSON.parse(await saveSnippet(title, savedCode, language, publicSnippet));
      if (error) {
        toast({title: "Something went Wrong", variant: "destructive"});
      } else toast({title: "Snippet Saved Successfully", variant: "success"});
    } else {
      Cookies.set("share-title", title, {expires: 1 / 24});
      Cookies.set("share-language", language, {expires: 1 / 24});
      Cookies.set("share-code", savedCode, {expires: 1 / 24});
      router.push("/signin");
    }

    setLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger className={`${buttonVariants()}`}>
        <Share />
        Share
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className="hidden"></DialogTitle>
        <div>
          {user?.isSub ? (
            <div className="flex items-center gap-5 mb-5 mt-1">
              <div
                onClick={() => {
                  setPublicSnippet(true);
                }}
                className={`${
                  publicSnippet ? "outline-primary bg-primary/30" : "outline-secondary"
                } p-3 cursor-pointer rounded-lg w-full h-20 flex justify-center items-center outline-offset-0 outline outline-2 transition-all duration-300`}
              >
                Public Snippet
              </div>
              <div
                onClick={() => {
                  setPublicSnippet(false);
                }}
                className={`${
                  publicSnippet ? "outline-secondary" : "outline-primary bg-primary/30"
                } p-3 cursor-pointer rounded-lg w-full h-20 flex justify-center items-center outline-offset-0 outline outline-2 transition-all duration-300`}
              >
                Private Snippet
              </div>
            </div>
          ) : (
            <></>
          )}
          <form onSubmit={submit}>
            <label htmlFor="snippet-title" className="mb-2 font-bold">
              Snippet Title
            </label>
            <input
              type="text"
              id="snippet-title"
              className="w-full"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className="mt-5">
              <Button onClick={submit} className={`${loading ? "loading" : ""} w-full`}>
                <span></span>
                {user ? "Share" : "Login and Share"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

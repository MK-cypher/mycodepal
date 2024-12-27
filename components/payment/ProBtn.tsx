"use client";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import SubModal from "../pricing/SubModal";
import {useUser} from "../context/UserContext";
import AIMenu from "../AIMenu";
import {Gem} from "lucide-react";

export default function ProBtn({editor}: {editor?: boolean}) {
  const {user} = useUser();
  return (
    <>
      {user?.isSub ? (
        <>{editor ? <AIMenu /> : <></>}</>
      ) : (
        <Dialog>
          <DialogTrigger
            className={`cursor-pointer flex items-center gap-1 text-nowrap max-sm:w-full transition-all duration-300 shadow-inner text-amber-400 hover:text-amber-300 border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/30 hover:to-orange-500/30 border text-center py-1.5 px-2.5 rounded-lg`}
          >
            <Gem size={16} />
            Pro
          </DialogTrigger>
          <SubModal />
        </Dialog>
      )}
    </>
  );
}

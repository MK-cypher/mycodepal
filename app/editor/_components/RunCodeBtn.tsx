"use client";
import {useEditor} from "@/components/context/EditorContext";
import {Button, buttonVariants} from "@/components/ui/button";
import {PlayIcon} from "lucide-react";
import {useEffect} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export default function RunCodeBtn() {
  const {savedCode, runCode, isRunning} = useEditor();
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      runCode();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [savedCode]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={`${buttonVariants()} ${isRunning ? "loading" : ""}`} onClick={runCode}>
          <span></span>
          <PlayIcon />
          Run
        </TooltipTrigger>
        <TooltipContent className="bg-success-alt">
          Run <span className="rounded-sm border px-1 py-0.5">CTRL</span> +{" "}
          <span className="rounded-sm border px-1 py-0.5">S</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

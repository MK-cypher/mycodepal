"use client";
import {useEditor} from "@/components/context/EditorContext";
import {Clipboard, ClipboardCheckIcon} from "lucide-react";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export default function CopyBtn() {
  const {output, error} = useEditor();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    if (error == null && output == null) return;
    await navigator.clipboard.writeText(error || output || "");
    setCopied(true);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger onClick={handleCopy}>{copied ? <ClipboardCheckIcon /> : <Clipboard />}</TooltipTrigger>
        <TooltipContent>{copied ? <p>Copied</p> : <p>Copy</p>}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

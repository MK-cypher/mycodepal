"use client";
import {SingleSnippetType} from "@/lib/type";
import {Editor} from "@monaco-editor/react";
import {Clipboard, Code, Copy, CopyCheck} from "lucide-react";
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {defineMonacoThemes} from "@/lib/monacoConfig";

export default function SnippetCode({snippet}: {snippet: SingleSnippetType}) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(snippet.code);
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
    <div className="rounded-lg my-3 bg-secondary/30 shadow-inner shadow-primary">
      <div className="flex p-5 opacity-70 justify-between items-center">
        <div className=" flex items-center gap-2">
          <Code />
          Source Code
        </div>
        <TooltipProvider>
          <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger onClick={copy}>{copied ? <CopyCheck /> : <Copy />}</TooltipTrigger>
            <TooltipContent>{copied ? <p>Copied</p> : <p>Copy</p>}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="rounded-b-lg overflow-hidden">
        <Editor
          className="rounded-lg"
          loading={"Loading Code..."}
          height={700}
          language={snippet.language}
          theme={"vs-dark"}
          beforeMount={defineMonacoThemes}
          value={snippet.code}
          options={{
            minimap: {enabled: false},
            padding: {top: 10, bottom: 10},
            cursorBlinking: "smooth",
            readOnly: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}

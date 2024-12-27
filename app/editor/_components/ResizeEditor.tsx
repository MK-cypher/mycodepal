"use client";
import {useEffect, useState} from "react";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";

export default function ResizeEditor() {
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
  const handleResize = () => {
    setDirection(window.innerWidth > 850 ? "horizontal" : "vertical");
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <ResizablePanelGroup direction={direction} className="w-full h-[calc(100svh-5rem)!important]">
        <ResizablePanel defaultSize={50} className="pr-1 max-[850px]:pr-0 max-[850px]:pb-1 rounded-lg max-[850px]:mb-1">
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} className="pl-1 max-[850px]:pl-0 max-[850px]:pt-1 rounded-lg">
          <OutputPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

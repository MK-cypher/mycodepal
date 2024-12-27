"use client";

import {useEditor} from "@/components/context/EditorContext";
import {AlertTriangle, CheckCircle, Clock, Terminal} from "lucide-react";
import CopyBtn from "./CopyBtn";
import RunSkeleton from "./RunSkeleton";
import ShareBtn from "./ShareBtn";

export default function OutputPanel() {
  const {isRunning, error, output} = useEditor();
  return (
    <div className="rounded-lg bg-secondary p-2 h-[calc(100svh-5rem)]">
      <div className="bg-background/30 h-[3.3rem] rounded-lg flex justify-between items-center gap-2 font-bold p-2">
        <div className="flex items-center gap-2">
          <Terminal />
          Output
        </div>
        <div className="flex items-center gap-2">
          <ShareBtn />
          <CopyBtn />
        </div>
      </div>
      <div className="mt-2 p-2 overflow-y-auto h-[calc(100svh-10rem)] bg-background/50 rounded-lg">
        {isRunning ? (
          <RunSkeleton />
        ) : error ? (
          <div className="flex items-start gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <div className="font-medium">Execution Error</div>
              <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Execution Successful</span>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-center">Run your code to see the output here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import {useEditor} from "@/components/context/EditorContext";
import {RotateCcw} from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ShareBtn from "./ShareBtn";
import UpdateFontSize from "./UpdateFontSize";

export default function CodeEditorActions() {
  const {resetCode} = useEditor();
  return (
    <div className="bg-background/30 p-2 rounded-lg flex justify-between items-center">
      <LanguageSelector />

      <div className="flex items-center gap-2">
        <UpdateFontSize />
        <button onClick={resetCode} className="bg-background/20 rounded-lg p-2">
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}

"use client";
import {RotateCcw, Share} from "lucide-react";
import {useRef} from "react";
import {useEditor} from "@/components/context/EditorContext";
import FonstSize from "@/components/icons/FonstSize";

export default function UpdateFontSize() {
  const {fontSize, updateFontSize} = useEditor();
  const fontInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex items-center gap-1">
      <FonstSize />
      <input
        type="number"
        ref={fontInputRef}
        defaultValue={fontSize}
        className="p-1 rounded-lg w-10"
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          const value = Number(e.target.value);
          if (value > 32) {
            updateFontSize(32);
            if (fontInputRef.current) {
              fontInputRef.current.value = "32";
            }
          } else if (value < 4) {
            updateFontSize(4);
            if (fontInputRef.current) {
              fontInputRef.current.value = "4";
            }
          } else {
            updateFontSize(value);
          }
        }}
      />
    </div>
  );
}

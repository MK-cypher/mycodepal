"use client";

import {useEditor} from "@/components/context/EditorContext";
import CodeEditorActions from "./CodeEditorActions";
import {Editor} from "@monaco-editor/react";
import {defineMonacoThemes, LANGUAGE_CONFIG} from "@/lib/monacoConfig";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {CheckCircle} from "lucide-react";

export default function CodeEditor() {
  const {theme, savedDbCode, language, fontSize, storeCode, updateEditor, updateSavedCode} = useEditor();
  const [height, setHeight] = useState(0);
  const [saving, setSaving] = useState("");
  const handleStoring = useDebouncedCallback(async (e: string | undefined) => {
    if (e && e != savedDbCode) {
      setSaving("Saving...");
      await storeCode(e, language);
      setSaving("Saved");
      const timeout = setTimeout(() => {
        setSaving("");
        clearTimeout(timeout);
      }, 1000);
    }
  }, 2000);

  const handleEditorChange = (e: string | undefined) => {
    if (e && e != savedDbCode) {
      handleStoring(e);
      updateSavedCode(e);
    }
  };
  const updateHeight = () => {
    setHeight(window.innerHeight - 160);
  };
  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
  return (
    <div className="rounded-lg bg-secondary p-2 h-[calc(100svh-5rem)] relative">
      {saving ? (
        <div className={`absolute z-[10] bottom-0 right-0 p-3 flex items-center gap-2 `}>
          {saving == "Saved" ? <CheckCircle className="text-success-main" /> : ""}
          {saving}
        </div>
      ) : (
        <></>
      )}
      <CodeEditorActions />
      <div className="mt-2 rounded-lg">
        <Editor
          loading={"Loading Code..."}
          height={height}
          language={LANGUAGE_CONFIG[language].monacoLanguage}
          onChange={handleEditorChange}
          theme={theme}
          beforeMount={defineMonacoThemes}
          onMount={(e) => updateEditor(e)}
          options={{
            minimap: {enabled: false},
            fontSize,
            padding: {top: 10, bottom: 10},
            cursorBlinking: "smooth",
            contextmenu: true,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}

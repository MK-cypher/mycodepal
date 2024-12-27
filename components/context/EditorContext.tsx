"use client";

import {getDbCode, updateDbCode} from "@/app/actions/code";
import {LANGUAGE_CONFIG} from "@/lib/monacoConfig";
import {LanguageType} from "@/lib/type";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

type EditorContextType = {
  language: LanguageType;
  fontSize: number;
  theme: string;
  savedCode: string;
  editor: any;
  output: string | null;
  error: string | null;
  isRunning: boolean;
  savedDbCode: string;
  storeCode: (code: string, language: string) => void;
  updateEditor: (editor: any) => void;
  updateLanguage: (language: LanguageType) => void;
  updateFontSize: (font: number) => void;
  updateTheme: (theme: string) => void;
  updateSavedCode: (code: string) => void;
  resetCode: () => void;
  runCode: () => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({children, user}: {children: ReactNode; user: any}) => {
  const [language, setLanguage] = useState<LanguageType>("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [mounted, setMounted] = useState(false);
  const [savedCode, setSavedCode] = useState("");
  const [editor, setEditor] = useState<any | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [savedDbCode, setSavedDbCode] = useState("");

  const initLanguage = () => {
    const languageStore = localStorage.getItem("selected-language");
    if (languageStore) {
      // @ts-ignore
      setLanguage(languageStore);
    } else {
      localStorage.setItem("selected-language", "javascript");
    }
  };
  const initTheme = () => {
    const themeStore = localStorage.getItem("selected-theme");
    if (themeStore) {
      setTheme(themeStore);
    } else {
      localStorage.setItem("selected-theme", "vs-dark");
    }
  };
  const initFont = () => {
    const fontStore = localStorage.getItem("font-size");
    if (fontStore) {
      setFontSize(Number(fontStore));
    } else {
      localStorage.setItem("font-size", "16");
    }
  };

  const initDbLanguage = async () => {
    const res = JSON.parse(await getDbCode(language));
    let dbCode = "";
    if (res) {
      dbCode = res[language];
      setSavedDbCode(dbCode);
    }
    const savedCodeStore = localStorage.getItem(`saved-code-${language}`);
    if (user && dbCode && editor) {
      setSavedCode(dbCode);
      editor.setValue(dbCode);
      return;
    }
    if (savedCodeStore && editor && !dbCode) {
      setSavedCode(savedCodeStore);
      if (user) {
        updateDbCode(language, savedCodeStore);
      }
      editor.setValue(savedCodeStore);
    } else {
      setSavedCode(LANGUAGE_CONFIG[language].defaultCode);
      localStorage.setItem(`saved-code-${language}`, LANGUAGE_CONFIG[language].defaultCode);
      if (editor) editor.setValue(LANGUAGE_CONFIG[language].defaultCode);
    }
  };

  useEffect(() => {
    initDbLanguage();
  }, [language, editor]);

  useEffect(() => {
    initLanguage();
    initFont();
    initTheme();
    setMounted(true);
  }, []);

  const updateTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("selected-theme", theme);
  };
  const updateFontSize = (font: number) => {
    setFontSize(font);
    localStorage.setItem("font-size", `${font}`);
  };
  const updateLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    localStorage.setItem("selected-language", lang);
  };

  const updateSavedCode = (code: string) => {
    setSavedCode(code);
  };

  const storeCode = async (code: string, language: string) => {
    if (user) {
      if (code != savedDbCode) {
        await updateDbCode(language, code);
      }
    } else {
      localStorage.setItem(`saved-code-${language}`, code);
    }
  };

  const resetCode = () => {
    if (user) updateDbCode(language, LANGUAGE_CONFIG[language].defaultCode);
    setSavedCode(LANGUAGE_CONFIG[language].defaultCode);
    localStorage.setItem(`saved-code-${language}`, LANGUAGE_CONFIG[language].defaultCode);
    if (editor) editor.setValue(LANGUAGE_CONFIG[language].defaultCode);
  };
  const updateEditor = (editor: any) => {
    setEditor(editor);
  };

  const runCode = async () => {
    if (!savedCode) {
      setError("Nothing");
    }

    setIsRunning(true);
    setError(null);
    setOutput(null);

    try {
      const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
      const res = await fetch(`https://emkc.org/api/v2/piston/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [{content: savedCode}],
        }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.message);
        setOutput(null);
        return;
      }

      if (data.compile && data.compile.code !== 0) {
        const err = data.compile.stderr || data.compile.output;
        setError(err);
        setOutput(null);
        return;
      }
      if (data.run && data.run.code !== 0) {
        const err = data.run.stderr || data.run.output;
        setError(err);
        setOutput(null);
        return;
      }
      const result = data.run.output;
      setOutput(result);
      setError(null);
    } catch (error) {
      setError("Could Not Execute the code successfully");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        language,
        fontSize,
        theme,
        savedCode,
        editor,
        output,
        error,
        isRunning,
        savedDbCode,
        storeCode,
        runCode,
        updateEditor,
        resetCode,
        updateSavedCode,
        updateFontSize,
        updateTheme,
        updateLanguage,
      }}
    >
      {mounted ? children : null}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context) throw new Error("need editor context provider");
  return context;
};

"use client";

import {useSnippet} from "@/components/context/SnippetContext";
import {LanguagesMap} from "@/lib/consts";
import {LanguageType} from "@/lib/type";

export default function FilterItem({item}: {item: LanguageType}) {
  const {updateFilter} = useSnippet();
  const Icon = LanguagesMap[item].Icon;
  const language = LanguagesMap[item].language;
  return (
    <button
      key={item}
      className="cursor-pointer px-2 py-1.5 text-primary bg-primary/10 hover:bg-primary/20 outline-2 outline-offset-0 outline-primary shadow-sm shadow-primary rounded-lg"
      onClick={() => {
        updateFilter(item);
      }}
    >
      <div className={`flex w-full py-1 items-center gap-2`}>
        <div className="w-8 h-8 flex justify-center items-center p-1 rounded-lg shadow-inner shadow-primary/50 bg-primary/30 border-primary">
          <Icon />
        </div>
        {language}
      </div>
    </button>
  );
}

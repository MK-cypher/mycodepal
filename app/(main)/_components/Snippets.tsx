"use client";

import {useSnippet} from "@/components/context/SnippetContext";
import SnippetBox from "./SnippetBox";

export default function Snippets() {
  const {snippets} = useSnippet();

  return (
    <div className="mt-10 grid grid-cols-3 gap-3 container max-lg:grid-cols-2 max-sm:grid-cols-1 pb-20">
      {snippets.map((item) => (
        <SnippetBox key={item.id} item={item} />
      ))}
    </div>
  );
}

"use client";

import {useSnippet} from "@/components/context/SnippetContext";
import {SearchIcon} from "lucide-react";
import {useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import Filter from "./Filter";
import FilterItem from "./FilterItem";

export default function Search() {
  const {filters, updateSearch} = useSnippet();
  const [search, setSearch] = useState("");
  const handleInput = useDebouncedCallback(async (e) => {
    updateSearch(e);
  }, 1000);
  return (
    <section className="container flex justify-center">
      <div className="w-2/3 max-lg:w-full">
        <div className="relative">
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            <SearchIcon />
          </div>
          <div className=" cursor-pointer absolute top-1/2 right-3 -translate-y-1/2">
            <Filter />
          </div>
          <input
            type="text"
            value={search}
            readOnly={false}
            onChange={(e) => {
              handleInput(e.target.value);
              setSearch(e.target.value);
            }}
            className="w-full rounded-[0.75rem!important] py-[.8rem!important] px-[3rem!important]"
            placeholder="Search code snippets..."
          />
        </div>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          {filters.map((item, i) => (
            <FilterItem item={item} key={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import {deleteSnippet, getSnippets} from "@/app/actions/snippets";
import {addStar, getStars, removeStar} from "@/app/actions/stars";
import {useToast} from "@/hooks/use-toast";
import {LanguageType, SnippetType} from "@/lib/type";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface SnippetContextType {
  snippets: SnippetType[];
  filters: Array<LanguageType>;
  search: string;
  stars: string[];
  fetchSnippets: () => void;
  updateFilter: (filter: LanguageType) => void;
  updateSearch: (val: string) => void;
  removeSnippet: (id: string) => void;
  updateStar: (id: string) => Promise<boolean>;
}

const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

export const SnippetProvider = ({children}: {children: ReactNode}) => {
  const {toast} = useToast();
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [filters, setFilters] = useState<Array<LanguageType>>([]);
  const [search, setSearch] = useState("");
  const [stars, setStars] = useState<string[]>([]);

  const initFilter = () => {
    const filterStore = localStorage.getItem("filters");
    if (filterStore) {
      setFilters(JSON.parse(filterStore));
    }
  };
  const initStars = async () => {
    const data = JSON.parse(await getStars());
    setStars(data);
  };

  const fetchSnippets = async () => {
    const data = JSON.parse(await getSnippets({language: filters, query: search}));
    setSnippets(data);
  };

  const updateSearch = (val: string) => {
    setSearch(val);
  };

  const updateFilter = (filter: LanguageType) => {
    let filterArr = [...filters];
    if (filters.includes(filter)) {
      setFilters((prev) => prev.filter((item) => item != filter));
      filterArr = filterArr.filter((item) => item != filter);
    } else {
      setFilters((prev) => [...prev, filter]);
      filterArr.push(filter);
    }
    localStorage.setItem("filters", JSON.stringify(filterArr));
  };

  const removeSnippet = async (id: string) => {
    setSnippets((prev) => prev.filter((item) => item.id != id));
    let deleted = snippets.filter((item) => item.id == id);
    const {error} = JSON.parse(await deleteSnippet(id));
    if (error) {
      toast({title: "Something went wrong", variant: "destructive"});
      setSnippets((prev) => [...prev, ...deleted]);
    }
  };

  const updateStar = async (id: string) => {
    if (stars.includes(id)) {
      setStars((prev) => [...prev.filter((item) => item != id)]);
      const {error} = JSON.parse(await removeStar(id));
      if (error) {
        setStars((prev) => [...prev, id]);
        return false;
      }
    } else {
      setStars((prev) => [...prev, id]);
      const {error} = JSON.parse(await addStar(id));
      if (error) {
        setStars((prev) => [...prev.filter((item) => item != id)]);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    fetchSnippets();
  }, [search, filters]);

  useEffect(() => {
    initFilter();
    initStars();
  }, []);

  return (
    <SnippetContext.Provider
      value={{snippets, stars, search, updateStar, filters, updateSearch, removeSnippet, updateFilter, fetchSnippets}}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippet = (): SnippetContextType => {
  const ctx = useContext(SnippetContext);
  if (!ctx) throw new Error("need Snippet context provider");
  return ctx;
};

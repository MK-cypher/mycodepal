"use client";

import {ListFilter} from "lucide-react";
import * as React from "react";

import {useSnippet} from "@/components/context/SnippetContext";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {languages} from "@/lib/consts";
import {LanguageType} from "@/lib/type";

export default function Filter() {
  const {filters, updateFilter} = useSnippet();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ListFilter />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Search Language..." />
          <CommandList>
            <CommandEmpty>No Language found.</CommandEmpty>
            <CommandGroup className="space-y-2">
              <div className="space-y-2">
                {languages.map((language) => (
                  <CommandItem
                    key={language.id}
                    value={language.id}
                    onSelect={(currentValue) => {
                      updateFilter(currentValue as LanguageType);
                    }}
                    className={`${
                      filters.includes(language.id as LanguageType)
                        ? "text-primary bg-primary/10 hover:bg-primary/20 outline-2 outline-offset-0 outline-primary shadow-sm shadow-primary rounded-lg"
                        : "hover:bg-secondary/20"
                    } cursor-pointer`}
                  >
                    <div className={`flex w-full py-1 items-center gap-2`}>
                      <div className="w-8 h-8 flex justify-center items-center p-1 rounded-lg shadow-inner shadow-primary/50 bg-primary/30 border-primary">
                        <language.Icon />
                      </div>
                      {language.language}
                    </div>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

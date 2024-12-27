"use client";
import {useEditor} from "@/components/context/EditorContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {THEMES} from "@/lib/monacoConfig";
import React from "react";

export default function ThemeSelector() {
  const {theme, updateTheme} = useEditor();
  return (
    <Select
      defaultValue={theme}
      onValueChange={(e) => {
        updateTheme(e);
      }}
    >
      <SelectTrigger className="w-[150px] bg-background">
        <SelectValue className="" />
      </SelectTrigger>
      <SelectContent className="bg-secondary">
        <SelectGroup>
          <SelectLabel>Select Theme</SelectLabel>
          <div className="space-y-1">
            {THEMES.map((item, i) => (
              <SelectItem
                key={i}
                className="hover:hover:bg-background/40 cursor-pointer data-[state=checked]:text-primary font-bold data-[state=checked]:shadow-sm shadow-primary data-[state=checked]:bg-primary/10 data-[state=checked]:border-2 data-[state=checked]:border-primary rounded-lg"
                value={item.id}
              >
                <div className="flex w-full justify-between py-1 items-center gap-2">
                  <div
                    className="w-3 h-3 flex justify-center items-center rounded-full border-primary"
                    style={{backgroundColor: item.color, boxShadow: `inset 0 0 ${item.color}`}}
                  ></div>
                  {item.label}
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

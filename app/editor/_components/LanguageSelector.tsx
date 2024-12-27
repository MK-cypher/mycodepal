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
import {languages} from "@/lib/consts";
import {Lock} from "lucide-react";

export default function LanguageSelector() {
  const {language, updateLanguage} = useEditor();
  return (
    <Select
      defaultValue={language}
      onValueChange={(e) => {
        // @ts-ignore
        updateLanguage(e);
      }}
    >
      <SelectTrigger className="w-[200px] bg-background">
        <SelectValue className="" />
      </SelectTrigger>
      <SelectContent className="bg-secondary">
        <SelectGroup>
          <SelectLabel>Select Language</SelectLabel>
          <div className="space-y-1">
            {languages.map((item, i) => (
              <SelectItem
                key={i}
                className="hover:hover:bg-background/40 cursor-pointer data-[state=checked]:text-primary font-bold data-[state=checked]:shadow-sm shadow-primary data-[state=checked]:bg-primary/10 data-[state=checked]:border-2 data-[state=checked]:border-primary rounded-lg"
                disabled={!item.free}
                value={item.id}
              >
                <div className="flex w-full justify-between py-1 items-center gap-2">
                  <div className="w-8 h-8 flex justify-center items-center p-1 rounded-lg shadow-inner shadow-primary/50 bg-primary/30 border-primary">
                    <item.Icon />
                  </div>
                  {item.language}
                  {!item.free ? <Lock /> : <></>}
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

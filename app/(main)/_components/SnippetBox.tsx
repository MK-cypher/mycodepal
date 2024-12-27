"use client";
import {useSnippet} from "@/components/context/SnippetContext";
import {useUser} from "@/components/context/UserContext";
import {LanguagesMap} from "@/lib/consts";
import {SnippetType} from "@/lib/type";
import {mmddyyyy} from "@/lib/utils";
import {Clock, Star, Trash, User} from "lucide-react";
import Link from "next/link";
import React, {useState} from "react";

export default function SnippetBox({item}: {item: SnippetType}) {
  const {removeSnippet, stars, updateStar} = useSnippet();
  const [starRes, setStarRes] = useState(item.stars);
  const {user} = useUser();
  const Icon = LanguagesMap[item.language].Icon;
  const language = LanguagesMap[item.language].language;
  const date = mmddyyyy(item.created_at);
  const handleStar = async () => {
    if (!user) return;
    if (stars.includes(item.id)) {
      setStarRes((prev) => prev - 1);
    } else {
      setStarRes((prev) => prev + 1);
    }
    const res = await updateStar(item.id);
    if (!res) setStarRes((prev) => prev);
  };
  return (
    <div className="rounded-lg bg-secondary/60 shadow-inner shadow-secondary p-3">
      <div className="flex justify-between mb-3">
        <div className="flex items-start gap-2 text-sm">
          <div className="bg-gradient-to-r rounded-lg from-primary/30 to-blue-900/30 p-2">
            <Icon />
          </div>
          <div>
            <div className="bg-primary/20 px-1 py-0.5 rounded-sm text-primary w-fit">{language}</div>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <Clock size={16} />
              <div>{date}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <button
            onClick={handleStar}
            className={`bg-background/20 p-1 rounded-lg flex gap-1 justify-center items-center hover:bg-yellow-500/80 ${
              stars.includes(item.id) ? "bg-yellow-500" : ""
            }`}
          >
            <Star size={16} /> <div>{starRes}</div>
          </button>
          {user && user?.id == item.created_by?.id ? (
            <button
              onClick={() => {
                removeSnippet(item.id);
              }}
              className="bg-background/20 px-2 py-2 rounded-lg flex justify-center items-center hover:bg-red-500"
            >
              <Trash size={16} />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Link
        href={`/snippet/${item.id}`}
        className="font-semibold text-xl text-nowrap overflow-hidden text-ellipsis link-underline opacity-[100!important]"
      >
        {item.title}
      </Link>
      <div className="mt-2 text-muted-foreground flex items-center gap-2">
        <div className="bg-background/20 rounded-full">
          {item.created_by.avatar ? (
            <div className="w-7 h-7 rounded-full shrink-0">
              <img
                src={item.created_by.avatar}
                alt="user"
                className="w-full h-full rounded-full object-coverrounded-full"
              />
            </div>
          ) : (
            <div className="p-1">
              <User size={18} />
            </div>
          )}
        </div>
        <div>{item.username}</div>
      </div>
      <div className="mt-3 rounded-lg h-20 bg-background overflow-hidden">
        <pre>{item.code}</pre>
      </div>
    </div>
  );
}

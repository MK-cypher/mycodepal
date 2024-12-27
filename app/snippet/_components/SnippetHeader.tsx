import {LanguagesMap} from "@/lib/consts";
import {SingleSnippetType} from "@/lib/type";
import {mmddyyyy} from "@/lib/utils";
import {Clock, MessageSquare, User} from "lucide-react";
import React from "react";

export default function SnippetHeader({snippet}: {snippet: SingleSnippetType}) {
  const Icon = LanguagesMap[snippet.language].Icon;
  const date = mmddyyyy(snippet.created_at);
  return (
    <div className="p-8 rounded-lg my-3 bg-secondary/30 shadow-inner shadow-primary">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r rounded-lg from-primary/30 to-blue-900/30 p-2">
            <Icon />
          </div>
          <div>
            <div className="font-semibold overflow-hidden text-ellipsis text-nowrap text-2xl">{snippet.title}</div>
            <div className="flex items-center flex-wrap gap-3 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                {snippet.created_by.avatar ? (
                  <div className="w-7 h-7 rounded-full shrink-0">
                    <img
                      src={snippet.created_by.avatar}
                      alt="user"
                      className="w-full h-full rounded-full object-coverrounded-full"
                    />
                  </div>
                ) : (
                  <div className="p-1">
                    <User size={18} />
                  </div>
                )}
                {snippet.created_by.username}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <div>{date}</div>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare size={16} />
                {`${snippet.comments.length} comments`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

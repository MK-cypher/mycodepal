import {LucideProps} from "lucide-react";
import {ForwardRefExoticComponent, ReactNode, RefAttributes} from "react";

export type PriceType = {
  type: string;
  price: {monthly: {amount: number; id: string}; annual: {amount: number; id: string}};
  description: string;
  features: string[];
};

export type AiMessageType = {
  role: "assistant" | "user";
  content: string;
};

export interface Theme {
  id: string;
  label: string;
  color: string;
}

export type SnippetType = {
  id: string;
  title: string;
  language: LanguageType;
  code: string;
  stars: number;
  created_at: string;
  username: string;
  created_by: {
    id: string;
    avatar: string;
  };
};

export type CommentType = {
  id: string;
  snippet_id: string;
  created_at: string;
  edited: string;
  created_by: {
    id: string;
    username: string;
    avatar: string;
  };
  text: string;
  likes: number;
  dislikes: number;
};

export type SingleSnippetType = {
  id: string;
  title: string;
  language: LanguageType;
  code: string;
  stars: number;
  created_at: string;
  created_by: {
    id: string;
    username: string;
    avatar: string;
  };
  comments: CommentType[];
};

export type LanguageType =
  | "javascript"
  | "c"
  | "php"
  | "typescript"
  | "go"
  | "csharp"
  | "cpp"
  | "python"
  | "java"
  | "ruby"
  | "rust"
  | "javascript";

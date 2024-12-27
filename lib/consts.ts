import C from "@/components/icons/C";
import Cpp from "@/components/icons/Cpp";
import Csharp from "@/components/icons/Csharp";
import Go from "@/components/icons/Go";
import Java from "@/components/icons/Java";
import Javascript from "@/components/icons/Javascript";
import PHP from "@/components/icons/PHP";
import Python from "@/components/icons/Python";
import Ruby from "@/components/icons/Ruby";
import Rust from "@/components/icons/Rust";
import Typescript from "@/components/icons/Typescript";
import {Code} from "lucide-react";

export const navLinks = [
  {
    link: "Editor",
    href: "/editor",
  },
];

export const prices = [
  {
    type: "FREE",
    price: {
      monthly: {
        amount: 0,
        id: "",
      },
      annual: {
        amount: 0,
        id: "",
      },
    },
    description: "Join Now for FREE",
    features: ["All Languages Available", "Share Public Snippets"],
  },
  {
    type: "PRO",
    price: {
      monthly: {
        amount: 10,
        id: "price_1QaDgOApDwfhmkAaU0nBTQky",
      },
      annual: {
        amount: 100,
        id: "price_1QaDgfApDwfhmkAaYtVZBe90",
      },
    },
    description: "Unlock Your full Experience",
    features: ["All Languages Available", "Share Public Snippets", "Save Private Snippets", "Access to AI Coder"],
  },
];

export const languages = [
  {id: "javascript", language: "JavaScript", free: true, Icon: Javascript},
  {id: "c", language: "C", free: true, Icon: C},
  {id: "php", language: "PHP", free: true, Icon: PHP},
  {id: "typescript", language: "TypeScript", free: true, Icon: Typescript},
  {id: "go", language: "Go", free: true, Icon: Go},
  {id: "csharp", language: "C#", free: true, Icon: Csharp},
  {id: "cpp", language: "C++", free: true, Icon: Cpp},
  {id: "python", language: "Python", free: true, Icon: Python},
  {id: "java", language: "Java", free: true, Icon: Java},
  {id: "ruby", language: "Ruby", free: true, Icon: Ruby},
  {id: "rust", language: "Rust", free: true, Icon: Rust},
];

export const LanguagesMap = {
  javascript: {id: "javascript", language: "JavaScript", free: true, Icon: Javascript},
  c: {id: "c", language: "C", free: true, Icon: C},
  php: {id: "php", language: "PHP", free: true, Icon: PHP},
  typescript: {id: "typescript", language: "TypeScript", free: true, Icon: Typescript},
  go: {id: "go", language: "Go", free: true, Icon: Go},
  csharp: {id: "csharp", language: "C#", free: true, Icon: Csharp},
  cpp: {id: "cpp", language: "C++", free: true, Icon: Cpp},
  python: {id: "python", language: "Python", free: true, Icon: Python},
  java: {id: "java", language: "Java", free: true, Icon: Java},
  ruby: {id: "ruby", language: "Ruby", free: true, Icon: Ruby},
  rust: {id: "rust", language: "Rust", free: true, Icon: Rust},
};

export const LanguageIcons = {
  javascript: Javascript,
  c: C,
  php: PHP,
  typescript: Typescript,
  go: Go,
  csharp: Csharp,
  cpp: Cpp,
  python: Python,
  java: Java,
  ruby: Ruby,
  rust: Rust,
};

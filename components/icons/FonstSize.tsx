import {cn} from "@/lib/utils";
import React from "react";
import {ClassNameValue} from "tailwind-merge";

export default function FonstSize({className}: {className?: ClassNameValue}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("stroke-foreground", className)}
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M18 21V11M18 21L16 18.5M18 21L20 18.5M18 11L16 13M18 11L20 13"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path d="M9 5L9 17M9 17H7M9 17H11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{" "}
        <path d="M15 7V5L3 5L3 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{" "}
      </g>
    </svg>
  );
}

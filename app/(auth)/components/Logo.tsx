import React from "react";
import Link from "next/link";

export default function Logo({full}: {full?: boolean}) {
  return (
    <Link href={"/"} className="w-fit h-10 max-sm:h-5 flex items-center gap-2">
      <img src="/logo.png" alt="FinanacerPal" className="h-full object-cover" />
      {full ? <div className="text-primary font-bold">MyCodePal</div> : <></>}
    </Link>
  );
}

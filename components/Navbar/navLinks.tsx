import {navLinks} from "@/lib/consts";
import Link from "next/link";
import ProBtn from "../payment/ProBtn";

export default function NavLinks({setNavState}: {setNavState: any}) {
  return (
    <div className="flex z-30 max-sm:flex-col items-center gap-3">
      {navLinks.map((item, i) => (
        <Link
          href={item.href}
          key={i}
          className="text-nowrap max-sm:w-full transition-all duration-300 bg-background/40 shadow-inner shadow-secondary hover:bg-primary/30 hover:shadow-primary border max-sm:bg-gray-500 text-center p-2 rounded-lg"
          onClick={() => {
            setNavState(false);
          }}
        >
          {item.link}
        </Link>
      ))}
      <ProBtn />
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Dota from "~/assets/icons/tabs/dota.png";
import CsGo from "~/assets/icons/tabs/csgo.png";
import { cn } from "~/lib/utils";
import Image from "next/image";

const tabs = [
  {
    name: "Dota",
    href: "/",
    Icon: Dota,
  },
];

export default function MatchTabs() {
  const pathname = usePathname();
  return (
    <div className="flex bg-background-400 rounded-full">
      {tabs.map(({ href, name, Icon }) => (
        <Link
          key={name}
          href={href}
          className={cn(
            "flex items-center gap-3 text-sm h-11 px-5 rounded-full font-medium transition-colors",
            pathname === href
              ? "text-foreground bg-gradient-to-tr from-green to-blue-500/40"
              : "text-slate-400 hover:text-foreground hover:bg-background-200"
          )}
        >
          <Image
            src={Icon}
            alt="MatchLogo"
            quality={100}
            width={40}
            height={40}
          />
          {name}
        </Link>
      ))}
    </div>
  );
}

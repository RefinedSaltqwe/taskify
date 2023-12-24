import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = object;

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const Logo: React.FC<LogoProps> = () => {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          height={30}
          width={30}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <p className={cn("text-lg text-neutral-700", headingFont.className)}>
          Taskify
        </p>
      </div>
    </Link>
  );
};
export default Logo;

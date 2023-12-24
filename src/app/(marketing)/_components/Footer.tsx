import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import React from "react";

type FooterProps = object;

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="fixed bottom-0 flex  w-full items-center border-t bg-slate-100 p-4 ">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

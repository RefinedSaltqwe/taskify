import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "sonner";

type PlatformLayoutProps = {
  children: React.ReactNode;
};

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  return (
    <ClerkProvider>
      {/* Tanstack React-query */}
      <QueryProvider>
        <Toaster />
        {/* To Prevent Hydration Error and Plugging in the Modals */}
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};
export default PlatformLayout;

import React from "react";

type ClerkLayoutProps = {
  children: React.ReactNode;
};

const ClerkLayout: React.FC<ClerkLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
};
export default ClerkLayout;

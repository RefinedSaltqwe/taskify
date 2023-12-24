import React from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

type MarketingLayoutProps = {
  children: React.ReactNode;
};

const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="bg-slate-100 pb-20 pt-40">{children}</main>;
      <Footer />
    </div>
  );
};
export default MarketingLayout;

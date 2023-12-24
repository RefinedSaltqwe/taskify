import React from "react";

type ListWrapperProps = {
  children: React.ReactNode;
};

const ListWrapper: React.FC<ListWrapperProps> = ({ children }) => {
  return <li className="h-full w-[272px] shrink-0 select-none">{children}</li>;
};
export default ListWrapper;

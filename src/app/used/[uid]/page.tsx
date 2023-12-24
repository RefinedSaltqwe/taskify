import React from "react";

type pageProps = {
  params: {
    uid: string;
  };
};

const page: React.FC<pageProps> = ({ params }) => {
  return <div>Have a good coding {params.uid}</div>;
};
export default page;

import { OrganizationList } from "@clerk/nextjs";
import React from "react";

type CreateOrganizationPageProps = object;

const CreateOrganizationPage: React.FC<CreateOrganizationPageProps> = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:id"}
      afterCreateOrganizationUrl={"/organization/:id"}
    />
  );
};
export default CreateOrganizationPage;

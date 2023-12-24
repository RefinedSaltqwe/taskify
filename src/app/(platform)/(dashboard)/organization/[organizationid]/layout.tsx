import React from "react";
import OrgControl from "./_components/OrgControl";
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs";

// ? This is for the Taskbar Title
export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug ?? "organization"), // Uppercase
  };
}

type OrganizationIdLayoutProps = {
  children: React.ReactNode;
};

const OrganizationIdLayout: React.FC<OrganizationIdLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};
export default OrganizationIdLayout;

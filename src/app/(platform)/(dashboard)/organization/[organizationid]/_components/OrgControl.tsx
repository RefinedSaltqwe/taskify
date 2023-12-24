"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

type OrgControlProps = object;

const OrgControl: React.FC<OrgControlProps> = () => {
  // ? It checks if the url has changed to a different organization
  // ? Redirects to the right org with the URL submitted
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;

    void setActive({
      organization: params.organizationid as string,
    });
  }, [setActive, params.organizationid]);

  return null;
};
export default OrgControl;

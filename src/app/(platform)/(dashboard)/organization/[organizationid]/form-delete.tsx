"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

type FormDeleteProps = object;

const FormDelete: React.FC<FormDeleteProps> = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button
        type="submit"
        variant={"destructive"}
        size={"sm"}
        disabled={pending}
      >
        {pending ? "Loading" : "Delete"}
      </Button>
    </div>
  );
};
export default FormDelete;

"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

type FormButtonProps = object;

const FormButton: React.FC<FormButtonProps> = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button type="submit" className="" disabled={pending}>
        Submit
      </Button>
    </div>
  );
};
export default FormButton;

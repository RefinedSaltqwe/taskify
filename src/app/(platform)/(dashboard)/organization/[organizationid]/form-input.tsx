"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormStatus } from "react-dom";

type FormInputProps = {
  errors?: {
    title?: string[];
  };
};

const FormInput: React.FC<FormInputProps> = ({ errors }) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Input
        id="title"
        name="title"
        placeholder="Enter a board title"
        required
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default FormInput;

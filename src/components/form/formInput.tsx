"use client";

import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import FormErrors from "./formErrors";

type FormInputProps = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const FormInput: React.FC<FormInputProps> = forwardRef<
  HTMLInputElement,
  FormInputProps
>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
      inputRef,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              aria-disabled={pending}
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref ? ref : inputRef}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn("h-7 px-2 py-1 text-sm", className)}
            aria-describedby={`${id}-error`}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    );
  },
);

export default FormInput;

FormInput.displayName = "FormInput";

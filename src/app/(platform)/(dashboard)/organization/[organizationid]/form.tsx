"use client";

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import React from "react";
import FormInput from "@/components/form/formInput";
import FormButton from "@/components/form/formButton";

const Form: React.FC = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS!");
    },
    onError: (error) => {
      console.error(error, "ERROR!!!");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    void execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput
          id="title"
          placeholder="Board Title"
          label="Board Title"
          errors={fieldErrors}
        />
      </div>
      <FormButton>Save</FormButton>
    </form>
  );
};
export default Form;

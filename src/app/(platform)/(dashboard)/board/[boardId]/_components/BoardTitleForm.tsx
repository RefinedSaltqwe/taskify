"use client";
import { updateBoard } from "@/actions/update-board";
import FormInput from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { type Board } from "@prisma/client";
import React, { type ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

type BoardTitleFormProps = {
  data: Board;
};

const BoardTitleForm: React.FC<BoardTitleFormProps> = ({ data }) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      disableEditing();
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsediting] = useState(false);

  const enableEditing = () => {
    setIsediting(true);
    setTimeout(() => {
      formRef.current?.focus();
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsediting(false);
  };

  const onSumbit = (formData: FormData) => {
    const title = formData.get("title") as string;
    void execute({
      title,
      id: data.id,
    });
    // console.log("I am submitted", title);
  };
  // ? this will trigger "onSubmit" function when onBlur occurs
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form
        action={onSumbit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          inputRef={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant={"transparent"}
      className="h-auto w-auto p-1 px-2 text-lg font-bold"
    >
      {title}
    </Button>
  );
};
export default BoardTitleForm;

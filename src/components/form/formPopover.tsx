"use client";
import React, { type ElementRef, useRef } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FormInput from "./formInput";
import FormButton from "./formButton";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import FormPicker from "./formPicker";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

type FormPopoverProps = {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

const FormPopover: React.FC<FormPopoverProps> = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}) => {
  const router = useRouter();
  const proModal = useProModal();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success(`New Board "${data.title}" has been created!`);
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(`There is an error creating the board. Error: ${error}`);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    void execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Create board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              placeholder="Title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormButton className="w-full">Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
export default FormPopover;

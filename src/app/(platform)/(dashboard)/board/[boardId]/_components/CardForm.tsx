"use client";
import { createCard } from "@/actions/create-card";
import FormButton from "@/components/form/formButton";
import { FormTextarea } from "@/components/form/formTextarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, {
  type ElementRef,
  type KeyboardEventHandler,
  useRef,
} from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type CardFormProps = {
  listId: string;
  isEditing: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  enableEditing: () => void;
  disableEditing: () => void;
};

const CardForm: React.FC<CardFormProps> = ({
  listId,
  isEditing,
  enableEditing,
  disableEditing,
  inputRef,
}) => {
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);

  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" created`);
      formRef.current?.reset();
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const listId = formData.get("listId") as string;
    const boardId = params.boardId as string;

    void execute({ title, listId, boardId });
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className="m-1 space-y-4 px-1 py-0.5"
      >
        <FormTextarea
          id="title"
          onKeyDown={onTextareakeyDown}
          ref={inputRef}
          placeholder="Enter a title for this card..."
          errors={fieldErrors}
        />
        <input
          hidden
          id="listId"
          name="listId"
          value={listId}
          onChange={() => null}
        />
        <div className="flex items-center gap-x-1">
          <FormButton>Add card</FormButton>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="px-2 pt-2">
      <Button
        onClick={enableEditing}
        className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
        size="sm"
        variant="ghost"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a card
      </Button>
    </div>
  );
};
export default CardForm;

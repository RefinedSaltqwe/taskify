"use client";
import { updateList } from "@/actions/update-list";
import FormInput from "@/components/form/formInput";
import { useAction } from "@/hooks/use-action";
import { type List } from "@prisma/client";
import React, { useRef, useState, type ElementRef } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOptions from "./ListOptions";

type ListHeaderProps = {
  data: List;
  onAddCard: () => void;
};

const ListHeader: React.FC<ListHeaderProps> = ({ data, onAddCard }) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed list "${title}" to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    void execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  return (
    <div className="items-start- flex justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
          <input
            hidden
            id="id"
            name="id"
            value={data.id}
            onChange={() => {
              ("");
            }}
          />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
            onChange={() => {
              ("");
            }}
          />
          <FormInput
            inputRef={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full cursor-pointer border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};
export default ListHeader;

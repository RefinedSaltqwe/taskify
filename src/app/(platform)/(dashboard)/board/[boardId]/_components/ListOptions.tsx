"use client";
import { type List } from "@prisma/client";
import React, { type ElementRef, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, X } from "lucide-react";
import FormButton from "@/components/form/formButton";
import { toast } from "sonner";
import { deleteList } from "@/actions/delete-list";
import { copyList } from "@/actions/copy-list";

type ListOptionsProps = {
  data: List;
  onAddCard: () => void;
};

const ListOptions: React.FC<ListOptionsProps> = ({ data, onAddCard }) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    void executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    void executeCopy({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input
            hidden
            name="id"
            id="id"
            value={data.id}
            onChange={() => {
              null;
            }}
          />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            onChange={() => {
              null;
            }}
          />
          <FormButton
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Copy list...
          </FormButton>
        </form>
        <Separator />
        <form action={onDelete}>
          <input
            hidden
            name="id"
            id="id"
            value={data.id}
            onChange={() => {
              null;
            }}
          />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            onChange={() => {
              null;
            }}
          />
          <FormButton
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Delete this list
          </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
export default ListOptions;

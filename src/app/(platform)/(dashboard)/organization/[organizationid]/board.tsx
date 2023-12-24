import React from "react";
import FormDelete from "./form-delete";
import { deleteBoard } from "@/actions/delete-board";

type BoardProps = {
  title: string;
  id: string;
};

const Board: React.FC<BoardProps> = ({ title, id }) => {
  const deleBoardWithId = deleteBoard.bind(null, id);

  return (
    <form action={deleBoardWithId}>
      <div key={id}>Board name: {title}</div>
      <FormDelete />
    </form>
  );
};
export default Board;

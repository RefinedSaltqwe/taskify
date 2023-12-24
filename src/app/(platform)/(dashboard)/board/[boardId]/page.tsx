import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ListContainer from "./_components/ListContainer";

type BoardIdPageProps = {
  params: {
    boardId: string;
  };
};

const BoardIdPage: React.FC<BoardIdPageProps> = async ({ params }) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
};
export default BoardIdPage;

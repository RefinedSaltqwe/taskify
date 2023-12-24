/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { Suspense } from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/boardList";
import { checkSubscription } from "@/lib/subscription";

type OrganizationIdPageProps = object;

const OrganizationIdPage: React.FC<OrganizationIdPageProps> = async () => {
  // const boards = (await db.board.findMany()) as Boards;
  const isPro = await checkSubscription();

  return (
    <div className="mb-20 w-full">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};
export default OrganizationIdPage;

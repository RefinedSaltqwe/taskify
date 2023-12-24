"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { type CardWithList } from "types";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./action";
import { type AuditLog } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";
import { Activity } from "./activity";

type CardModalProps = object;

const CardModal: React.FC<CardModalProps> = () => {
  const modalId = useCardModal((state) => state.modalId);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", modalId],
    queryFn: () => fetch(`/api/cards/${modalId}`).then((res) => res.json()),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", modalId],
    queryFn: () => fetcher(`/api/cards/${modalId}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CardModal;

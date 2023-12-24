"use client";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { defaultImages } from "@/constants/images";

interface InfoProps {
  isPro?: boolean;
}

const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Image
          fill
          src={
            organization?.imageUrl
              ? organization?.imageUrl
              : "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200"
          }
          alt="Organization"
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 h-3 w-3" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};
export default Info;

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="item-center flex gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};

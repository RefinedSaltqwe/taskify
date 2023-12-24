/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./formErrors";

type FormPickerProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

const FormPicker: React.FC<FormPickerProps> = ({ id, errors }) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, unknown>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelecetedImageId] = useState<unknown>(null);

  function randomNum() {
    return Math.floor(Math.random() * 10 + 1);
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result?.response) {
          const newImages = result.response as unknown as Array<
            Record<string, unknown>
          >;
          setImages(newImages);
        } else {
          console.log("Failed to get images from Unsplash.");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="mg-2 grid grid-cols-3 gap-2">
        {images.map((image) => {
          const imageId = image.id as string;
          const imageUrl = image.urls as { thumb: string; full: string };
          const imageLink = image.links as { html: string };
          const imageUser = image.user as { name: string };
          return (
            <div
              key={imageUrl.thumb ? imageUrl.thumb : randomNum()}
              className={cn(
                "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
                pending && "cursor-auto opacity-50 hover:opacity-50",
              )}
              onClick={() => {
                if (pending) return;
                setSelecetedImageId(imageId);
              }}
            >
              <input
                type="radio"
                id={id}
                name={id}
                className="hidden"
                checked={selectedImageId === imageId}
                disabled={pending}
                value={`${imageId}|${imageUrl.thumb}|${imageUrl.full}|${imageLink.html}|${imageUser.name}`}
                onChange={() => {
                  ("");
                }}
              />
              <Image
                src={imageUrl.thumb}
                fill
                alt="Unsplash Image"
                className="rounded-sm object-cover"
                sizes="auto"
              />
              {selectedImageId === imageId && (
                <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              <Link
                href={imageLink.html}
                target="_blank"
                className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
              >
                {imageUser.name}
              </Link>
            </div>
          );
        })}
      </div>
      <FormErrors errors={errors} id="image" />
    </div>
  );
};
export default FormPicker;

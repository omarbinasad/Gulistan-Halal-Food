"use client";

import { useState } from "react";
import Image from "next/image";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface ProductGalleryProps {
  images: ImageAsset[];
  name: string;
  categorySlug: string;
  badge?: { label: string; className: string };
}

/** Main image with optional thumbnails. Falls back to a category-icon tile until product photos exist. */
export function ProductGallery({ images, name, categorySlug, badge }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
      {images.length > 1 && (
        <ul className="flex gap-3 sm:flex-col" aria-label="Product images">
          {images.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "relative size-16 overflow-hidden rounded-xl border-2 bg-sand transition-[border-color,box-shadow] duration-200 sm:size-20",
                  i === active ? "border-primary shadow-soft" : "border-transparent hover:border-primary/40",
                )}
              >
                <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative aspect-square flex-1 overflow-hidden rounded-3xl bg-sand">
        {current ? (
          <Image
            key={current.url}
            src={current.url}
            alt={current.alt || name}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            data-product-visual
            className="animate-in fade-in object-cover duration-300"
          />
        ) : (
          // TODO: replace with product photography when image assets exist.
          <div
            aria-hidden
            data-product-visual
            className="flex h-full items-center justify-center bg-gradient-to-br from-sand via-secondary to-accent text-primary/30"
          >
            <CategoryIcon slug={categorySlug} className="size-32 sm:size-44" />
          </div>
        )}
        {badge && (
          <Badge className={cn("absolute top-4 left-4 h-6 rounded-md px-2.5 text-xs font-semibold", badge.className)}>{badge.label}</Badge>
        )}
      </div>
    </div>
  );
}

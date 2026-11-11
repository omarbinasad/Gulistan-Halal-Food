import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { flagBackground } from "@/lib/flags";
import type { CountryCollection } from "@/types";
import { CategoryIcon } from "./category-icon";

/** Placeholder art per country (category icons) until real food photography is supplied via `country.image`. */
const artIcons: Record<string, [string, string]> = {
  BD: ["fish", "rice"],
  IN: ["spices", "grocery-essentials"],
  NP: ["frozen-foods", "spices"],
  PK: ["rice", "spices"],
  TH: ["rice", "vegetables"],
  ID: ["snacks", "grocery-essentials"],
  MY: ["beverages", "frozen-foods"],
  VN: ["grocery-essentials", "beverages"],
  BR: ["meat", "beverages"],
};

export function CountryCard({ country }: { country: CountryCollection }) {
  const [primaryIcon, secondaryIcon] = artIcons[country.countryCode] ?? ["grocery-essentials", "rice"];

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group relative flex h-44 overflow-hidden rounded-2xl border bg-card shadow-soft transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:h-48"
    >
      <div className="relative z-10 flex flex-col justify-between p-5 sm:p-6">
        <span
          aria-hidden
          className="size-14 shrink-0 rounded-full shadow-soft ring-1 ring-border transition-[scale] duration-300 group-hover:scale-105 sm:size-[4.5rem]"
          style={{ background: flagBackground(country.countryCode) }}
        />
        <div>
          <span className="block font-heading text-xl leading-tight font-semibold text-foreground sm:text-2xl">{country.name}</span>
          <span className="sr-only">{country.productCount} products</span>
          <span className="mt-3 flex size-8 items-center justify-center rounded-full bg-accent text-primary transition-[background-color,color] duration-300 group-hover:bg-grad-primary group-hover:text-primary-foreground">
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>

      {/* Curved image panel. TODO: real photo via country.image; icon art is a placeholder. */}
      <div aria-hidden className="absolute inset-y-0 right-0 w-[56%] overflow-hidden rounded-tl-[100%_100%]">
        {country.image ? (
          <Image
            src={country.image.url}
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative size-full bg-gradient-to-br from-sand via-accent to-secondary transition-transform duration-500 group-hover:scale-105">
            <CategoryIcon slug={primaryIcon} className="absolute right-[18%] bottom-[14%] size-16 text-primary/30 sm:size-20" />
            <CategoryIcon slug={secondaryIcon} className="absolute top-[14%] right-[8%] size-9 text-primary/20 sm:size-11" />
          </div>
        )}
      </div>
    </Link>
  );
}

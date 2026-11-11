import Image from "next/image";
import Link from "next/link";
import { Snowflake, Star, ThermometerSnowflake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { countryName, discountPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product, ProductBadge } from "@/types";
import { CategoryIcon } from "./category-icon";
import { Price } from "./price";
import { AddToCart, WishlistButton } from "./product-actions";

export const badgeStyles: Record<ProductBadge, { label: string; className: string }> = {
  new: { label: "New", className: "bg-grad-primary text-primary-foreground" },
  sale: { label: "Sale", className: "bg-sale text-white" },
  bestseller: { label: "Bestseller", className: "bg-grad-saffron text-saffron-foreground" },
  limited: { label: "Limited", className: "bg-grad-deep text-white" },
};

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const href = `/products/${product.slug}`;
  const image = product.images[0];
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-soft transition-[box-shadow,translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-sand">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            data-fly-source
            fill
            sizes="(min-width: 1536px) 12vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            data-fly-source
            className="flex h-full items-center justify-center bg-gradient-to-br from-sand via-secondary to-accent text-primary/40 transition-transform duration-500 group-hover:scale-105"
          >
            <CategoryIcon slug={product.category.slug} className="size-12" />
          </div>
        )}

        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.badges.map((badge) => (
            <Badge key={badge} className={cn("h-5 rounded-md px-1.5 text-[0.625rem] font-semibold", badgeStyles[badge].className)}>
              {badge === "sale" && discount ? `−${discount}%` : badgeStyles[badge].label}
            </Badge>
          ))}
        </div>

        <WishlistButton productName={product.name} className="absolute top-2 right-2 z-10" />

        {product.storage !== "ambient" && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[0.625rem] font-medium text-sky-800 backdrop-blur">
            {product.storage === "frozen" ? <Snowflake className="size-3" /> : <ThermometerSnowflake className="size-3" />}
            {product.storage === "frozen" ? "Frozen" : "Chilled"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 min-h-9 text-[0.8125rem] leading-[1.15rem] font-semibold text-foreground">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {product.unitLabel} · {countryName(product.countryCode)}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <Price amount={product.price} compareAt={product.compareAtPrice} />
          {product.rating !== undefined && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-gold text-gold" aria-hidden />
              <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
            </p>
          )}
        </div>

        <div className="mt-3">
          <AddToCart
            product={{ id: product.id, slug: product.slug, name: product.name, unitLabel: product.unitLabel, price: product.price, categorySlug: product.category.slug }}
            disabled={!product.inStock}
          />
        </div>
      </div>
    </article>
  );
}

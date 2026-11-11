import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Price({
  amount,
  compareAt,
  className,
}: {
  amount: number;
  compareAt?: number;
  className?: string;
}) {
  const onSale = compareAt !== undefined && compareAt > amount;
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("text-base font-bold tabular-nums", onSale ? "text-sale" : "text-foreground")}>
        {formatPrice(amount)}
      </span>
      {onSale && (
        <span className="text-xs text-muted-foreground tabular-nums line-through">
          <span className="sr-only">Was </span>
          {formatPrice(compareAt)}
        </span>
      )}
    </div>
  );
}

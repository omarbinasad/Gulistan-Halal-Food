import Link from "next/link";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

/** Placeholder for routes that are planned but not yet built. */
export function ComingSoon({
  title,
  description = "This section is part of the roadmap and will be available soon.",
  backHref = "/",
  backLabel = "Back to home",
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 py-20 text-center">
      <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Hammer className="size-5" />
      </span>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      <Button asChild variant="outline" size="xl" className="mt-6">
        <Link href={backHref}>{backLabel}</Link>
      </Button>
    </div>
  );
}

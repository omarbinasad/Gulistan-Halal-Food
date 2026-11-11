"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/** Full-width green band, as in the approved reference. UI only: no mailing service yet. */
export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  return (
    <section className="pattern-geo bg-emerald-deep text-white">
      <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 2xl:px-12">
        <div>
          <h2 className="font-heading text-xl font-bold sm:text-2xl">Stay Updated with Special Offers</h2>
          <p className="mt-1 text-sm text-white/70">Get the latest deals, new arrivals and seasonal offers.</p>
        </div>
        {submitted ? (
          <p role="status" className="animate-in fade-in flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm duration-300">
            <Check className="size-4 text-saffron" />
            Thanks! Sign-up will be activated when our mailing service launches.
          </p>
        ) : (
          <form
            className="flex w-full max-w-xl overflow-hidden rounded-lg bg-white transition-shadow duration-200 focus-within:ring-3 focus-within:ring-saffron/60"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: send to newsletter service once the backend exists.
              setSubmitted(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address"
              onBlur={() => setTouched(true)}
              className={`min-w-0 flex-1 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground ${
                touched ? "invalid:bg-destructive/5 invalid:text-destructive" : ""
              }`}
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-grad-saffron px-5 text-sm font-semibold text-saffron-foreground transition-colors duration-200 hover:brightness-105 focus-visible:outline-none"
            >
              Subscribe
              <ArrowRight className="size-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

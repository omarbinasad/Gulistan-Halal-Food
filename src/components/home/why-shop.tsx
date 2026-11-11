import { Globe2, HeartHandshake, Languages, ShieldCheck, Snowflake, Truck } from "lucide-react";
import { Container } from "@/components/layout/container";

const left = [
  { icon: ShieldCheck, title: "Certified Halal", body: "Meat, poultry and processed foods carry recognised halal certification from source." },
  { icon: Globe2, title: "Authentic Origins", body: "Imported directly from producers across South & Southeast Asia and Brazil." },
  { icon: Snowflake, title: "Cool-Chain Care", body: "Chilled and frozen items are packed and shipped temperature-controlled." },
];
const right = [
  { icon: HeartHandshake, title: "Community First", body: "Family-size packs at fair prices, chosen with our community in mind." },
  { icon: Languages, title: "English & Japanese Support", body: "Friendly help whenever you need it, in the language you prefer." },
  { icon: Truck, title: "Super Fast Delivery", body: "Reliable nationwide delivery with your choice of time slot." },
];

function Feature({ icon: Icon, title, body }: (typeof left)[number]) {
  return (
    <li className="flex gap-4">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-transform duration-300 hover:scale-105">
        <Icon className="size-6" strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

export function WhyShop() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h2 className="mb-10 text-center font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Why shop with Gulistan
        </h2>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(16rem,22rem)_1fr] 2xl:gap-16">
          <ul className="space-y-8">{left.map((f) => <Feature key={f.title} {...f} />)}</ul>
          {/* TODO: replace with produce photography when image assets exist. */}
          <div
            aria-hidden
            className="mx-auto hidden aspect-square w-full max-w-sm items-center justify-center rounded-full bg-gradient-to-br from-accent via-sand to-accent lg:flex"
          >
            <span className="font-heading text-3xl leading-tight font-bold text-primary/70 italic">
              Good Food,
              <br />
              Better Lives
            </span>
          </div>
          <ul className="space-y-8">{right.map((f) => <Feature key={f.title} {...f} />)}</ul>
        </div>
      </Container>
    </section>
  );
}

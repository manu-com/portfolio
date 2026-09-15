"use client";

import { useMemo, useState } from "react";
import {
  pricing,
  calculateEstimate,
  describeSelection,
  formatKSh,
  type CalculatorSelection,
} from "@/lib/pricing";
import { Reveal } from "@/components/ui/reveal";

const EMPTY: CalculatorSelection = {
  websiteType: null,
  pages: null,
  features: [],
  design: null,
  additionalServices: [],
};

/* ------------ tiny shared pieces ------------ */

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
      <path
        d="M2 6.5l2.5 2.5 5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GroupLabel({ num, title }: { num: string; title: string }) {
  return (
    <p className="mb-5 text-[0.7rem] uppercase tracking-[0.3em] text-secondary">
      <span className="mr-2 text-accent">{num}</span>
      {title}
    </p>
  );
}

function PriceTag({ price }: { price: number }) {
  if (price === 0) return <span className="text-[0.7rem] tracking-wider text-secondary/60">Included</span>;
  return <span className="text-[0.7rem] tracking-wider text-secondary">+ {formatKSh(price)}</span>;
}

/* ------------ selectable single card ------------ */

function SingleCard({
  label,
  price,
  selected,
  onClick,
}: {
  label: string;
  price: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex flex-col gap-2 rounded border px-5 py-4 text-left transition-all duration-300 ${
        selected
          ? "border-accent/60 bg-accent/[0.04]"
          : "border-border hover:border-border-hover"
      }`}
    >
      <span className={`text-sm font-medium ${selected ? "text-primary" : "text-secondary"}`}>
        {label}
      </span>
      <PriceTag price={price} />
    </button>
  );
}

/* ------------ selectable pill (pages) ------------ */

function Pill({
  label,
  price,
  selected,
  onClick,
}: {
  label: string;
  price: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`rounded border px-5 py-3 text-center text-sm transition-all duration-300 ${
        selected
          ? "border-accent/60 bg-accent/[0.04] text-primary"
          : "border-border text-secondary hover:border-border-hover"
      }`}
    >
      {label}
      <span className="ml-2 text-[0.65rem] tracking-wider text-secondary/60">
        {price === 0 ? "" : `+${formatKSh(price)}`}
      </span>
    </button>
  );
}

/* ------------ checkbox row ------------ */

function CheckRow({
  label,
  price,
  checked,
  onChange,
}: {
  label: string;
  price: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className="flex items-center gap-4 rounded border px-4 py-3 transition-all duration-300 sm:items-start sm:py-3.5"
      style={{
        borderColor: checked
          ? "rgba(201,168,76,0.5)"
          : "rgba(255,255,255,0.06)",
        backgroundColor: checked ? "rgba(201,168,76,0.03)" : undefined,
      }}
    >
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-colors duration-200 ${
          checked
            ? "border-accent bg-accent/20 text-accent"
            : "border-white/15 text-transparent"
        }`}
      >
        <CheckIcon />
      </span>
      <div className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`text-sm ${checked ? "text-primary" : "text-secondary"}`}>
          {label}
        </span>
        <span className="text-[0.65rem] tracking-wider text-secondary/50">+ {formatKSh(price)}</span>
      </div>
    </button>
  );
}

/* ------------ main calculator ------------ */

export function Calculator() {
  const [sel, setSel] = useState<CalculatorSelection>(EMPTY);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const { lineItems, total } = useMemo(() => calculateEstimate(sel), [sel]);

  const descriptions = useMemo(() => describeSelection(sel), [sel]);

  /* single-select helpers */
  const pick =
    (key: "websiteType" | "pages" | "design") =>
    (id: string) =>
      setSel((s) => ({ ...s, [key]: id }));

  /* multi-select helper */
  const toggle =
    (key: "features" | "additionalServices") =>
    (id: string) =>
      setSel((s) => {
        const list: string[] = s[key] as string[];
        const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
        return { ...s, [key]: next };
      });

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pb-48 md:px-10 md:pb-24">
        <div className="mt-12 grid grid-cols-1 gap-16 md:mt-20 lg:grid-cols-12 lg:gap-20">
          {/* ---- left column: options ---- */}
          <div className="flex flex-col gap-16 lg:col-span-7">
            {/* Website Type */}
            <Reveal delay={1}>
              <GroupLabel num="01" title="Website Type" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pricing.websiteTypes.map((opt) => (
                  <SingleCard
                    key={opt.id}
                    label={opt.name}
                    price={opt.price}
                    selected={sel.websiteType === opt.id}
                    onClick={() => pick("websiteType")(opt.id)}
                  />
                ))}
              </div>
            </Reveal>

            {/* Pages */}
            <Reveal delay={2}>
              <GroupLabel num="02" title="Pages" />
              <div className="flex flex-wrap gap-3">
                {pricing.pages.map((opt) => (
                  <Pill
                    key={opt.id}
                    label={opt.name}
                    price={opt.price}
                    selected={sel.pages === opt.id}
                    onClick={() => pick("pages")(opt.id)}
                  />
                ))}
              </div>
            </Reveal>

            {/* Features */}
            <Reveal delay={3}>
              <GroupLabel num="03" title="Features" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pricing.features.map((opt) => (
                  <CheckRow
                    key={opt.id}
                    label={opt.name}
                    price={opt.price}
                    checked={sel.features.includes(opt.id)}
                    onChange={() => toggle("features")(opt.id)}
                  />
                ))}
              </div>
            </Reveal>

            {/* Design */}
            <Reveal delay={3}>
              <GroupLabel num="04" title="Design Options" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {pricing.design.map((opt) => (
                  <SingleCard
                    key={opt.id}
                    label={opt.name}
                    price={opt.price}
                    selected={sel.design === opt.id}
                    onClick={() => pick("design")(opt.id)}
                  />
                ))}
              </div>
            </Reveal>

            {/* Additional Services */}
            <Reveal delay={4}>
              <GroupLabel num="05" title="Additional Services" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pricing.additionalServices.map((opt) => (
                  <CheckRow
                    key={opt.id}
                    label={opt.name}
                    price={opt.price}
                    checked={sel.additionalServices.includes(opt.id)}
                    onChange={() => toggle("additionalServices")(opt.id)}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---- right column: summary ---- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={2}>
                <div className="rounded border border-border bg-surface p-8">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-secondary">
                    Your Estimate
                  </p>

                  <div className="mt-8 flex flex-col gap-3">
                    {lineItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-baseline justify-between text-sm"
                      >
                        <span className="text-secondary">{item.label}</span>
                        <span className="text-primary">
                          {item.price === 0 ? "—" : `+ ${formatKSh(item.price)}`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="my-6 h-px bg-border" />

                  <div className="flex items-baseline justify-between">
                    <span className="text-[0.75rem] uppercase tracking-[0.25em] text-secondary">
                      Estimated Total
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-primary">
                      {formatKSh(total)}
                    </span>
                  </div>

                  <p className="mt-2 text-[0.65rem] leading-relaxed text-secondary/60">
                    Estimated development cost. Final pricing may vary depending
                    on project requirements.
                  </p>

                  <button
                    type="button"
                    onClick={() => setQuoteOpen((o) => !o)}
                    className="mt-8 w-full border border-accent/50 px-6 py-4 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-accent transition-all duration-300 hover:bg-accent/10"
                  >
                    {quoteOpen ? "Close Form" : "Request This Quote"}
                  </button>
                </div>
              </Reveal>

              {/* Quote form */}
              {quoteOpen && (
                <Reveal>
                  <QuoteForm
                    total={total}
                    descriptions={descriptions}
                    onCancel={() => setQuoteOpen(false)}
                  />
                </Reveal>
              )}
            </div>
          </div>
        </div>
    </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/90 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.25em] text-secondary">
              Estimated total
            </p>
            <p className="text-lg font-bold tracking-tight text-primary">{formatKSh(total)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuoteOpen(true);
              window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }}
            className="whitespace-nowrap border border-accent/50 px-5 py-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
          >
            Request Quote
          </button>
        </div>
      </div>
    </>
  );
}

/* ------------ quote form ------------ */

function QuoteForm({
  total,
  descriptions,
  onCancel,
}: {
  total: number;
  descriptions: string[];
  onCancel: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      description: fd.get("description") as string,
      selections: descriptions,
      estimate: total,
      submittedAt: new Date().toISOString(),
    };

    console.log("Quote request payload:", payload);

    /*
      Backend integration point:
      Replace the console.log above with a fetch/POST to your backend
      endpoint or email service, e.g.:
      
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    */

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-4 rounded border border-border bg-surface p-8">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent">Received</p>
        <h4 className="mt-4 text-xl font-bold text-primary">Quote request received.</h4>
        <p className="mt-3 text-sm leading-relaxed text-secondary">
          I&apos;ll review your requirements and get back to you within 24 hours
          with a refined estimate.
        </p>
        <button
          type="button"
          onClick={onCancel}
          className="mt-6 border border-border px-5 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-secondary transition-colors hover:border-accent/60 hover:text-primary"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded border border-border bg-surface p-8"
    >
      <p className="text-[0.7rem] uppercase tracking-[0.3em] text-secondary">
        Request This Quote
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="q-name" className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
            Name
          </label>
          <input
            id="q-name"
            name="name"
            required
            className="border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-secondary/30 focus:border-accent/60 focus:outline-none"
            placeholder="Your name"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="q-email" className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
              Email
            </label>
            <input
              id="q-email"
              name="email"
              type="email"
              required
              className="border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-secondary/30 focus:border-accent/60 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="q-phone" className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
              Phone / WhatsApp
            </label>
            <input
              id="q-phone"
              name="phone"
              type="tel"
              required
              className="border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-secondary/30 focus:border-accent/60 focus:outline-none"
              placeholder="+254..."
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="q-desc" className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
            Project description
          </label>
          <textarea
            id="q-desc"
            name="description"
            rows={4}
            required
            className="border border-border bg-background px-4 py-3 text-sm leading-relaxed text-primary placeholder:text-secondary/30 focus:border-accent/60 focus:outline-none"
            placeholder="Brief description of what you need"
          />
        </div>

        {/* Pre-filled selections */}
        <div className="rounded border border-border/50 bg-background/40 p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-secondary/60">
            Your selections
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {descriptions.map((d) => (
              <li key={d} className="text-[0.8rem] text-secondary">
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-border/50 pt-3 text-sm font-bold text-primary">
            Estimated: {formatKSh(total)}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="border border-accent/50 bg-accent/[0.04] px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-accent transition-all duration-300 hover:bg-accent/10"
        >
          Submit Quote Request
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-border px-6 py-4 text-[0.8rem] uppercase tracking-[0.2em] text-secondary transition-colors hover:border-accent/60 hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
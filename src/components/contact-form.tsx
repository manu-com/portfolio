"use client";

import { useState } from "react";
import {
  sendFormEmail,
  buildContactSummary,
  mailtoHref,
  whatsappHref,
} from "@/lib/contact";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const input = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      subject: (fd.get("subject") as string) ?? "",
      message: (fd.get("message") as string) ?? "",
    };

    setStatus("sending");
    setError("");

    const result = await sendFormEmail({
      subject: "New contact message from manu.dev",
      message: buildContactSummary(input),
    });

    if (result.ok) {
      setStatus("sent");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-line bg-surface p-8 md:p-10">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent">Received</p>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-primary">
          Thanks! Your message has been sent.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary">
          I&apos;ll get back to you within 24 hours. Prefer to reach me right now?
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={mailtoHref("Following up on my message")}
            className="inline-flex items-center justify-center border border-accent/50 bg-accent/[0.04] px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.25em] text-accent transition-colors duration-300 hover:bg-accent/10"
          >
            Email Me
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-border px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.25em] text-primary transition-colors duration-300 hover:border-accent/60 hover:text-accent"
          >
            WhatsApp Me
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Contact form"
      className="border border-line bg-surface p-8 md:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
            Name
          </label>
          <input
            id="c-name"
            name="name"
            required
            className="border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-secondary/30 focus:border-accent/60 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
            Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            className="border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-secondary/30 focus:border-accent/60 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label htmlFor="c-subject" className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
          Subject
        </label>
        <input
          id="c-subject"
          name="subject"
          className="border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-secondary/30 focus:border-accent/60 focus:outline-none"
          placeholder="What is this about?"
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label htmlFor="c-message" className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          required
          className="border border-border bg-background px-4 py-3 text-sm leading-relaxed text-primary placeholder:text-secondary/30 focus:border-accent/60 focus:outline-none"
          placeholder="Tell me a little about your project"
        />
      </div>

      {status === "error" && (
        <p className="mt-6 border border-border bg-background px-4 py-3 text-sm text-secondary" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 border border-accent/50 bg-accent/[0.04] px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-accent transition-all duration-300 hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
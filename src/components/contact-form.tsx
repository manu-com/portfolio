"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
      submittedAt: new Date().toISOString(),
    };

    console.log("Contact message payload:", payload);

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-line bg-surface p-10">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent">Received</p>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-primary">
          Message sent.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
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

      <button
        type="submit"
        className="mt-8 border border-accent/50 bg-accent/[0.04] px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-accent transition-all duration-300 hover:bg-accent/10"
      >
        Send Message
      </button>
    </form>
  );
}
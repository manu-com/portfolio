import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  CONTACT,
  buildContactSummary,
  buildQuoteSummary,
  mailtoHref,
  whatsappHref,
} from "../../src/lib/contact.ts";

test("contact details are wired from the profile, not hardcoded twice", () => {
  assert.equal(CONTACT.email, "e.ndereba1@gmail.com");
  assert.match(CONTACT.phoneTel, /^tel:\+\d+$/);
  assert.equal(CONTACT.whatsappBase, "https://wa.me/254112888460");
});

test("whatsappHref encodes the message and survives ampersands", () => {
  const href = whatsappHref("Cost & timeline for a web app");
  assert.ok(href.startsWith("https://wa.me/254112888460?text="));
  assert.ok(!href.includes(" "), "spaces must be encoded");
  assert.ok(!href.includes("&"), "raw ampersand would truncate the param");
  const msg = new URL(href).searchParams.get("text");
  assert.equal(msg, "Cost & timeline for a web app");
});

test("whatsappHref falls back only for null/undefined, not blank strings", () => {
  assert.ok(whatsappHref().includes(encodeURIComponent(CONTACT.defaultWhatsappMessage)));
  assert.ok(whatsappHref(undefined).includes(encodeURIComponent(CONTACT.defaultWhatsappMessage)));
  // Pinned deliberately: `??` catches null/undefined only, so a blank string is
  // forwarded as a blank message rather than the default. Harmless today
  // because every caller passes a built summary, but do not assume otherwise.
  assert.equal(whatsappHref("   "), `${CONTACT.whatsappBase}?text=`);
});

test("mailtoHref omits the query string when there is nothing to say", () => {
  assert.equal(mailtoHref(), `mailto:${CONTACT.email}`);
  assert.equal(mailtoHref(""), `mailto:${CONTACT.email}`);
});

test("mailtoHref builds an encoded subject and body", () => {
  const href = mailtoHref("Quote request", "Line one\nLine two");
  assert.ok(href.startsWith(`mailto:${CONTACT.email}?`));
  const url = new URL(href);
  assert.equal(url.searchParams.get("subject"), "Quote request");
  assert.equal(url.searchParams.get("body"), "Line one\nLine two");
});

test("the quote summary is a labelled, complete email body", () => {
  const body = buildQuoteSummary({
    name: "Ada",
    email: "ada@example.com",
    phone: "+254700000000",
    websiteType: "Business Website",
    pages: "5 Pages",
    features: "Blog, Search",
    design: "Fully custom UI/UX",
    additionalServices: "Domain setup",
    estimatedCost: "KSh 60,000",
    description: "A site for my studio.",
  });
  assert.ok(body.startsWith("NEW WEBSITE QUOTE REQUEST"));
  for (const label of [
    "Client:",
    "Email:",
    "Phone:",
    "Website Type:",
    "Pages:",
    "Selected Features:",
    "Design Options:",
    "Additional Services:",
    "Estimated Cost:",
    "Project Description:",
  ]) {
    assert.ok(body.includes(label), `missing ${label}`);
  }
  assert.ok(body.includes("KSh 60,000"));
});

test("missing optional fields degrade to explicit placeholders", () => {
  const body = buildQuoteSummary({
    name: "",
    email: "",
    phone: "",
    websiteType: "",
    pages: "",
    features: "",
    design: "",
    additionalServices: "",
    estimatedCost: "KSh 15,000",
    description: "",
  });
  assert.ok(body.includes("—"), "blank name should render an em dash");
  assert.ok(body.includes("Not selected"), "blank selection should say so");
  assert.ok(body.includes("None"), "blank multi-select should say None");
  assert.ok(!body.includes("undefined"), "no undefined leaked into the email");
});

test("the contact summary is labelled and never emits undefined", () => {
  const body = buildContactSummary({ name: "", email: "", subject: "", message: "" });
  assert.ok(body.startsWith("NEW CONTACT MESSAGE"));
  for (const label of ["Name:", "Email:", "Subject:", "Message:"]) {
    assert.ok(body.includes(label), `missing ${label}`);
  }
  assert.ok(!body.includes("undefined"));
});

test("the FormSubmit endpoint uses an id hash, not a naked email address", () => {
  // A bare address in client code would leak the destination inbox to scrapers.
  const source = readFileSync(
    new URL("../../src/lib/contact.ts", import.meta.url),
    "utf8",
  );
  const endpoint = source.match(/formsubmit\.co\/ajax\/([a-f0-9]+)/)?.[1];
  assert.ok(endpoint, "expected a formsubmit endpoint with a hash id");
  assert.match(endpoint, /^[a-f0-9]{32}$/, "endpoint id should be a 32-char hash");
  assert.ok(
    !source.includes(CONTACT.email),
    "the literal email address must not appear in contact.ts",
  );
});

import { profile } from "@/lib/data";

export const CONTACT = {
  name: "Manu",
  email: profile.email,
  phoneDisplay: profile.phone,
  phoneTel: `tel:+254112888460`,
  whatsappBase: profile.whatsapp,
  defaultWhatsappMessage: "Hi Manu, I'd like to discuss a website project.",
};

/* Pre-filled WhatsApp deep link */
export function whatsappHref(message?: string): string {
  const text = (message ?? CONTACT.defaultWhatsappMessage).trim();
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
}

/* Pre-filled email deep link */
export function mailtoHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${CONTACT.email}${qs ? `?${qs}` : ""}`;
}

/*
   Frontend-friendly form submission — FormSubmit AJAX endpoint.
   Uses a form ID hash (no naked email in client code); activation was
   completed via that hash. Sends email to CONTACT.email.
   - No backend, no database, no API keys/secrets exposed in the client.
   - To upgrade to Supabase later: send a POST to a /api/* edge function
     instead and keep the same return contract: { ok: true } | { ok: false, error }.
*/
const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/e466c861d0389961938e8142a8b4e1d8";

export async function sendFormEmail(input: {
  subject: string;
  message: string;
}): Promise<{ ok: boolean; error?: string; needsActivation?: boolean }> {
  try {
    const res = await fetch(FORM_SUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: input.subject,
        _template: "table",
        _captcha: "false",
        message: input.message,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && (data.success === true || data.success === "true")) {
      return { ok: true };
    }

    const message: string =
      typeof data.message === "string" ? data.message : "";
    if (message.toLowerCase().includes("activation")) {
      return {
        ok: false,
        needsActivation: true,
        error:
          "The delivery service needs a one-time activation. An activation link has been sent to the site owner's inbox — once clicked, submissions will go through.",
      };
    }
    return { ok: false, error: "The delivery service could not complete the request." };
  } catch {
    return { ok: false, error: "Network error — please try again or email me directly." };
  }
}

/* ---------- Quote request summary ---------- */

export type QuoteSummaryInput = {
  name: string;
  email: string;
  phone: string;
  websiteType: string;
  pages: string;
  features: string;
  design: string;
  additionalServices: string;
  estimatedCost: string;
  description: string;
};

/* Clean email body matching the requested format. */
export function buildQuoteSummary(q: QuoteSummaryInput): string {
  return [
    "NEW WEBSITE QUOTE REQUEST",
    "",
    "Client:",
    q.name || "—",
    "",
    "Email:",
    q.email || "—",
    "",
    "Phone:",
    q.phone || "—",
    "",
    "Website Type:",
    q.websiteType || "Not selected",
    "",
    "Pages:",
    q.pages || "Not selected",
    "",
    "Selected Features:",
    q.features || "None",
    "",
    "Design Options:",
    q.design || "Not selected",
    "",
    "Additional Services:",
    q.additionalServices || "None",
    "",
    "Estimated Cost:",
    q.estimatedCost,
    "",
    "Project Description:",
    q.description || "—",
  ].join("\n");
}

/* ---------- Contact message summary ---------- */

export function buildContactSummary(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return [
    "NEW CONTACT MESSAGE",
    "",
    "Name:",
    input.name || "—",
    "",
    "Email:",
    input.email || "—",
    "",
    "Subject:",
    input.subject || "—",
    "",
    "Message:",
    input.message || "—",
  ].join("\n");
}
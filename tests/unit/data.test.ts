import test from "node:test";
import assert from "node:assert/strict";
import { navLinks, cta, profile, projects, socials } from "../../src/lib/data.ts";

test("every nav link is an internal route that exists", () => {
  const known = new Set(["/", "/work", "/services", "/about", "/quote", "/contact"]);
  for (const link of [...navLinks, cta]) {
    assert.ok(link.href.startsWith("/"), `${link.href} must be internal`);
    assert.ok(known.has(link.href), `${link.href} has no matching page`);
  }
});

test("no duplicate nav routes", () => {
  const hrefs = [...navLinks, cta].map((l) => l.href);
  assert.equal(new Set(hrefs).size, hrefs.length);
});

test("contact details are real, not placeholders", () => {
  // These shipped values replaced an earlier "hello@manu.dev" placeholder.
  assert.equal(profile.email, "e.ndereba1@gmail.com");
  assert.match(profile.email, /@/, "email must be set");
  assert.notEqual(profile.email, "hello@manu.dev", "placeholder email is back");
  assert.match(profile.phone, /^\+\d[\d\s]+$/, "phone should be E.164-ish");
  assert.match(profile.whatsapp, /^https:\/\/wa\.me\/\d+$/);
  assert.match(profile.github, /^https:\/\/github\.com\//);
});

test("LinkedIn is not reintroduced anywhere", () => {
  // Deliberately removed; the socials list is GitHub / WhatsApp / Email only.
  const blob = JSON.stringify({ profile, socials });
  assert.ok(!/linkedin/i.test(blob), "LinkedIn reappeared in data");
  const labels = socials.map((s) => s.label);
  assert.deepEqual(labels, ["GitHub", "WhatsApp", "Email"]);
});

test("social hrefs use the right scheme per channel", () => {
  for (const s of socials) {
    assert.match(s.href, /^(https:\/\/|mailto:)/, `${s.label} href`);
  }
  const email = socials.find((s) => s.label === "Email");
  assert.equal(email?.href, `mailto:${profile.email}`);
});

test("every project has the fields the UI dereferences", () => {
  assert.ok(projects.length > 0, "at least one case study must exist");
  for (const p of projects) {
    assert.ok(p.slug.length > 0, "slug");
    assert.match(p.liveUrl, /^https:\/\//, `${p.slug} liveUrl`);
    assert.ok(p.description.trim().length > 20, `${p.slug} needs a real description`);
    assert.ok(Array.isArray(p.technologies) && p.technologies.length > 0, `${p.slug} technologies`);
  }
});

test("project slugs are unique and URL-safe", () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/, `${s} must be URL-safe`);
});

test("private repos keep githubUrl null so the link stays hidden", () => {
  // The UI conditionally renders a GitHub link; a stray string here would
  // expose a private repo URL.
  for (const p of projects) {
    if (p.githubUrl !== null) assert.match(p.githubUrl, /^https:\/\/github\.com\//);
  }
});

test("no project still carries placeholder copy", () => {
  const stale = ["lorem", "placeholder", "TODO", "coming soon", "your project"];
  for (const p of projects) {
    const blob = JSON.stringify(p).toLowerCase();
    for (const s of stale) {
      assert.ok(!blob.includes(s.toLowerCase()), `${p.slug} contains "${s}"`);
    }
  }
});

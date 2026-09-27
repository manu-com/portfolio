import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateEstimate,
  describeSelection,
  formatKSh,
  pricing,
  type CalculatorSelection,
} from "../../src/lib/pricing.ts";

const empty: CalculatorSelection = {
  websiteType: null,
  pages: null,
  features: [],
  design: null,
  additionalServices: [],
};

test("base price alone is the floor, not zero", () => {
  const { total, lineItems } = calculateEstimate(empty);
  assert.equal(total, pricing.base);
  assert.equal(lineItems.length, 1);
  assert.equal(lineItems[0].label, "Base Website");
});

test("zero-price options are never billed as line items", () => {
  const { total, lineItems } = calculateEstimate({
    ...empty,
    websiteType: "landing-page",
    pages: "1",
    design: "existing",
  });
  assert.equal(total, pricing.base);
  assert.equal(lineItems.length, 1, "zero-priced selections should add no rows");
});

test("total is always the sum of the line items", () => {
  const { lineItems, total } = calculateEstimate({
    websiteType: "ecommerce",
    pages: "10",
    features: ["blog", "payment", "seo-not-a-real-id"],
    design: "custom",
    additionalServices: ["domain", "hosting"],
  });
  const sum = lineItems.reduce((acc, i) => acc + i.price, 0);
  assert.equal(total, sum);
});

test("unknown ids are ignored rather than crashing or billing 0", () => {
  const { lineItems, total } = calculateEstimate({
    ...empty,
    features: ["nope", "also-nope"],
    additionalServices: ["bogus"],
  });
  assert.equal(lineItems.length, 1);
  assert.equal(total, pricing.base);
});

test("every configured id resolves to a price", () => {
  for (const group of [
    pricing.websiteTypes,
    pricing.pages,
    pricing.features,
    pricing.design,
    pricing.additionalServices,
  ]) {
    for (const opt of group) {
      assert.equal(typeof opt.price, "number", `${opt.id} price`);
      assert.ok(opt.price >= 0, `${opt.id} must not be negative`);
    }
  }
});

test("ids are unique within each group", () => {
  for (const [name, group] of [
    ["websiteTypes", pricing.websiteTypes],
    ["pages", pricing.pages],
    ["features", pricing.features],
    ["design", pricing.design],
    ["additionalServices", pricing.additionalServices],
  ] as const) {
    const ids = group.map((o) => o.id);
    assert.equal(new Set(ids).size, ids.length, `duplicate id in ${name}`);
  }
});

test("a full selection adds up", () => {
  const selection: CalculatorSelection = {
    websiteType: "web-app",
    pages: "5",
    features: ["auth", "admin"],
    design: "custom",
    additionalServices: ["seo"],
  };
  const expected =
    pricing.base +
    25000 + // web-app
    5000 + // 5 pages
    10000 + // auth
    15000 + // admin
    20000 + // custom UI/UX
    5000; // SEO
  assert.equal(calculateEstimate(selection).total, expected);
  assert.equal(expected, 95000);
});

test("selecting everything is the true maximum", () => {
  const maxOf = (g: readonly { price: number }[]) =>
    Math.max(...g.map((o) => o.price));
  const sumAll = (g: readonly { price: number }[]) =>
    g.reduce((a, o) => a + o.price, 0);
  const ceiling =
    pricing.base +
    maxOf(pricing.websiteTypes) +
    maxOf(pricing.pages) +
    sumAll(pricing.features) +
    maxOf(pricing.design) +
    sumAll(pricing.additionalServices);

  const { total } = calculateEstimate({
    websiteType: "web-app",
    pages: "10",
    features: pricing.features.map((f) => f.id),
    design: "custom",
    additionalServices: pricing.additionalServices.map((s) => s.id),
  });
  assert.equal(total, ceiling);
});

test("formatKSh uses the configured currency and groups thousands", () => {
  assert.equal(formatKSh(15000), "KSh 15,000");
  assert.equal(formatKSh(0), "KSh 0");
  assert.equal(formatKSh(1250000), "KSh 1,250,000");
});

test("describeSelection covers every group the user picked", () => {
  const lines = describeSelection({
    websiteType: "business",
    pages: "3",
    features: ["blog", "search"],
    design: "template",
    additionalServices: ["domain"],
  });
  assert.equal(lines.length, 5);
  assert.ok(lines.some((l) => l.startsWith("Website type:")));
  assert.ok(lines.some((l) => l.startsWith("Pages:")));
  assert.ok(lines.some((l) => l.startsWith("Design:")));
  assert.ok(lines.some((l) => l.includes("Blog") && l.includes("Search")));
  assert.ok(lines.some((l) => l.includes("Domain setup")));
});

test("describeSelection omits groups that were never selected", () => {
  const lines = describeSelection(empty);
  assert.deepEqual(lines, []);
});

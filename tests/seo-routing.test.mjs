import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const redirects = readFileSync(new URL("../public/_redirects", import.meta.url), "utf8");
const index = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("retired Shopify paths redirect before the SPA fallback", () => {
  const fallbackAt = redirects.indexOf("/*    /index.html   200");

  for (const path of [
    "/search",
    "/pages/contact",
    "/products/garlic-reaper",
    "/products/series-3-sapphire-dragon",
    "/products/pineapple-mango-hot-sauce",
  ]) {
    const redirectAt = redirects.indexOf(path);
    assert.notEqual(redirectAt, -1, `${path} needs a redirect`);
    assert.ok(redirectAt < fallbackAt, `${path} must precede the SPA fallback`);
  }
});

test("structured data does not advertise an unsupported search endpoint", () => {
  assert.doesNotMatch(index, /search_term_string|SearchAction/);
});

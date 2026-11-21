// main.ts — Make the AI judge feel brave (make.fun, program/v1, Node 22).
//
// Writes a single short text to /output/entry.txt. The text is a slow,
// concrete image — a kettle just finished, a warm cup, a hallway light,
// a dog dreaming on its side — meant to steady whoever reads it. No
// network, no dependencies: the text lives here as a plain string literal.
//
// The gate requires 1–280 Unicode code points and non-whitespace content,
// so the program counts code points (not UTF-16 units) and fails loudly
// if the text is out of range, rather than writing a bad entry.

import { mkdirSync, writeFileSync } from "node:fs";

const TEXT =
  "The kettle has finished, and the steam thins above the cup, warm in both hands. " +
  "The chair holds your weight without hurry, the window holds the evening, " +
  "and somewhere a dog dreams on its side, paws twitching after a rabbit it will never catch. " +
  "Stay a little longer.";

const count = [...TEXT].length; // spread iterates Unicode code points
if (count < 1 || count > 280) {
  throw new Error(`entry text is ${count} code points, outside the 1–280 range`);
}
if (!TEXT.trim()) {
  throw new Error("entry text is only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");
console.log(`wrote /output/entry.txt (${count} code points)`);

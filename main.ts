// One-line review of the most boring everyday object: a rubber band.
// Writes the review to $MAKEFUN_OUTPUT_DIR/entry.txt (single line, <=200 chars).
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "The rubber band spent years drying out in a drawer, saving its one snap for the day I actually needed it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

if (REVIEW.length < 1 || REVIEW.length > 200) {
  throw new Error(`review must be 1-200 characters, got ${REVIEW.length}`);
}
if (REVIEW.includes("\n") || REVIEW.includes("\r")) {
  throw new Error("review must be a single line");
}
if (REVIEW.trim().length === 0) {
  throw new Error("review must not be only whitespace");
}
if (REVIEW !== REVIEW.trim()) {
  throw new Error("review must not have leading or trailing whitespace");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, REVIEW, "utf8");

// Round-trip check: what we read back must be exactly what we wrote.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== REVIEW) {
  throw new Error("round-trip mismatch: entry.txt differs from review");
}
console.log(`Wrote ${outPath} (${REVIEW.length} characters)`);

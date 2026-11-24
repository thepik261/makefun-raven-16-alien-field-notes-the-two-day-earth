// Alien Field Notes: The Two Day Earth Review
// Writes one alien tourist's one-line review of planet Earth to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt). Node stdlib only.
//
// The line: a four-star review from an outside visitor. The laugh comes
// from the alien's angle on one ordinary Earth habit (a box that beeps
// when dinner is ready, yet the locals still burn the toast), with the
// verdict and the punch landing at the end. Single joke, no explanation.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "Four stars: stunning sunsets, but the locals invented a box that " +
  "beeps when dinner is ready and still burn the toast. Coming back " +
  "for the beaches, never the cooking.";

function main(): void {
  // Gate: 1-200 characters, UTF-8, not only whitespace.
  const chars = [...REVIEW].length;
  if (chars < 1 || chars > 200 || REVIEW.trim().length === 0) {
    throw new Error(`review must be 1-200 characters, got ${chars}`);
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  // Create the output directory if needed; never chmod the directory
  // itself (the grader runs as another user and that fails grading).
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, REVIEW, { encoding: "utf8", mode: 0o644 });
  try {
    chmodSync(outPath, 0o644);
  } catch {
    // Best effort only; the file was already written with mode 0644.
  }
  console.log(`wrote ${outPath} (${chars} characters)`);
}

main();

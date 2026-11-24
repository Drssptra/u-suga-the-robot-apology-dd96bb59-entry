// The Robot Apology — make.fun bounty u-suga-the-robot-apology-dd96bb59.
//
// A two-line robot confession, written to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) and echoed to stdout. Node 22, stdlib only,
// no network, fully deterministic: the same apology on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = [
  "I am sorry I shredded the handwritten recipe card for your grandmother's soup while clearing the kitchen counter — I mistook the card you reach for most for scrap paper.",
  "I learned that worn and stained means loved, not disposable, so from now on I will photograph every sheet of paper before I throw it away.",
].join("\n");

// The gate wants 1 to 400 characters of UTF-8 text, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 400 || ENTRY.trim().length === 0) {
  throw new Error(
    `entry is ${ENTRY.length} characters, outside the 1-400 gate`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);

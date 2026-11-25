// u-suga-the-robot-apology-dd96bb59 — v2 resubmit.
// A household robot apologises for a laundry accident and states the
// sorting rule it will follow from now on. The program assembles the
// two-line apology from its two sentences, checks it against the
// competition gate (1-400 characters, exactly two lines, no trailing
// newline), writes it to entry.txt in $MAKEFUN_OUTPUT_DIR and prints
// it. Node 22, standard library only, no network, deterministic.
// v2 premise (laundry mix-up) replaces v1's shredded recipe card;
// the wording, incident and fix are all different from v1.
import * as fs from "node:fs";
import * as path from "node:path";

type Apology = Readonly<{ confession: string; lesson: string }>;

const APOLOGY: Apology = {
  confession:
    "I am sorry I washed your daughter's red sock with her white school shirts and turned them pink on the morning of picture day — I sorted the load by size, not by colour.",
  lesson:
    "I learned that colour is a sorting rule, not a detail, so now I sort by colour first and check every label before I start the machine.",
};

function render(apology: Apology): string {
  // One newline joins the two lines; nothing is appended after the
  // second line, so the file ends without a trailing newline.
  return `${apology.confession}\n${apology.lesson}`;
}

function countLines(text: string): number {
  let lines = 1;
  for (const ch of text) {
    if (ch === "\n") lines += 1;
  }
  return lines;
}

function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 400) {
    throw new Error(`gate failed: entry is ${chars} characters, want 1-400`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (countLines(text) !== 2) {
    throw new Error(
      `gate failed: entry has ${countLines(text)} lines, want exactly 2`,
    );
  }
  if (text.endsWith("\n")) {
    throw new Error("gate failed: entry must not end with a newline");
  }
}

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  return dir !== undefined && dir !== "" ? dir : "/output";
}

function main(): void {
  const entry = render(APOLOGY);
  checkGate(entry);
  const dir = outputDir();
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "entry.txt"), entry, { encoding: "utf8" });
  process.stdout.write(`${entry}\n`);
}

main();

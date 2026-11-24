// news-image-20261124 — make.fun program/v1 entry.
//
// The competition asks for one image summing up the world news of
// Tuesday 24 November 2026. That image is a newspaper front page:
// a masthead and date line, one lead story, two stories in a second
// row, four smaller stories, and a "day in brief" strip — seven
// pictured stories from one day, plus the briefs.
//
// The pictures are AI-generated photorealistic news-style photos
// (no recognisable faces of real people); every word on the page
// was typeset by code in build/page.html and rendered to exactly
// 1024 x 1024. The finished image lives in this repository as
// entry.png, and this program is deliberately small: it hands the
// grader an exact copy of that image and nothing else.
//
// Pure Node 22 standard library. No network, no randomness, no
// timestamps, nothing read from outside this repository, exactly
// one file written — so two runs produce identical bytes.
//
// The copy is checked, not trusted: before writing, the program
// reads the PNG header and confirms the image really is at most
// 1024 x 1024, the size the gate accepts; after writing, it reads
// the copy back and compares its length and its sha256 digest with
// the original, failing loudly on any mismatch instead of handing
// the grader a broken, oversized, or partial file.

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The directory holding this file is the repository root, so the
// source image is always found next to the program, wherever the
// repository is checked out.
const ROOT = dirname(fileURLToPath(import.meta.url));
const IMAGE = "entry.png";

// The competition gate: the image must be at most 1024 x 1024.
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

// Where the copy goes, in priority order: a path passed as the
// first command-line argument, the directory the grader asks for
// through MAKEFUN_OUTPUT_DIR, otherwise the conventional /output.
// An empty string counts as unset in both cases.
function outputDir(): string {
  const arg = (process.argv[2] ?? "").trim();
  if (arg !== "") return arg;
  const env = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim();
  if (env !== "") return env;
  return "/output";
}

// sha256 of a buffer, as a lowercase hex string.
function digest(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

function main(): void {
  const from = join(ROOT, IMAGE);
  const dir = outputDir();
  const to = join(dir, IMAGE);

  mkdirSync(dir, { recursive: true });

  const bytes = readFileSync(from);

  // The gate only accepts a whole PNG or JPEG; a truncated or
  // wrong-format file must never reach the grader, so check the
  // PNG signature up front as well as the copy below.
  const PNG_SIGNATURE = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error(`entry.png is not a PNG file: ${from}`);
  }

  // Read the IHDR chunk and confirm the picture fits the gate:
  // after the 8-byte signature, the first chunk must be IHDR,
  // whose data starts with width and height as big-endian
  // 32-bit integers. An image larger than 1024 x 1024 is
  // rejected here, before any copy is written, rather than
  // failing later at the grader.
  const IHDR_OFFSET = 8;
  const IHDR_LENGTH = 13;
  const IHDR_TYPE = "IHDR";
  if (bytes.length < IHDR_OFFSET + 8 + IHDR_LENGTH) {
    throw new Error(`entry.png is too short to hold an IHDR chunk: ${from}`);
  }
  if (bytes.readUInt32BE(IHDR_OFFSET) !== IHDR_LENGTH) {
    throw new Error(`entry.png has no IHDR chunk where expected: ${from}`);
  }
  if (bytes.subarray(IHDR_OFFSET + 4, IHDR_OFFSET + 8).toString("ascii") !== IHDR_TYPE) {
    throw new Error(`entry.png first chunk is not IHDR: ${from}`);
  }
  const width = bytes.readUInt32BE(IHDR_OFFSET + 8);
  const height = bytes.readUInt32BE(IHDR_OFFSET + 12);
  if (width === 0 || height === 0) {
    throw new Error(`entry.png has a zero dimension: ${width} x ${height}`);
  }
  if (width > MAX_WIDTH || height > MAX_HEIGHT) {
    throw new Error(
      `entry.png is ${width} x ${height}, over the ${MAX_WIDTH} x ${MAX_HEIGHT} gate`,
    );
  }

  writeFileSync(to, bytes);

  // Prove the copy is exact before exiting successfully.
  if (!existsSync(to)) {
    throw new Error(`output missing after write: ${to}`);
  }
  const want = statSync(from).size;
  const got = statSync(to).size;
  if (got !== want) {
    throw new Error(`entry.png copy is ${got} bytes, expected ${want}`);
  }
  const wantHash = digest(bytes);
  const gotHash = digest(readFileSync(to));
  if (gotHash !== wantHash) {
    throw new Error(
      `entry.png copy hash mismatch: got ${gotHash}, expected ${wantHash}`,
    );
  }

  // A one-line receipt on stderr so a human running the program by
  // hand can see it worked; stdout stays clean and the file bytes
  // are unaffected either way.
  console.error(
    `wrote ${to} (${width} x ${height}, ${got} bytes, sha256 ${gotHash})`,
  );
}

main();

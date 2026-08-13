/* Keeps the source tree pure ASCII.
   Non-ASCII literals silently corrupt if a file ever goes through a PowerShell
   Get-Content | Set-Content round-trip, so any character above 0x7F is rewritten
   as a \uXXXX escape (JS) or an HTML entity, and CSS comment art is flattened.
   Run: node ascii-guard.js [--check] */
const fs = require("fs");
const path = require("path");

const checkOnly = process.argv.includes("--check");
const files = ["app.js", "app.css", "index.html", "sw.js", "manifest.webmanifest"];
let failed = false;

for (const f of files) {
  const p = path.join(__dirname, f);
  let s = fs.readFileSync(p, "utf8");
  const offenders = [...s].filter(ch => ch.charCodeAt(0) > 126);
  if (!offenders.length) continue;

  if (checkOnly) {
    const uniq = [...new Set(offenders)].map(c => JSON.stringify(c) + " U+" + c.charCodeAt(0).toString(16).toUpperCase());
    console.error(f + ": " + offenders.length + " non-ASCII chars -> " + uniq.join(", "));
    failed = true;
    continue;
  }

  const before = offenders.length;
  if (f.endsWith(".js")) {
    // \uXXXX is valid inside JS string literals and in comments reads fine.
    s = s.replace(/[^\x00-\x7E]/g, ch =>
      "\\u" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0"));
  } else if (f.endsWith(".css")) {
    // Comment banners only; flatten to a plain rule.
    s = s.replace(/[^\x00-\x7E]/g, "=");
  } else {
    s = s.replace(/[^\x00-\x7E]/g, ch => "&#" + ch.charCodeAt(0) + ";");
  }
  fs.writeFileSync(p, s, "utf8");
  console.log(f + ": rewrote " + before + " non-ASCII chars");
}

if (checkOnly && failed) process.exit(1);
if (checkOnly) console.log("all source files are pure ASCII");

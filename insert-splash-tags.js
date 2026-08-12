/* Injects the generated apple-touch-startup-image tags into index.html.
   Re-runnable: the block is delimited and replaced wholesale each time.
   Run after make-splash.ps1. */
const fs = require("fs");
const path = require("path");

const dir = __dirname;
let html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const tags = fs.readFileSync(path.join(dir, "splash-tags.html"), "utf8")
  .trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);

const OPEN = "<!-- launch images: iOS shows one only when a media query matches exactly -->";
const CLOSE = "<!-- /launch images -->";
const ANCHOR = '<link rel="stylesheet" href="app.css">';

// Remove any previous block so re-runs don't stack.
const existing = new RegExp("\\n?" + OPEN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
                            "[\\s\\S]*?" + CLOSE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
html = html.replace(existing, "");

if (!html.includes(ANCHOR)) throw new Error("could not find the app.css link to anchor to");

const block = OPEN + "\n" + tags.join("\n") + "\n" + CLOSE + "\n";
html = html.replace(ANCHOR, () => block + ANCHOR);

fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
const count = (html.match(/apple-touch-startup-image/g) || []).length;
console.log("inserted " + tags.length + " tags; file now has " + count);
if (count !== tags.length) throw new Error("tag count mismatch - duplicate block?");

/* Generates the single-file artifact version from index.html.
   The Artifact host supplies its own <head>, so we hand it the <title> plus
   everything inside <body>. One source of truth: edit index.html only. */
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

const title = (src.match(/<title>([\s\S]*?)<\/title>/) || [, "Family Chore Schedule"])[1];
const body = (src.match(/<body[^>]*>([\s\S]*)<\/body>/) || [])[1];
if (!body) throw new Error("Could not find <body> in index.html");

const out =
  "<title>" + title + "</title>\n" +
  body.trim() + "\n";

const dest = process.argv[2];
if (!dest) throw new Error("Usage: node build-artifact.js <output.html>");
fs.writeFileSync(dest, out, "utf8");
console.log("wrote " + dest + " (" + out.length + " bytes)");

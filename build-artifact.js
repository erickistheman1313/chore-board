/* Generates the single-file artifact version from index.html.
   The Artifact host supplies its own <head>, so we hand it the <title> plus
   everything inside <body>, with app.css and app.js inlined.
   One source of truth: edit index.html / app.css / app.js only. */
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const src = fs.readFileSync(path.join(dir, "index.html"), "utf8");

const title = (src.match(/<title>([\s\S]*?)<\/title>/) || [, "Family Chore Schedule"])[1];
let body = (src.match(/<body[^>]*>([\s\S]*)<\/body>/) || [])[1];
if (!body) throw new Error("Could not find <body> in index.html");

// Inline every local stylesheet and script the body references.
const css = fs.readFileSync(path.join(dir, "app.css"), "utf8");
const js = fs.readFileSync(path.join(dir, "app.js"), "utf8");

// Replace via a function: a plain string would let $& / $' / $1 in the source
// be interpreted as replacement patterns and silently corrupt the output.
body = body.replace(/<script src="app\.js"><\/script>/, () => "<script>\n" + js + "\n</script>");
if (body.includes('src="app.js"')) throw new Error("app.js script tag was not replaced");
if (!body.includes(js)) throw new Error("inlined script does not match app.js byte-for-byte");

const out =
  "<title>" + title + "</title>\n" +
  "<style>\n" + css + "\n</style>\n" +
  body.trim() + "\n";

if (/<link[^>]+app\.css/.test(out)) throw new Error("app.css link leaked into output");

const dest = process.argv[2];
if (!dest) throw new Error("Usage: node build-artifact.js <output.html>");
fs.writeFileSync(dest, out, "utf8");
console.log("wrote " + dest + " (" + out.length + " bytes)");

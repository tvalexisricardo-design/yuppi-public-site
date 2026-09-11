import fs from "node:fs/promises";
import path from "node:path";

const sourceFile = process.argv[2] || path.join(process.cwd(), "scripts", "sources.txt");
const outputFile = process.argv[3] || path.join(process.cwd(), "data", "scrape-candidates.json");

function stripHtml(value = "") { return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
function decode(value = "") { return value.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">"); }
function firstMatch(html, regex) { const m = html.match(regex); return m?.[1] ? decode(m[1].trim()) : ""; }

const raw = await fs.readFile(sourceFile, "utf8");
const urls = raw.split(/\r?\n/).map(x => x.trim()).filter(x => x && !x.startsWith("#"));
const candidates = [];
for (const url of urls) {
  try {
    const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "YuppiDirectoryBot/1.0 (+https://www.yuppi.pt)" } });
    const html = await response.text();
    const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) || firstMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
    const image = firstMatch(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["'][^>]*>/i) || firstMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:image["'][^>]*>/i);
    candidates.push({ url, nome: stripHtml(title).replace(/\s+[|–—-]\s+.*$/, ""), descricao: stripHtml(description), imagem: image, fetchedAt: new Date().toISOString(), status: response.ok ? "ok" : `http-${response.status}` });
    console.log(`${response.ok ? "OK" : response.status} ${url}`);
  } catch (error) {
    candidates.push({ url, nome: "", descricao: "", imagem: "", fetchedAt: new Date().toISOString(), status: "erro" });
    console.error(`ERRO ${url}: ${error.message}`);
  }
}
await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, JSON.stringify(candidates, null, 2));
console.log(`\nGuardados ${candidates.length} candidatos em ${outputFile}`);

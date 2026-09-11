import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const base = process.cwd();
const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Define SUPABASE_URL e SUPABASE_SECRET_KEY antes de correr este script.");

function slugify(value){return value.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}
function list(data, a,b){ if(Array.isArray(data[a])) return data[a]; if(typeof data[b]==="string"&&data[b].trim()) return [data[b].trim()]; return []; }
const dir = path.join(base,"content","profissionais");
const files = (await fs.readdir(dir)).filter(x=>x.endsWith(".md"));
const rows=[];
for(const file of files){const raw=await fs.readFile(path.join(dir,file),"utf8"); const {data,content}=matter(raw); const nome=String(data.nome||file.replace(/\.md$/,"")); rows.push({slug:file.replace(/\.md$/,"" )||slugify(nome),nome,categorias:list(data,"categorias","categoria"),localidades:list(data,"localidades","cidade"),preco_desde:String(data.precoDesde||""),resumo:String(data.resumo||""),content_html:await marked.parse(content),cover_image:data.coverImage||null,foto_fonte:data.fotoFonte||null,fotos:Array.isArray(data.fotos)?data.fotos:[],website:data.website||null,instagram:data.instagram||null,facebook:data.facebook||null,whatsapp:data.whatsapp||null,fonte:data.fonte||null,tipo_perfil:data.tipoPerfil||"diretorio",status:data.status||"published"});}
const res=await fetch(`${url}/rest/v1/professionals?on_conflict=slug`,{method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(rows)});
if(!res.ok) throw new Error(await res.text());
console.log(`Importados/atualizados ${rows.length} perfis.`);

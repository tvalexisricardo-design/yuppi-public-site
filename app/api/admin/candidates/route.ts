import { NextResponse } from "next/server";
import { createCandidate, listCandidates } from "@/lib/adminDb";
export async function GET() { try { return NextResponse.json(await listCandidates()); } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Erro" }, { status: 503 }); } }
export async function POST(req: Request) { try { return NextResponse.json(await createCandidate(await req.json()), { status: 201 }); } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Erro" }, { status: 503 }); } }

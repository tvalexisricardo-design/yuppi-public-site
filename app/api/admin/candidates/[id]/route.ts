import { NextResponse } from "next/server";
import { updateCandidate } from "@/lib/adminDb";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) { try { const { id } = await params; return NextResponse.json(await updateCandidate(id, await req.json())); } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Erro" }, { status: 503 }); } }

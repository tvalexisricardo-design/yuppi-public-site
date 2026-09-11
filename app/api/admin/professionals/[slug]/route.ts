import { NextResponse } from "next/server";
import { AdminInputError, deleteProfile, updateProfile } from "@/lib/adminDb";
export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try { const { slug } = await params; return NextResponse.json(await updateProfile(slug, await req.json())); }
  catch (e) {
    if (e instanceof AdminInputError) return NextResponse.json({ error: e.message }, { status: 400 });
    if (e instanceof Error && e.message === "Profissional não encontrado.") return NextResponse.json({ error: e.message }, { status: 404 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro" }, { status: 503 });
  }
}
export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) { try { const { slug } = await params; await deleteProfile(slug); return new NextResponse(null, { status: 204 }); } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Erro" }, { status: 503 }); } }

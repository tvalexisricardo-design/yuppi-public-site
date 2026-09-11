import { NextResponse } from "next/server";
import { AdminInputError, createProfile, listAdminProfiles } from "@/lib/adminDb";

export async function GET() {
  try { return NextResponse.json(await listAdminProfiles()); }
  catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Erro" }, { status: 503 }); }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json(await createProfile(body), { status: 201 });
  } catch (e) {
    if (e instanceof AdminInputError) return NextResponse.json({ error: e.message }, { status: 400 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro" }, { status: 503 });
  }
}

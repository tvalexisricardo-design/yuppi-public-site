import dns from "node:dns/promises";

export async function GET() {
  const url = "https://jrkwcagcsfkrromwnzay.supabase.co";
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url) {
    return Response.json({
      ok: false,
      step: "environment",
      error: "SUPABASE_URL não está definida",
    });
  }

  if (!key) {
    return Response.json({
      ok: false,
      step: "environment",
      error: "SUPABASE_SECRET_KEY não está definida",
    });
  }

  let hostname = "";

  try {
    hostname = new URL(url).hostname;
  } catch {
    return Response.json({
      ok: false,
      step: "url",
      error: "SUPABASE_URL não é um URL válido",
    });
  }

  const result: Record<string, unknown> = {
    ok: false,
    urlConfigured: true,
    hostname,
    dns: null,
    fetch: null,
  };

  try {
    const dnsResult = await dns.lookup(hostname);
    result.dns = {
      ok: true,
      address: dnsResult.address,
      family: dnsResult.family,
    };
  } catch (error: any) {
    result.dns = {
      ok: false,
      code: error?.code ?? null,
      message: error?.message ?? "DNS lookup failed",
    };

    return Response.json(result, { status: 500 });
  }

  try {
    const response = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/professionals?select=slug&limit=1`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: "no-store",
      }
    );

    result.fetch = {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
    };

    if (response.ok) {
      result.ok = true;
    }
  } catch (error: any) {
    result.fetch = {
      ok: false,
      name: error?.name ?? null,
      code: error?.code ?? null,
      message: error?.message ?? "Fetch failed",
      cause: error?.cause
        ? {
            name: error.cause.name ?? null,
            code: error.cause.code ?? null,
            message: error.cause.message ?? null,
            syscall: error.cause.syscall ?? null,
            hostname: error.cause.hostname ?? null,
          }
        : null,
    };
  }

  return Response.json(result, {
    status: result.ok ? 200 : 500,
  });
}
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Acesso administrativo não configurado.", { status: 503 });
  }

  if (basicAuth) {
    const [scheme, encoded] = basicAuth.split(" ");
    if (scheme?.toLowerCase() === "basic" && encoded) {
      try {
        const decoded = atob(encoded);
        const separator = decoded.indexOf(":");
        const user = separator >= 0 ? decoded.slice(0, separator) : "";
        const password = separator >= 0 ? decoded.slice(separator + 1) : "";
        if (user === expectedUser && password === expectedPassword) return NextResponse.next();
      } catch {}
    }
  }

  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Yuppi Admin"' },
  });
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

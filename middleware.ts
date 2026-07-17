import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");

  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  // If credentials aren't configured, fail closed (block access) rather than
  // leaving the admin area open — better to notice this in setup than in prod.
  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Acesso administrativo não configurado.", { status: 503 });
  }

  if (basicAuth) {
    const [, encoded] = basicAuth.split(" ");
    const decoded = atob(encoded);
    const [user, password] = decoded.split(":");

    if (user === expectedUser && password === expectedPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Yuppi Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};

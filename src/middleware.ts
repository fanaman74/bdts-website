import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Strip non-standard port from URL — Railway proxy runs Next.js on :8080
  // but external requests come in on :443. Without stripping, next-intl
  // generates redirect Location headers with :8080 which breaks navigation.
  const url = request.nextUrl.clone();
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? url.host;

  // Rebuild request with the correct public URL (no port)
  const publicHost = host.split(":")[0]; // strip any port from host header
  url.protocol = proto + ":";
  url.host = publicHost;
  url.port = "";

  const patched = new NextRequest(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });

  return intlMiddleware(patched);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

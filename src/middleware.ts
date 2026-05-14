import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Railway proxy: Next.js runs on internal port :8080 but external traffic
  // arrives on :443. next-intl puts :8080 in Location redirect headers.
  // Strip the port so browser redirects work correctly.
  const location = response.headers.get("location");
  if (location) {
    const cleaned = location.replace(/:8080(?=\/|$)/, "");
    if (cleaned !== location) {
      response.headers.set("location", cleaned);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

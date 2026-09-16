import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0].toLowerCase();

  const rootDomain = (
    process.env.ROOT_DOMAIN ||
    process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
    "inxyme.com"
  ).toLowerCase();

  // Check if current hostname is the root domain, www, bare IP, or plain localhost
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const isRootOrApex =
    ipRegex.test(hostname) ||
    hostname === rootDomain ||
    hostname === `www.${rootDomain}` ||
    hostname === "localhost" ||
    hostname === "127.0.0.1";

  if (isRootOrApex) {
    // Normal / Root domain should NOT serve any landing page.
    // Allow request through so app/page.tsx or not-found can render 404.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-is-root-domain", "1");
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Check if host is a valid subdomain (*.inxyme.com, *.localhost, *.local)
  const isSubdomain =
    hostname.endsWith(`.${rootDomain}`) ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local");

  if (!isSubdomain) {
    return NextResponse.next();
  }

  // Extract subdomain part
  let suffix = `.${rootDomain}`;
  if (hostname.endsWith(".localhost")) {
    suffix = ".localhost";
  } else if (hostname.endsWith(".local")) {
    suffix = ".local";
  }

  const subdomain = hostname.replace(suffix, "").split(".").pop() || "";

  if (!subdomain) {
    return NextResponse.next();
  }

  // Rewrite request to dynamic subdomain route with custom header
  const url = request.nextUrl.clone();
  const rawPathname = url.pathname === "/" ? "" : url.pathname;
  url.pathname = `/${subdomain}${rawPathname}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-subdomain", subdomain);
  requestHeaders.set("x-is-subdomain", "1");

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|\\.well-known|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)",
  ],
};

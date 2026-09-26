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

  const url = request.nextUrl.clone();

  // Shared policy, contact, and informational routes accessible on all subdomains and root
  const sharedRoutes = [
    "/about-us",
    "/about",
    "/privacy-policy",
    "/terms-conditions",
    "/terms-of-service",
    "/disclaimer",
    "/contact-us",
    "/contact",
  ];

  const isSharedRoute = sharedRoutes.some(
    (route) => url.pathname === route || url.pathname.startsWith(`${route}/`)
  );

  // Normalize legacy or alternate policy paths
  if (url.pathname === "/about") {
    url.pathname = "/about-us";
    return NextResponse.redirect(url);
  }
  if (url.pathname === "/contact") {
    url.pathname = "/contact-us";
    return NextResponse.redirect(url);
  }
  if (url.pathname === "/terms-of-service") {
    url.pathname = "/terms-conditions";
    return NextResponse.redirect(url);
  }

  if (isSharedRoute) {
    // Deliver shared policy pages directly without subdomain prefix
    return NextResponse.next();
  }

  if (isRootOrApex) {
    // Normal / Root domain serves the main Inxyme Homepage (app/page.tsx)
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
  const rewriteUrl = request.nextUrl.clone();
  const rawPathname = rewriteUrl.pathname === "/" ? "" : rewriteUrl.pathname;
  rewriteUrl.pathname = `/${subdomain}${rawPathname}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-subdomain", subdomain);
  requestHeaders.set("x-is-subdomain", "1");

  return NextResponse.rewrite(rewriteUrl, {
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

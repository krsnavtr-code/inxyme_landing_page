import { notFound } from "next/navigation";

/**
 * Root domain page - This project is designed strictly for subdomains.
 * Root domain (e.g. inxyme.com, www.inxyme.com, localhost)
 * does NOT serve any landing page and immediately returns 404.
 */
export default function RootPage() {
  notFound();
}

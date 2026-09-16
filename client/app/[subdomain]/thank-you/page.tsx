import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getSubdomainModule,
  getAllSubdomainSlugs,
} from "@/subdomains";

interface PageProps {
  params: Promise<{ subdomain: string }>;
}

/**
 * Pre-render all dedicated static subdomain thank-you pages at build time
 */
export async function generateStaticParams() {
  const slugs = getAllSubdomainSlugs();
  return slugs.map((subdomain) => ({
    subdomain,
  }));
}

/**
 * SEO metadata for Thank You pages
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainModule = getSubdomainModule(subdomain);

  if (!subdomainModule) {
    return {
      title: "Page Not Found | Inxyme",
      description: "The requested page does not exist.",
    };
  }

  const programTitle =
    subdomainModule.metadata.title?.toString() || "Online Program";

  return {
    title: `Thank You | ${programTitle}`,
    description:
      "Thank you for your admission enquiry. Our senior education counselor will contact you shortly.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Renders the dedicated Thank You page component for each subdomain
 */
export default async function ThankYouPage({ params }: PageProps) {
  const { subdomain } = await params;
  const subdomainModule = getSubdomainModule(subdomain);

  if (!subdomainModule) {
    notFound();
  }

  const { ThankYouComponent } = subdomainModule;

  return <ThankYouComponent subdomain={subdomain} />;
}

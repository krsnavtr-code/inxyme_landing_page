import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getSubdomainModule, getAllSubdomainSlugs } from "@/subdomains";

interface PageProps {
  params: Promise<{ subdomain: string }>;
}

/**
 * Pre-render all dedicated static subdomain pages at build time
 */
export async function generateStaticParams() {
  const slugs = getAllSubdomainSlugs();
  return slugs.map((subdomain) => ({
    subdomain,
  }));
}

/**
 * Static SEO metadata from the dedicated subdomain metadata file
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainModule = getSubdomainModule(subdomain);

  if (!subdomainModule) {
    return {
      title: "Page Not Found | Inxyme",
      description: "The requested subdomain page does not exist.",
    };
  }

  return subdomainModule.metadata;
}

/**
 * Renders the dedicated full-page component for each subdomain
 */
export default async function SubdomainLandingPage({ params }: PageProps) {
  const { subdomain } = await params;
  const subdomainModule = getSubdomainModule(subdomain);

  if (!subdomainModule) {
    notFound();
  }

  const { Component } = subdomainModule;

  return <Component subdomain={subdomain} />;
}

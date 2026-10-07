import { Metadata } from "next";
import SapWebinarPage from "@/subdomains/sap-webinar/page";
import { metadata as sapWebinarMetadata } from "@/subdomains/sap-webinar/metadata";

export const metadata: Metadata = sapWebinarMetadata;

export default function SapWebinarRoutePage() {
  return <SapWebinarPage subdomain="sap-webinar" />;
}

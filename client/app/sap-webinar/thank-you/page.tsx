import { Metadata } from "next";
import SapWebinarThankYou from "@/subdomains/sap-webinar/thank-you";

export const metadata: Metadata = {
  title: "Registration Confirmed | Inxyme SAP Webinar",
  description: "Your ₹9 slot for the Inxyme Live SAP Career Webinar is confirmed.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SapWebinarThankYouRoutePage() {
  return <SapWebinarThankYou subdomain="sap-webinar" />;
}

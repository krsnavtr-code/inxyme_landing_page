import { SubdomainModule } from "./types";

import SapPage from "./sap/page";
import SapThankYou from "./sap/thank-you";
import { metadata as sapMetadata } from "./sap/metadata";

import DataSciencePage from "./data-science/page";
import DataScienceThankYou from "./data-science/thank-you";
import { metadata as dataScienceMetadata } from "./data-science/metadata";

import FdePage from "./fde/page";
import FdeThankYou from "./fde/thank-you";
import { metadata as fdeMetadata } from "./fde/metadata";

import AiMlPage from "./ai-ml/page";
import AiMlThankYou from "./ai-ml/thank-you";
import { metadata as aiMlMetadata } from "./ai-ml/metadata";

export const SUBDOMAIN_REGISTRY: Record<string, SubdomainModule> = {
  sap: {
    Component: SapPage,
    ThankYouComponent: SapThankYou,
    metadata: sapMetadata,
  },
  "data-science": {
    Component: DataSciencePage,
    ThankYouComponent: DataScienceThankYou,
    metadata: dataScienceMetadata,
  },
  fde: {
    Component: FdePage,
    ThankYouComponent: FdeThankYou,
    metadata: fdeMetadata,
  },
  "ai-ml": {
    Component: AiMlPage,
    ThankYouComponent: AiMlThankYou,
    metadata: aiMlMetadata,
  },
};

export function getSubdomainModule(subdomain: string): SubdomainModule | null {
  const normalized = (subdomain || "").toLowerCase().trim();
  return SUBDOMAIN_REGISTRY[normalized] || null;
}

export function getAllSubdomainSlugs(): string[] {
  return Object.keys(SUBDOMAIN_REGISTRY);
}

export function isValidSubdomain(subdomain: string): boolean {
  const normalized = (subdomain || "").toLowerCase().trim();
  return Boolean(SUBDOMAIN_REGISTRY[normalized]);
}

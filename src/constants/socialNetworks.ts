import { urlWhatsapp } from "./urlWhatsapp";
import { buildWhatsappUrl } from "../utils/whatsapp";
import type { ActiveBranchContact } from "../api/branchesApi/branchesApi";

interface SocialNetworks {
  icon: string;
  route: string;
  name: string;
}

const DEFAULT_EMAIL = "administracion@dyranalitica.com";

// Facebook has a single company-wide page, so it never changes with the
// active branch — only WhatsApp and Email are branch-scoped.
const FACEBOOK_NETWORK: SocialNetworks = {
  route:
    "https://www.facebook.com/people/Diagn%C3%B3stico-y-Referencia-Analitica/61571122002782/",
  icon: "logos:facebook",
  name: "Facebook",
};

export const buildSocialNetworks = (
  contact?: ActiveBranchContact | null,
): SocialNetworks[] => [
  FACEBOOK_NETWORK,
  {
    route: contact?.phone ? buildWhatsappUrl(contact.phone) : urlWhatsapp,
    icon: "logos:whatsapp-icon",
    name: "WhatsApp",
  },
  {
    route: `mailto:${contact?.email || DEFAULT_EMAIL}`,
    icon: "logos:google-gmail",
    name: "Gmail",
  },
];

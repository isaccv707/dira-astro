interface SocialNetworks {
  icon: string;
  route: string;
  name: string;
}

export const SOCIAL_NETWORKS: SocialNetworks[] = [
  {
    route:
      "https://www.facebook.com/people/Diagn%C3%B3stico-y-Referencia-Analitica/61571122002782/",
    icon: "logos:facebook",
    name: "Facebook",
  },
  // { route: "#", icon: "skill-icons:instagram", name: "Instagram" },
  {
    route: "https://wa.me/3332559229",
    icon: "logos:whatsapp-icon",
    name: "WhatsApp",
  },
  {
    route: "mailto:administracion@dyranalitica.com",
    icon: "logos:google-gmail",
    name: "Gmail",
  },
];

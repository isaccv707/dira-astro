import {
  facebook,
  instagram,
  whatsapp,
} from "../assets/icons/networks-icons";

interface SocialNetworks {
    href: string;
    icon: ImageMetadata;
}

export const SOCIAL_NETWORKS:SocialNetworks[]  = [
  {href: "https://www.facebook.com/people/Diagn%C3%B3stico-y-Referencia-Analitica/61571122002782/", icon: facebook},
  {href: "", icon: instagram},
  {href: "https://wa.me/3332559229", icon: whatsapp},
] 
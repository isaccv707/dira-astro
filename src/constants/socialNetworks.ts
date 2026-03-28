import {
  facebook,
  instagram,
  whatsapp,
} from "../assets/icons/networks-icons";

interface SocialNetworks {
    href: string;
    icon: ImageMetadata;
    name: string;
}

export const SOCIAL_NETWORKS:SocialNetworks[]  = [
  {href: "https://www.facebook.com/people/Diagn%C3%B3stico-y-Referencia-Analitica/61571122002782/", icon: facebook, name: "Facebook"},
  {href: "#", icon: instagram, name: "Instagram"},
  {href: "https://wa.me/3332559229", icon: whatsapp, name: "WhatsApp"},
]
 
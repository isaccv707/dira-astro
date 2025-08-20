import { Phone } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { facebook, instagram, whatsapp } from '../../assets/icons'
import { routes } from "../../routes/routes";
import NavLinkButton from "../../components/ui/NavLinkButton";

const Footer = () => {
  return (
    <footer className="bg-green-primary text-white pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">


        <div>
          <img src={logo.src} alt="logo" className="w-28 h-auto mb-4" />
          <p className="text-sm leading-6">
            En Dira, ofrecemos servicios de calidad con un enfoque profesional,
            para garantizar la mejor experiencia a nuestros clientes.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2">
            {routes.map(({ path, text }, index) => (
              <li key={index}>
                <NavLinkButton
                  path={path}
                  text={text}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contáctanos</h4>
          <p className="text-sm mb-2 flex items-center gap-2">
            <Phone size={16} /> +52 123 456 7890
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="p-2 rounded-full w-12 h-auto"
              aria-label="Facebook"
            >
              <img src={facebook.src} alt="icon-facebook" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full w-12 h-auto"
              aria-label="Instagram"
            >
              <img src={instagram.src} alt="icon-instagram" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full w-12 h-auto"
              aria-label="Instagram"
            >
              <img src={whatsapp.src} alt="icon-whatsapp" />
            </a>
          </div>
        </div>

      </div>
      s

      <div className="mt-10 border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Dira. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

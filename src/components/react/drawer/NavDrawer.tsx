
import useDrawerManager from "../../../hooks/useDrawerManager";
import { facebook, instagram, whatsapp } from '../../../assets/icons/networks-icons'
import Drawer from "./Drawer";
import Accordion from "../accordion/Accordion";

interface NavDrawerProps {
  id: string;
  data: any;
  title: string
}
const NavDrawer = ({ data, id, title }: NavDrawerProps) => {
  const { close } = useDrawerManager();
  return (
    <Drawer
      open={true}
      onClose={() => close(id)}
      title="Menu"
    >
      <nav className="mt-10 flex flex-col gap-6">
        <>
          {data.map(({ path, text }: { path: string, text: string }) => (
            <a
              key={path}
              href={path}
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={() => close(id)}
            >
              {text}
            </a>
          ))}
          <Accordion
            items={[{ id: '', title: 'Hola', content: '' }]}
            className={'w-full h-10'}
          />
          <Accordion
            items={[{ id: '', title: 'Hola', content: '' }]}
          />
        </>
      </nav>

      <nav className="mt-10 flex gap-4">
        <a href="#" aria-label="Facebook">
          <img src={facebook.src} alt="Facebook" className="w-8 h-8" />
        </a>
        <a href="#" aria-label="Instagram">
          <img src={instagram.src} alt="Instagram" className="w-8 h-8" />
        </a>
        <a href="#" aria-label="WhatsApp">
          <img src={whatsapp.src} alt="WhatsApp" className="w-8 h-8" />
        </a>
      </nav>
    </Drawer>
  )
}

export default NavDrawer

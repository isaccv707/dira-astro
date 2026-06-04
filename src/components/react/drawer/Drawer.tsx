import { useEffect } from "react";
import { X } from "lucide-react";
import Button from "../buttons/Button";

interface DrawerProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
  title: string;
}

const Drawer = ({
  children,
  onClose,
  onOpen,
  open,
  title,
  id,
}: DrawerProps) => {
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;

    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;
    const prevHtmlOverflow = html.style.overflow;

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
      html.style.overflow = prevHtmlOverflow;
    };
  }, [open]);

  return (
    <div
      id={id}
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="flex-1 bg-black/50 backdrop-blur-sm overflow-hidden" />

      <div
        className={`w-72 max-w-xs bg-white h-full shadow-2xl transform transition-transform duration-300 ease-out 
          ${open ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-green-primary">{title}</h2>
          <Button
            onClick={onClose}
            icon="lucide:x"
            variant={"danger"}
            size={"sm"}
            iconClassName="w-5 h-auto"
          />
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;

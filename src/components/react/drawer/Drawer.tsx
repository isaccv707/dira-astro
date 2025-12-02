import { useEffect } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
  title: string;
}

const Drawer = ({ children, onClose, onOpen, open, title }: DrawerProps) => {

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (open) {
      body.classList.add("locked-scroll");
      root.classList.add("locked-scroll");
    } else {
      body.classList.remove("locked-scroll");
      root.classList.remove("locked-scroll");
    }

    return () => {
      body.classList.remove("locked-scroll");
      root.classList.remove("locked-scroll");
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >

      <div
        className="flex-1 bg-black/50 backdrop-blur-sm overflow-hidden"
        onClick={onClose}
      />

      <div
        className={`w-72 max-w-xs bg-white h-full shadow-2xl transform transition-transform duration-300 ease-out 
          ${open ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full  text-red bg-gray-100 hover:bg-red hover:text-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;

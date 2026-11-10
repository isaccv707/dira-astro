import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
  title: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Side panel as a modal dialog: Escape or the backdrop close it, focus stays inside. */
const Drawer = ({ children, onClose, open, title, id }: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `${id}-title`;

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;
    const prevHtmlOverflow = html.style.overflow;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [
        ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
      html.style.overflow = prevHtmlOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      id={id}
      className={`fixed inset-0 z-50 flex transition-opacity duration-200 motion-reduce:transition-none ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div aria-hidden="true" className="flex-1 bg-black/40" onClick={onClose} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-md transition-transform duration-200 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ui-border bg-white px-4 py-3">
          <h2 id={titleId} className="text-lg font-bold tracking-tight text-ink">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 items-center justify-center rounded-clinical-sm text-ink-muted transition-colors duration-200 hover:bg-ui-bg hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;

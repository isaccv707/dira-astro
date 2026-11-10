import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  id: string;
  onClose: () => void;
  open: boolean;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Centered dialog: Escape or the backdrop close it; focus stays inside. */
const Modal = ({ children, id, title, onClose, open }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
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

  if (!open) return null;

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="relative w-full max-w-3xl rounded-clinical-lg border border-ui-border bg-white p-6 shadow-md sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={`${id}-title`} className="text-xl font-bold tracking-tight text-ink">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-clinical-sm text-ink-muted transition-colors duration-200 hover:bg-ui-bg hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 max-h-[70vh] space-y-4 overflow-y-auto text-ink-muted">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

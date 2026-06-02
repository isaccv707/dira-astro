import React, { useEffect } from "react";
import Button from "../buttons/Button";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  id: string;
  onClose: () => void;
  open: boolean;
}

const Modal = ({ children, id, title, onClose, open }: ModalProps) => {
  if (!open) return null;

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

  if (!open) return null;

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6"
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl">
        <div className="relative bg-neutral-primary-soft shadow-2xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3
              id={`${id}-title`}
              className="text-xl font-semibold text-green-primary"
            >
              {title}
            </h3>

            <Button
              onClick={onClose}
              icon={<X />}
              variant={"danger"}
              size={"sm"}
            />
          </div>

          <div className="mt-4 max-h-[70vh] overflow-y-auto text-body space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

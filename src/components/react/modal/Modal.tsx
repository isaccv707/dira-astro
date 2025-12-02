import React from "react";
import Button from "../ui/Button";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  id: string;
  onClose: () => void;
  open: boolean;
}

const Modal = ({ children, id, title, onClose, open }: ModalProps) => {
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
          <div className="flex items-start justify-between gap-4 border-b border-default pb-4 sm:pb-5">
            <h3
              id={`${id}-title`}
              className="text-xl font-semibold text-green-primary"
            >
              {title}
            </h3>

            <Button onClick={onClose} icon={<X />} />
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

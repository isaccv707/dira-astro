import { useState, type ReactNode } from "react";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";

interface AccordionProps {
  id: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const Accordion = ({
  id,
  title,
  children,
  defaultOpen = false,
  className = "",
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleItem = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={clsx("w-full", className)}>
      <div className="bg-white rounded-clinical-md shadow-xs border border-ui-border overflow-hidden">
        <button
          type="button"
          onClick={toggleItem}
          className={clsx(
            "flex justify-between items-center w-full px-6 py-4 text-left font-semibold text-green-primary transition-colors duration-200",
            isOpen
              ? "bg-green-primary/8 border-l-4 border-green-primary rounded-t-clinical-md"
              : "hover:bg-green-primary/5",
          )}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <span>{title}</span>
          <IoChevronDown
            className={clsx(
              "text-lg transform transition-transform duration-200",
              isOpen ? "rotate-180 text-green-primary" : "text-grey-custom",
            )}
          />
        </button>

        <div
          id={id}
          className={clsx(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-screen px-6 py-4" : "max-h-0 px-6 py-0",
          )}
        >
          {isOpen && <div className="text-sm pb-2">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

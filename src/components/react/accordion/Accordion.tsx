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
    <div className={clsx("w-full divide-y divide-gray-200 rounded-xl", className)}>
      <div className="bg-white">
        <button
          type="button"
          onClick={toggleItem}
          className={clsx(
            "flex justify-between items-center w-full px-4 py-3 text-left font-medium text-green-700 hover:bg-green-50 transition-colors duration-200",
            isOpen && "bg-green-100 border-l-4 border-greenPrimary"
          )}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <span>{title}</span>
          <IoChevronDown
            className={clsx(
              "text-greenPrimary transform transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        <div
          id={id}
          className={clsx(
            "px-4 overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-screen py-3" : "max-h-0 py-0"
          )}
        >
          {isOpen && <div className="text-gray-700 text-sm">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

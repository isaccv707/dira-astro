import { useState, type ReactNode } from "react";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";

interface AccordionItem {
    id: string;
    title: string;
    content: any;
}

interface AccordionProps {
    items: AccordionItem[];
    defaultOpenId?: string;
    allowMultiple?: boolean;
    className?: string;
}

const Accordion = ({
    items,
    defaultOpenId,
    allowMultiple = false,
    className = "",
}: AccordionProps) => {
    const [openItems, setOpenItems] = useState<string[]>(
        defaultOpenId ? [defaultOpenId] : []
    );

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems((prev) =>
                prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
            );
        } else {
            setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
        }
    };

    return (
        <div className={clsx("w-full divide-y divide-gray-200 border border-gray-200 rounded-xl", className)}>
            {items.map(({ id, title, content }) => {
                const isOpen = openItems.includes(id);

                return (
                    <div key={id} className="bg-white">
                        <button
                            onClick={() => toggleItem(id)}
                            className={clsx(
                                "flex justify-between items-center w-full px-4 py-3 text-left font-medium text-green-700 hover:bg-green-50 transition-colors duration-200",
                                isOpen && "bg-green-100 border-l-4 border-green-primary"
                            )}
                        >
                            <span>{title}</span>
                            <IoChevronDown
                                className={clsx(
                                    "text-green-primary transform transition-transform duration-200",
                                    isOpen && "rotate-180"
                                )}
                            />
                        </button>


                        <div
                            className={clsx(
                                "px-4 overflow-hidden transition-all duration-300 ease-in-out",
                                isOpen ? "max-h-screen py-3" : "max-h-0 py-0"
                            )}
                        >
                            {isOpen && <div className="text-gray-700 text-sm">{content}</div>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;

// components/react/ContactItem.tsx
import { Icon } from "@iconify/react";

interface ContactItemProps {
  icon: string;
  label: string;
  value: string;
  isEmail?: boolean;
  /** Makes the value a link (tel:, wa.me, mailto:). External links open in a new tab. */
  href?: string;
}

const ContactItem = ({
  icon,
  label,
  value,
  isEmail = false,
  href,
}: ContactItemProps) => {
  const valueClass = `font-medium ${isEmail ? "truncate" : ""}`;
  const isExternal = href?.startsWith("http");
  return (
    <div className="flex items-center gap-3 text-ink-muted">
      <div className="flex rounded-full bg-green-primary/10 p-1.5 text-brand-ink items-center justify-center">
        <Icon icon={icon} className="h-4 w-4" />
      </div>
      <span className="font-bold">{label}</span>
      {href ? (
        <a
          href={href}
          className={`${valueClass} rounded-sm underline-offset-4 transition-colors duration-150 hover:text-brand-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary`}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {value}
        </a>
      ) : (
        <span className={valueClass}>{value}</span>
      )}
    </div>
  );
};

export default ContactItem;

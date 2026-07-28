// components/react/ContactItem.tsx
import { Icon } from "@iconify/react";

interface ContactItemProps {
  icon: string;
  label: string;
  value: string;
  isEmail?: boolean;
}

const ContactItem = ({
  icon,
  label,
  value,
  isEmail = false,
}: ContactItemProps) => {
  return (
    <div className="flex items-center gap-3 text-grey-custom">
      <div className="flex rounded-full bg-green-primary/10 p-1.5 text-green-primary items-center justify-center">
        <Icon icon={icon} className="h-4 w-4" />
      </div>
      <span className="font-bold">{label}</span>
      <span className={`font-medium ${isEmail ? "truncate" : ""}`}>
        {value}
      </span>
    </div>
  );
};

export default ContactItem;

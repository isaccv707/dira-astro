interface LabelProps {
  id: string;
  label: string;
}

const Label = ({ id, label }: LabelProps) => {
  return (
    <label htmlFor={id} className="font-semibold text-green-light">
      {label}
    </label>
  );
};

export default Label;

import {
  STUDY_TYPE_OPTIONS,
  type StudyTypeFilter,
} from "../../../utils/studyTypeFilter";

interface Props {
  value: StudyTypeFilter;
  onChange: (value: StudyTypeFilter) => void;
  disabled?: boolean;
}

const StudyTypeFilterControl = ({ value, onChange, disabled }: Props) => (
  <div
    role="radiogroup"
    aria-label="Filtrar por tipo"
    className="inline-flex w-fit shrink-0 rounded-clinical-sm border border-ui-border bg-ui-bg p-1"
  >
    {STUDY_TYPE_OPTIONS.map((option) => {
      const isActive = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={isActive}
          disabled={disabled}
          onClick={() => !isActive && onChange(option.value)}
          className={`cursor-pointer rounded-clinical-sm px-4 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary disabled:cursor-not-allowed ${
            isActive
              ? "bg-white text-green-light shadow-xs"
              : "text-grey-custom hover:text-green-light"
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

export default StudyTypeFilterControl;

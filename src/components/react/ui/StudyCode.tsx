import clsx from "clsx";

interface StudyCodeProps {
  code: string;
  className?: string;
}

/** A study code as printed on a specimen label: monospace, easy to compare. */
const StudyCode = ({ code, className }: StudyCodeProps) => (
  <span
    className={clsx(
      // Printed-label look on a light surface: ink on ui-bg ≈ 10.9:1.
      "inline-flex items-center rounded-clinical-sm border border-ui-border bg-ui-bg px-2 py-0.5 font-mono text-xs font-medium text-ink",
      className,
    )}
  >
    <span className="sr-only">Código </span>
    {code}
  </span>
);

export default StudyCode;

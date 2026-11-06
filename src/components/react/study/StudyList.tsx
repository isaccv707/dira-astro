import type { Study } from "../../../interfaces/study.interface";
import StudyRow from "./StudyRow";

interface StudyListProps {
  studies: Study[];
}

/** Static list of study rows (no search or paging), e.g. recommendations. */
const StudyList = ({ studies }: StudyListProps) => (
  <ul className="divide-y divide-ui-border overflow-hidden rounded-clinical-md border border-ui-border bg-white">
    {studies.map((study) => (
      <StudyRow key={study.id} study={study} />
    ))}
  </ul>
);

export default StudyList;

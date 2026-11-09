import type { Study } from "../../../interfaces/study.interface";
import StudyCard from "./StudyCard";

interface StudyListProps {
  studies: Study[];
}

/** Static grid of study cards (no search or paging), e.g. recommendations. */
const StudyList = ({ studies }: StudyListProps) => (
  <div className="@container">
    <ul className="grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
      {studies.map((study) => (
        <StudyCard key={study.id} study={study} />
      ))}
    </ul>
  </div>
);

export default StudyList;

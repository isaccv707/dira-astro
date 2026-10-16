// "Todos | Perfiles | Estudios" filter shared by the service catalog and the
// quoter. Maps to the backend's optional `isPanel` query param.
export type StudyTypeFilter = "all" | "profiles" | "studies";

// Kept in the URL as ?tipo=perfiles|estudios so filtered views are shareable.
export const STUDY_TYPE_QUERY_KEY = "tipo";

const QUERY_VALUES: Record<Exclude<StudyTypeFilter, "all">, string> = {
  profiles: "perfiles",
  studies: "estudios",
};

export const STUDY_TYPE_OPTIONS: { value: StudyTypeFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "profiles", label: "Perfiles" },
  { value: "studies", label: "Estudios" },
];

export const parseStudyTypeFilter = (
  value: string | null | undefined,
): StudyTypeFilter => {
  if (value === QUERY_VALUES.profiles) return "profiles";
  if (value === QUERY_VALUES.studies) return "studies";
  return "all";
};

export const studyTypeToQueryValue = (filter: StudyTypeFilter) =>
  filter === "all" ? null : QUERY_VALUES[filter];

// undefined → param omitted → backend returns both kinds.
export const studyTypeToIsPanel = (
  filter: StudyTypeFilter,
): "true" | "false" | undefined =>
  filter === "profiles" ? "true" : filter === "studies" ? "false" : undefined;

export const studyTypeEmptyMessage = (filter: StudyTypeFilter) =>
  filter === "profiles"
    ? "No hay perfiles para este servicio."
    : filter === "studies"
      ? "No hay estudios individuales para este servicio."
      : "Sin estudios disponibles.";


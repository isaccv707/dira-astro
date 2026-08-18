import { useMemo, useState } from "react";

import Button from "../../../components/react/buttons/Button";
import CardStudy from "../../../components/react/cards/CardStudy";
import SearchServices from "./SearchServices";

import type { Study } from "../../../interfaces/study.interface";

interface Props {
  studies: Study[];
}

const normalize = (value: string) => value.trim().toLowerCase();

const StudiesServices = ({ studies }: Props) => {
  const [search, setSearch] = useState("");

  const filteredStudies = useMemo(() => {
    const term = normalize(search);
    if (!term) return studies;
    return studies.filter(
      (study) =>
        normalize(study.name).includes(term) ||
        normalize(study.code).includes(term),
    );
  }, [studies, search]);

  return (
    <div id="services-section">
      <div className="sticky top-0 z-30 backdrop-blur-md mb-8 border-b border-ui-border">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-xl">
            <SearchServices onSearchChange={setSearch} />
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-green-light/8 border border-green-light/15 px-5 py-2.5 shadow-xs">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-light" />
              <span className="text-sm font-bold text-green-light">
                {`${filteredStudies.length} Estudios`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-125">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredStudies.length > 0 ? (
            filteredStudies.map((study: Study, index: number) => (
              <div
                key={study.id || `study-${index}`}
                className="motion-safe:animate-fade-up"
                style={{ animationDelay: `${(index % 4) * 100}ms` }}
              >
                <CardStudy study={study} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-ui-bg/50 rounded-clinical-lg border-2 border-dashed border-ui-border">
              <div className="bg-white p-6 rounded-full shadow-sm shadow-ui-border/50 mb-6">
                <svg
                  className="w-16 h-16 text-ui-border"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-green-light">
                No encontramos resultados
              </h2>
              <p className="text-grey-custom mt-3 max-w-sm mx-auto leading-relaxed">
                Prueba buscando con palabras más generales o revisa si hay algún
                error de escritura.
              </p>
              <Button
                type="button"
                onClick={() => setSearch("")}
                variant="primary"
                text="Limpiar búsqueda"
                className="mt-8"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudiesServices;

import type { Study } from "../interfaces/study.interface";
import type { ServiceDetail } from "../interfaces/service.interface";
import type { QuoterService } from "./quoterStudies";
import { getOneResource } from "./getOneResource";
import { addStudyToQuote, wouldReplaceQuote } from "../stores/quoterStore";
import { getQuoterStudies } from "./quoterStudies";

/** Query param that preloads a study in the quoter: /quoter?estudio=<slug>. */
export const QUOTER_STUDY_PARAM = "estudio";

export const quoterHrefForStudy = (slug: string) =>
  `/quoter?${QUOTER_STUDY_PARAM}=${encodeURIComponent(slug)}`;

/**
 * by-slug returns every price sheet (private ones included). Keep only the
 * fields the quote renders, since the quote is stored in localStorage.
 */
export const toPublicStudy = (raw: Study & Record<string, unknown>): Study => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  code: raw.code,
  description: raw.description,
  sampleType: raw.sampleType,
  deliveryTime: raw.deliveryTime,
  preparation: raw.preparation,
  isPanel: raw.isPanel,
  abbreviation: raw.abbreviation,
  section: raw.section,
  technique: raw.technique,
  priceInfo: raw.priceInfo ?? { showPrice: false, price: null, message: null },
});

export type QuoterPreloadResult =
  | { status: "added"; study: Study }
  | { status: "already"; study: Study }
  | { status: "conflict"; study: Study; service: QuoterService }
  | { status: "unavailable"; slug: string };

/**
 * Resolves the study in the active branch and adds it to the quote. When the
 * quote already holds studies of another service (another price sheet) it
 * returns "conflict" so the page asks before replacing them.
 */
export const preloadStudyIntoQuote = async (
  slug: string,
  branchId: string,
): Promise<QuoterPreloadResult> => {
  const raw = await getOneResource<Study & Record<string, unknown>>(
    "studies/by-slug",
    slug,
    { branchId },
  );
  if (!raw || !raw.priceInfo?.showPrice) return { status: "unavailable", slug };

  const study = toPublicStudy(raw);
  if (getQuoterStudies().some((item) => item.id === study.id)) {
    return { status: "already", study };
  }

  const parent = raw.service as { slug?: string } | undefined;
  const detail = parent?.slug
    ? await getOneResource<ServiceDetail>("services", parent.slug, { branchId, limit: 1 })
    : null;
  if (!detail?.id || !detail.priceSheetId) return { status: "unavailable", slug };

  const service: QuoterService = {
    id: detail.id,
    slug: detail.slug,
    name: detail.name,
    priceSheetId: detail.priceSheetId,
  };
  if (wouldReplaceQuote(service)) return { status: "conflict", study, service };

  addStudyToQuote(study, service);
  return { status: "added", study };
};

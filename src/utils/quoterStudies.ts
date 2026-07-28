import type { Study } from "../interfaces/study.interface";

export const QUOTER_STORAGE_KEY = "dira_quoter_studies";
export const QUOTER_UPDATED_EVENT = "dira_quoter_updated";

export const getQuoterStudies = (): Study[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(QUOTER_STORAGE_KEY);
    if (!stored) return [];

    try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
            (s): s is Study => Boolean(s?.id && s?.priceInfo),
        );
    } catch {
        return [];
    }
};

export const addQuoterStudy = (study: Study) => {
    if (typeof window === "undefined") return;
    const studies = getQuoterStudies();
    const exists = studies.find((s) => s.id === study.id);

    if (!exists) {
        const newStudies = [...studies, { ...study, quantity: 1 }];
        localStorage.setItem(QUOTER_STORAGE_KEY, JSON.stringify(newStudies));
        window.dispatchEvent(new CustomEvent(QUOTER_UPDATED_EVENT));
    }
};

export const removeQuoterStudy = (studyId: string) => {
    if (typeof window === "undefined") return;
    const studies = getQuoterStudies();
    const newStudies = studies.filter((s) => s.id !== studyId);
    localStorage.setItem(QUOTER_STORAGE_KEY, JSON.stringify(newStudies));
    window.dispatchEvent(new CustomEvent(QUOTER_UPDATED_EVENT));
};

export const updateQuoterStudyQuantity = (studyId: string, quantity: number) => {
    if (typeof window === "undefined") return;
    const studies = getQuoterStudies();
    const itemIndex = studies.findIndex((s) => s.id === studyId);
    if (itemIndex > -1) {
        studies[itemIndex].quantity = quantity < 1 ? 1 : quantity;
        localStorage.setItem(QUOTER_STORAGE_KEY, JSON.stringify(studies));
        window.dispatchEvent(new CustomEvent(QUOTER_UPDATED_EVENT));
    }
};

export const clearQuoterStudies = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(QUOTER_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(QUOTER_UPDATED_EVENT));
};

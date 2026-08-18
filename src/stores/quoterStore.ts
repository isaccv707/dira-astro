import { atom, computed } from "nanostores";
import type { Client } from "../interfaces/client.interface";
import type { Study } from "../interfaces/study.interface";
import {
  getQuoterStudies,
  addQuoterStudy,
  removeQuoterStudy,
  updateQuoterStudyQuantity,
  clearQuoterStudies,
  getQuoterService,
  setQuoterService,
  clearQuoterService,
  QUOTER_UPDATED_EVENT,
  type QuoterService,
} from "../utils/quoterStudies";

export const clientStore = atom<Client | null>(null);

// Starts empty (not getQuoterStudies()) so the client's first hydration pass
// matches the server-rendered markup, which is always empty (no `window`
// there). The real value is synced in afterwards via ensureQuoterStudiesSynced(),
// called from each consumer's mount effect — reading localStorage eagerly here
// causes a client/server hydration mismatch for anyone with a non-empty quote.
export const selectedStudiesStore = atom<Study[]>([]);

// Same empty-on-server / synced-on-client rationale as selectedStudiesStore above.
export const selectedServiceStore = atom<QuoterService | null>(null);

const syncFromStorage = () => {
  selectedStudiesStore.set(getQuoterStudies());
  selectedServiceStore.set(getQuoterService());
};

let listenersAttached = false;

export const ensureQuoterStudiesSynced = () => {
  syncFromStorage();
  if (listenersAttached) return;
  listenersAttached = true;
  window.addEventListener(QUOTER_UPDATED_EVENT, syncFromStorage);
  window.addEventListener("storage", syncFromStorage);
};

export const setClient = (client: Client) => clientStore.set(client);

export const addStudy = (study: Study) => addQuoterStudy(study);

export const removeStudy = (id: string) => removeQuoterStudy(id);

export const updateStudyQuantity = (id: string, quantity: number) =>
  updateQuoterStudyQuantity(id, quantity);

// A quotation can only reference one price sheet, so switching services
// drops whatever was selected against the previous one.
export const selectQuoterService = (service: QuoterService) => {
  const current = getQuoterService();
  if (current?.id !== service.id) {
    clearQuoterStudies();
  }
  setQuoterService(service);
};

export const clearStudies = () => {
  clientStore.set(null);
  clearQuoterStudies();
  clearQuoterService();
};

const IVA_RATE = 0.16;

export const totalsStore = computed(selectedStudiesStore, (studies) => {
  // Study prices are IVA-included totals, so the subtotal is derived by
  // dividing the total by 1.16 — not by subtracting 16% from it.
  const total = studies.reduce((acc, s) => {
    const qty = s.quantity ?? 1;
    return acc + Number(s.priceInfo?.price ?? 0) * qty;
  }, 0);

  const subtotal = total / (1 + IVA_RATE);
  const tax = total - subtotal;

  return { subtotal, tax, total };
});

import { atom, computed } from "nanostores";
import type { Client } from "../interfaces/client.interface";
import type { Study } from "../interfaces/study.interface";
import {
  getQuoterStudies,
  addQuoterStudy,
  removeQuoterStudy,
  updateQuoterStudyQuantity,
  clearQuoterStudies,
  QUOTER_UPDATED_EVENT,
} from "../utils/quoterStudies";

export const clientStore = atom<Client | null>(null);

// Starts empty (not getQuoterStudies()) so the client's first hydration pass
// matches the server-rendered markup, which is always empty (no `window`
// there). The real value is synced in afterwards via ensureQuoterStudiesSynced(),
// called from each consumer's mount effect — reading localStorage eagerly here
// causes a client/server hydration mismatch for anyone with a non-empty quote.
export const selectedStudiesStore = atom<Study[]>([]);

const syncSelectedStudies = () => {
  selectedStudiesStore.set(getQuoterStudies());
};

let listenersAttached = false;

export const ensureQuoterStudiesSynced = () => {
  syncSelectedStudies();
  if (listenersAttached) return;
  listenersAttached = true;
  window.addEventListener(QUOTER_UPDATED_EVENT, syncSelectedStudies);
  window.addEventListener("storage", syncSelectedStudies);
};

export const setClient = (client: Client) => clientStore.set(client);

export const addStudy = (study: Study) => addQuoterStudy(study);

export const removeStudy = (id: string) => removeQuoterStudy(id);

export const updateStudyQuantity = (id: string, quantity: number) =>
  updateQuoterStudyQuantity(id, quantity);

export const clearStudies = () => {
  clientStore.set(null);
  clearQuoterStudies();
};

export const totalsStore = computed(selectedStudiesStore, (studies) => {
  const total = studies.reduce((acc, s) => {
    const qty = s.quantity ?? 1;
    return acc + (s.priceInfo?.price ?? 0) * qty;
  }, 0);

  const tax = total * 0.16;
  const subtotal = total - tax;

  return { subtotal, tax, total };
});

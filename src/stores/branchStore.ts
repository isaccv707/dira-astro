import { atom } from "nanostores";
import type { SelectedBranch } from "../interfaces/branch.interface";
import { getAllBranches } from "../api/branchesApi/branchesApi";
import { openModal } from "./modalStore";
import { clearCart } from "../utils/cart";
import {
  clearQuoterService,
  clearQuoterStudies,
} from "../utils/quoterStudies";

const BRANCH_ID_KEY = "dyra_branch_id";
const BRANCH_NAME_KEY = "dyra_branch_name";

const getInitialBranch = (): SelectedBranch | null => {
  if (typeof window === "undefined") return null;
  const id = localStorage.getItem(BRANCH_ID_KEY);
  if (!id) return null;
  return {
    id,
    name: localStorage.getItem(BRANCH_NAME_KEY) ?? "",
  };
};

export const branchStore = atom<SelectedBranch | null>(getInitialBranch());

export const setSelectedBranch = (branch: SelectedBranch) => {
  localStorage.setItem(BRANCH_ID_KEY, branch.id);
  localStorage.setItem(BRANCH_NAME_KEY, branch.name);
  document.cookie = `${BRANCH_ID_KEY}=${branch.id};path=/;max-age=31536000;SameSite=Lax`;
  branchStore.set(branch);
};

// Prices, catalogs and contact data are all branch-scoped. On a switch, drop
// everything priced against the old branch (cart, quote) and land on the home
// page with a fresh request — replace() so Back doesn't return to a page
// rendered for the previous branch.
export const switchBranch = (branch: SelectedBranch) => {
  setSelectedBranch(branch);
  clearCart();
  clearQuoterStudies();
  clearQuoterService();
  window.location.replace("/");
};

export const getStoredBranchId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(BRANCH_ID_KEY);
};

let serverBranchIdResolver: (() => string | undefined) | null = null;

export const setServerBranchIdResolver = (
  resolver: () => string | undefined,
) => {
  serverBranchIdResolver = resolver;
};

export const resolveBranchId = (): string | undefined => {
  if (typeof window !== "undefined") {
    return getStoredBranchId() ?? undefined;
  }
  return serverBranchIdResolver?.() ?? undefined;
};

export const openBranchSelectorModal = async () => {
  const branches = await getAllBranches();
  if (!branches || branches.length === 0) return;
  openModal("MODAL_SELECT_BRANCH", {
    title: "Elige la sucursal de tu preferencia",
    data: branches,
  });
};

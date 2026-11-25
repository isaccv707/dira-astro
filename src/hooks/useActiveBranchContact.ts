import { useEffect, useState } from "react";
import {
  getActiveBranchContact,
  type ActiveBranchContact,
} from "../api/branchesApi/branchesApi";

// Branch selection always triggers a full page reload (see branchStore),
// so a fetch-on-mount is enough — no need to react to store changes.
// Pass the server-resolved contact as `initial` to skip the fetch and render
// the right branch during SSR.
export const useActiveBranchContact = (
  initial?: ActiveBranchContact | null,
): ActiveBranchContact | null => {
  const [contact, setContact] = useState<ActiveBranchContact | null>(
    initial ?? null,
  );

  useEffect(() => {
    if (initial) return;
    getActiveBranchContact()
      .then(setContact)
      .catch(() => setContact(null));
  }, [initial]);

  return contact;
};

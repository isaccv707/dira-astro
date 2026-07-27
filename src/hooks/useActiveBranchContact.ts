import { useEffect, useState } from "react";
import {
  getActiveBranchContact,
  type ActiveBranchContact,
} from "../api/branchesApi/branchesApi";

// Branch selection always triggers a full page reload (see branchStore),
// so a fetch-on-mount is enough — no need to react to store changes.
export const useActiveBranchContact = (): ActiveBranchContact | null => {
  const [contact, setContact] = useState<ActiveBranchContact | null>(null);

  useEffect(() => {
    getActiveBranchContact()
      .then(setContact)
      .catch(() => setContact(null));
  }, []);

  return contact;
};

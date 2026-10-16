import { useCallback, useEffect, useState } from "react";
import {
  getCachedPanelTree,
  getPanelTree,
} from "../api/studiesApi/studiesApi";
import type { PanelNode, PanelTree } from "../interfaces/study.interface";

type PanelTreeStatus = "idle" | "loading" | "success" | "error" | "not-found";

interface UsePanelTreeResult {
  status: PanelTreeStatus;
  tree: PanelTree | null;
  retry: () => void;
}

// Lazy: nothing is requested until `enabled` flips true (first expand).
export const usePanelTree = (
  id: string,
  enabled: boolean,
): UsePanelTreeResult => {
  const cached = getCachedPanelTree(id);
  const [tree, setTree] = useState<PanelTree | null>(cached ?? null);
  const [status, setStatus] = useState<PanelTreeStatus>(
    cached === undefined ? "idle" : cached ? "success" : "not-found",
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled || status === "success" || status === "not-found") return;

    let cancelled = false;
    setStatus("loading");

    getPanelTree(id)
      .then((data) => {
        if (cancelled) return;
        setTree(data);
        setStatus(data ? "success" : "not-found");
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Error fetching panel tree:", error);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [id, enabled, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { status, tree, retry };
};

// Parameters = leaves only; sub-panels are just grouping nodes.
export const countPanelLeaves = (nodes: PanelNode[]): number =>
  nodes.reduce(
    (acc, node) =>
      acc +
      (node.isPanel || node.children.length > 0
        ? countPanelLeaves(node.children)
        : 1),
    0,
  );

import { defineMiddleware } from "astro:middleware";
import { setServerBranchIdResolver } from "./stores/branchStore";
import { runWithBranchId, getCurrentBranchId } from "./server/branchContext";
import { DEFAULT_BRANCH_ID } from "./constants/site";

setServerBranchIdResolver(getCurrentBranchId);

export const onRequest = defineMiddleware(async (context, next) => {
  // Crawlers and first-time visitors carry no branch cookie; fall back to
  // the default branch so branch-scoped pages (e.g. /study/*) still render.
  const branchId =
    context.cookies.get("dyra_branch_id")?.value || DEFAULT_BRANCH_ID;
  const response = await runWithBranchId(branchId, () => next());

  // Pages render prices and data for the cookie's branch: never let a
  // browser or proxy reuse one rendered for a different branch.
  if (response.headers.get("content-type")?.includes("text/html")) {
    if (!response.headers.has("Cache-Control")) {
      response.headers.set("Cache-Control", "private, no-cache");
    }
    response.headers.append("Vary", "Cookie");
  }
  return response;
});

import { defineMiddleware } from "astro:middleware";
import { setServerBranchIdResolver } from "./stores/branchStore";
import { runWithBranchId, getCurrentBranchId } from "./server/branchContext";

setServerBranchIdResolver(getCurrentBranchId);

export const onRequest = defineMiddleware((context, next) => {
  const branchId = context.cookies.get("dyra_branch_id")?.value;
  return runWithBranchId(branchId, () => next());
});

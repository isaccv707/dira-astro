import { AsyncLocalStorage } from "node:async_hooks";

// Only ever imported from src/middleware.ts. Keeping the node:async_hooks
// import out of any module shared with client code (e.g. branchStore.ts)
// matters: that file is bundled for the browser too, and Vite can't resolve
// Node builtins there.
const branchIdStorage = new AsyncLocalStorage<string | undefined>();

export const runWithBranchId = <T>(
  branchId: string | undefined,
  callback: () => T,
): T => branchIdStorage.run(branchId, callback);

export const getCurrentBranchId = (): string | undefined =>
  branchIdStorage.getStore();

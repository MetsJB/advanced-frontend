import { StateScheme } from "@/app/providers/StoreProvider";

export const getLoginIsError = (state: StateScheme) =>
  state?.loginForm?.error || undefined;

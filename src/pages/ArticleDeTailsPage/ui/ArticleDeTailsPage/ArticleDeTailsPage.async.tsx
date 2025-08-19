import { lazy } from "react";

export const ArticleDeTailsPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      //@ts-ignore
      setTimeout(() => resolve(import("./ArticleDeTailsPage")), 1500);
    })
);

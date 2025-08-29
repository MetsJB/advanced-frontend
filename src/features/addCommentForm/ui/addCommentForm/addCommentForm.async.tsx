import { FC, lazy } from "react";
import addCommentForm, { addCommentFormProps } from "./addCommentForm";

export const addCommentFormAsync = lazy<FC<addCommentFormProps>>(
  () =>
    new Promise((resolve) => {
      //@ts-ignore
      setTimeout(() => resolve(import("./addCommentForm")), 1500);
    })
);

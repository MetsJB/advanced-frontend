import { FC, lazy } from "react";
import addCommentForm, { addCommentFormProps } from "./addCommentForm";

export const addCommentFormAsync = lazy<FC<addCommentFormProps>>(
  () => import("./addCommentForm")
);

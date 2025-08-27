import { EntityState } from "@reduxjs/toolkit";
import { ArticleDetailsSchema } from "entites/Article";
import { Comment } from "entites/Comment";

export interface ArticelDetailsCommentsSchema extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
}

import { EntityState } from "@reduxjs/toolkit";
import { ArticleDetailsSchema } from "entities/Article";
import { Comment } from "entities/Comment";

export interface ArticelDetailsCommentsSchema extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
}

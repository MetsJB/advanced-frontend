import { EntityState } from "@reduxjs/toolkit";
import { Article } from "entites/Article";

export interface ArticleDetailsRecommendationsSchema
  extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
}

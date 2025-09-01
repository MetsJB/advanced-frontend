import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entites/Article";

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string

    view: ArticleView
}

import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticlesPage.module.scss";
import { memo, useCallback } from "react";
import {
  Article,
  ArticleList,
  ArticleView,
  ArticleViewSelector,
} from "entites/Article";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from "../../model/slices/articlesPageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelectors";
import { Page } from "widgets/Page/Page";
import { fetchNextArticlePage } from "../../model/services/fetchNextArticlePage/fetchNextArticlePage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { useSearchParams } from "react-router-dom";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticlePageIsLoading);
  const view = useSelector(getArticlePageView);
  const articles = useSelector(getArticles.selectAll);
  let [searchParams] = useSearchParams();


  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);


  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleList
          className={cls.list}
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);

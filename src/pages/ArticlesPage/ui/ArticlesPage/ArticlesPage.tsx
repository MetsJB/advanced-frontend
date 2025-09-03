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
import { fetchArticleList } from "../../model/services/fetchArticleList/fetchArticleList";
import { useSelector } from "react-redux";
import {
  getArticlePageError,
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageNum,
  getArticlePageView,
} from "../../model/selectors/articlePageSelectors";
import { Page } from "shared/ui/Page/Page";
import { fetchNextArticlePage } from "pages/ArticlesPage/model/services/fetchNextArticlePage/fetchNextArticlePage";

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

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage())
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticleList({ page: 1 }));
  });


  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);

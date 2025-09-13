import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleDeTailsPage.module.scss";
import { memo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleDetails, ArticleList } from "entities/Article";
import { Text, TextSize } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchCommentsByArticleById } from "../../model/services/fetchCommentsByArticleById/fetchCommentsByArticleById";
import { AddCommentForm } from "features/addCommentForm";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routerConfig/routerConfig";
import { Page } from "widgets/Page/Page";
import {
  articleDetailsPageRecommendationsReducer,
  getArticleRecommendations,
} from "../../model/slices/articleDetailsPageRecommendationsSlice/articleDetailsPageRecommendationsSlice";
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { VStack } from "shared/ui/Stack";

interface ArticleDeTailsPageProps {
  className?: string;
}

const ArticleDeTailsPage = ({ className }: ArticleDeTailsPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsIsLoading
  );
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useDispatch();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleById(id));
    dispatch(fetchArticleRecommendations());
  });

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDeTailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
  };

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDeTailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <Text
            size={TextSize.L}
            title={t("Рекомендуем")}
            className={cls.commentTitle}
          />
          <ArticleList
            target={"_blank"}
            articles={recommendations}
            isLoading={recommendationsIsLoading}
            className={cls.recommendations}
          />
          <Text
            size={TextSize.L}
            title={t("Комментарии")}
            className={cls.commentTitle}
          />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDeTailsPage);

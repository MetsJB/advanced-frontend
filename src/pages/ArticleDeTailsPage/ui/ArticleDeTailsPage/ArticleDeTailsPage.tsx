import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleDeTailsPage.module.scss";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "entites/Article";
import { Text } from "shared/ui/Text/Text";
import { CommentList } from "entites/Comment";
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
import { fetchCommentsByArticleById } from "pages/ArticleDeTailsPage/model/services/fetchCommentsByArticleById/fetchCommentsByArticleById";

interface ArticleDeTailsPageProps {
  className?: string;
}

const ArticleDeTailsPage = ({ className }: ArticleDeTailsPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useDispatch();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleById(id));
  });
  

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDeTailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  }

  const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
  };

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDeTailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={t("Комментарии")} className={cls.commentTitle} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDeTailsPage);

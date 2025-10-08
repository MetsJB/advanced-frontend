import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, Suspense, useCallback } from "react";
import { TextSize, Text } from "@/shared/ui/Text/Text";
import { AddCommentForm } from "@/features/addCommentForm";
import { CommentList } from "@/entities/Comment";
import { useDispatch, useSelector } from "react-redux";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchCommentsByArticleById } from "../../model/services/fetchCommentsByArticleById/fetchCommentsByArticleById";
import { VStack } from "@/shared/ui/Stack";
import { Loader } from "@/shared/ui/Loader/Loader";

interface ArticleDeTailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDeTailsComments = memo(
  (props: ArticleDeTailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useDispatch();

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleById(id));
    });

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch]
    );

    return (
      <VStack gap="16" max className={classNames("", {}, [className])}>
        <Text size={TextSize.L} title={t("Комментарии")} />
        <Suspense fallback={<Loader  />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
    ); 
  }
);

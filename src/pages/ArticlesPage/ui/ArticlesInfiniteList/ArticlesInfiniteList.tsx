import { memo } from "react";
import { ArticleList } from "@/entities/Article";
import { useSelector } from "react-redux";
import {
  getArticlePageError,
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelectors";
import { getArticles } from "../../model/slices/articlesPageSlice";
import { Text } from "@/shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ArticlesInfiniteListProps {
  className?: string;
}

export const ArticlesInfiniteList = memo((props: ArticlesInfiniteListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const isLoading = useSelector(getArticlePageIsLoading);
  const view = useSelector(getArticlePageView);
  const error = useSelector(getArticlePageError);
  const articles = useSelector(getArticles.selectAll);

  if (error) {
    return <Text text={t("Ошибка при загрузке статей")} />;
  }

  return (
    <ArticleList
      className={className}
      isLoading={isLoading}
      view={view}
      articles={articles}
    />
  );
});

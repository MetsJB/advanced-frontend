import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import cls from "./ArticleDetailsPageHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routerConfig/routerConfig";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entites/User";
import { getArticleDetailsData } from "entites/Article";
import { getCanEditArticle } from "pages/ArticleDeTailsPage/model/selectors/article";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [navigate, article?.id, RoutePath]);

    return (
      <div
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
        {canEdit && (
          <Button
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onEditArticle}
          >
            {t("Редактировать")}
          </Button>
        )}
      </div>
    );
  }
);

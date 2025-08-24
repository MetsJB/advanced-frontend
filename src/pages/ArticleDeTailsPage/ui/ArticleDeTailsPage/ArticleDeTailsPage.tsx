import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleDeTailsPage.module.scss";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "entites/Article";

interface ArticleDeTailsPageProps {
  className?: string;
}

const ArticleDeTailsPage = ({ className }: ArticleDeTailsPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id : string }>();

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDeTailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleDeTailsPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDeTailsPage);

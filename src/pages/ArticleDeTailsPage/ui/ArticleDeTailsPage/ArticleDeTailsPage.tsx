import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleDeTailsPage.module.scss";
import { memo } from "react";

interface ArticleDeTailsPageProps {
  className?: string;
}

 const ArticleDeTailsPage = ({ className }: ArticleDeTailsPageProps) => {
  const { t } = useTranslation('');

  return (
    <div className={classNames(cls.ArticleDeTailsPage, {}, [className])}>
      ARTICLE DETAILS PAGE
    </div>
  );
};

export default memo(ArticleDeTailsPage) 
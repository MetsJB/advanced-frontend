import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleImageBlockComponent.module.scss";
import { memo, ReactNode } from "react";
import { ArticleImageBlock } from "../../model/types/article";
import { Text, TextAlign } from "@/shared/ui/Text/Text";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => {
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        <img alt={block.title} src={block.src} className={cls.img} />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    );
  }
);

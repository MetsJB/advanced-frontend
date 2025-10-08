import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import cls from "./ArticleSortSelector.module.scss";
import { Select, SelectOptions } from "@/shared/ui/Select/Select";
import { SortOrder } from "@/shared/types";
import { ArticleSortField } from "../../model/consts/articleConsts";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
    () => [
      {
        value: "asc",
        content: t("возростанию"),
      },
      {
        value: "desc",
        content: t("убыванию"),
      },
    ],
    []
  );

  const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("дате создания"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("названию"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("количеству просмотров"),
      },
    ],
    []
  );

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select
        value={sort}
        onChange={onChangeSort}
        options={sortFieldOptions}
        label={t("Сортировать ПО")}
      />
      <Select
        value={order}
        onChange={onChangeOrder}
        options={orderOptions}
        label={t("по")}
        className={cls.order}
      />
    </div>
  );
});

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { Input } from '@/shared/ui/redesigned/Input';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeSearch: (value: string) => void;
  type: ArticleType;
  search: string;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    search,
    sort,
    type,
  } = props;
  const { t } = useTranslation();

  return (
    <Card
      padding="24"
      className={classNames(cls.ArticlesFilters, {}, [className])}
    >
      <VStack gap="32">
        <Input
          value={search}
          onChange={onChangeSearch}
          placeholder={t('Поиск')}
        />
        <ArticleTypeTabs
          className={cls.tabs}
          onChangeType={onChangeType}
          value={type}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});

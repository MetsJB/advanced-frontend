import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import cls from './ArticlesPageFilters.module.scss';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo(
  (props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
      onChangeOrder,
      onChangeSearch,
      onChangeSort,
      onChangeType,
      onChangeView,
      order,
      search,
      sort,
      type,
      view,
    } = useArticleFilters();

    return (
      <div
        className={classNames(cls.ArticlesPageFilters, {}, [
          className,
        ])}
      >
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector
            view={view}
            onViewClick={onChangeView}
          />
        </div>
        <Card className={cls.search}>
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder={t('Поиск')}
          />
        </Card>
        <ArticleTypeTabs
          className={cls.tabs}
          onChangeType={onChangeType}
          value={type}
        />
      </div>
    );
  },
);

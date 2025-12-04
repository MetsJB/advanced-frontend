import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo(
  (props: FiltersContainerProps) => {
    const { className } = props;
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
      <ArticlesFilters
        onChangeOrder={onChangeOrder}
        onChangeSearch={onChangeSearch}
        onChangeSort={onChangeSort}
        onChangeType={onChangeType}
        order={order}
        search={search}
        sort={sort}
        type={type}
        className={className}
      />
    );
  },
);

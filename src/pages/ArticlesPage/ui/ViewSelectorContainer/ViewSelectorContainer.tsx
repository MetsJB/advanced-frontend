import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo(
  (props: ViewSelectorContainerProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { view, onChangeView } = useArticleFilters();

    return (
      <div className={className}>
        <ArticleViewSelector
          className={className}
          view={view}
          onViewClick={onChangeView}
        />
      </div>
    );
  },
);

import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <StickyContentLayout
        left={<ViewSelectorContainer/>}  
        right={<FiltersContainer/>}  
        content={
            <Page
              data-testid="ArticlesPage"
              onScrollEnd={onLoadNextPart}
              className={classNames(cls.ArticlesPageRedesigned, {}, [
                className,
              ])}
            >
              <ArticlesInfiniteList className={cls.list} />
              <ArticlePageGreeting />
            </Page>
          }
        />
      }
      off={
        <Page
          data-testid="ArticlesPage"
          onScrollEnd={onLoadNextPart}
          className={classNames(cls.ArticlesPage, {}, [className])}
        >
          <ArticlesPageFilters />
          <ArticlesInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={false}
    >
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  ArticleView,
  ArticleSortField,
  ArticleType,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import {
  getArticlePageView,
  getArticlePageSort,
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageType,
} from '../../model/selectors/articlePageSelectors';
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';

export function useArticleFilters() {
  const view = useSelector(getArticlePageView);
  const sort = useSelector(getArticlePageSort);
  const order = useSelector(getArticlePageOrder);
  const search = useSelector(getArticlePageSearch);
  const type = useSelector(getArticlePageType);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchArticleList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);
  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );
  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return {
    view,
    sort,
    order,
    search,
    type,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
    dispatch,
    fetchData,
    debouncedFetchData,
  };
}

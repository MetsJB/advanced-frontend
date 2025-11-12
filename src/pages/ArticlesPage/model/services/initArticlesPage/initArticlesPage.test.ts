import { articlesPageActions } from '../../slices/articlesPageSlice';
import { initArticlesPage } from './initArticlesPage';
import { TestAsyncThunk } from '@/shared/lib/tests/testAsyncThunk/testAsyncThunk';

jest.mock('../fetchArticleList/fetchArticleList');
jest.mock('../../slices/articlesPageSlice');

describe('initArticlesPage.test', () => {
  test('success', async () => {
    const searchParams = new URLSearchParams({
      order: 'asc',
      sort: 'views',
      search: '',
      type: 'all',
    });

    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlePage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        _inited: false,
      },
    });

    const result = await thunk.callThunk(searchParams);

    expect(thunk.dispatch).toBeCalledTimes(7);
    expect(articlesPageActions.initState).toBeCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });
});

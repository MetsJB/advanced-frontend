import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticleList } from "../fetchArticleList/fetchArticleList";
import { initArticlesPage } from "./initArticlesPage";
import { TestAsyncThunk } from "shared/lib/tests/testAsyncThunk/testAsyncThunk";

jest.mock("../fetchArticleList/fetchArticleList");
jest.mock("../../slices/articlesPageSlice");

describe("initArticlesPage.test", () => {
  test("success", async () => {
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
    // await thunk.callThunk({set(name, value) {
        
    // },} as URLSearchParams );
    // await thunk.callThunk('order=asc&sort=views&search=*&type=all' as URLSearchParams);

    // expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticleList).toBeCalledWith({ page: 1 });
    expect(articlesPageActions.initState).toBeCalled();
});

});
  
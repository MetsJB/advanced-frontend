import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleById {
  articleId: string;
}


const articleContorlPanelApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleById: build.query<Article, string>({
      query: (id) => ({
        url: `/articles/${id}`,
      }),
    }),
  }),
  
});

export const useGetArticleById =
  articleContorlPanelApi.useGetArticleByIdQuery;

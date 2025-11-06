import { Article } from '../../../src/entities/Article/model/types/article';

const defaultArticle = {
  title: 'TESTING ARTICLE',
  subtitle: 'БиологиЯ',
  img: 'https://avatars.mds.yandex.net/i?id=8c6195c8dca327737bcedee89b8393bb_l-5479895-images-thumbs&n=13',
  views: 1022,
  createdAt: '26.02.2022',
  userId: '1',
  type: ['SCIENCE'],
  blocks: [],
};

export const createArticle = (article?: Article) => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/articles',
      headers: {
        Authorization: 'test',
      },
      body: article ?? defaultArticle,
    })
    .then((resp) => {
      return resp.body;
    });
};

export const removeArticle = (articleId: string) => {
  return cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: {
      Authorization: 'test',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}

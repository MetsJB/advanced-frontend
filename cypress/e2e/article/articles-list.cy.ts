describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('/articles');
    });
  });

  it('и статьи успешно подгружаются', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should(
      'have.length.greaterThan',
      3,
    );
  });
  it('на фикстурах', () => {
    cy.intercept('GET', '**/articles?*', {
      fixture: 'articles.json',
    });
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should(
      'have.length.greaterThan',
      3,
    );
  });

  it.skip('Пример заскипанного теста"', () => {
    cy.get('aaaaa').should('exist');
  });

  it('и сортирует по "Наука', () => {
    cy.getByTestId('Tabs.SCIENCE').click();
    cy.getByTestId('ArticleList').should('have.length', 1);
    cy.getByTestId('Text.Header').should('exist');
    cy.getByTestId('SubtitleArticle.Paragraph').should(
      'have.text',
      'Научная статья - Биология',
    );
  });
});

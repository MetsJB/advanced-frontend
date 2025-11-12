export const updateProfile = (
  firstname: string,
  lastname: string,
) => {
  cy.getByTestId(
    'EditableProfileCardHeader.EditButton',
  ).click();
  cy.getByTestId('ProfileCard.firstname')
    .clear()
    .type(firstname);
  cy.getByTestId('ProfileCard.lastname')
    .clear()
    .type(lastname);
  cy.getByTestId(
    'EditableProfileCardHeader.SaveButton',
  ).click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      Authorization: 'test',
    },
    body: {
      id: '4',
      first: 'testname',
      lastname: 'Obobov',
      age: 24,
      currency: 'RUB',
      country: 'Russia',
      city: 'Moscow',
      username: 'testuser',
      avatar:
        'https://avatars.mds.yandex.net/i?id=3c543e6702ff0f180579a2a79852e5fd_l-12715029-images-thumbs&n=13',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(
        firstname: string,
        lastname: string,
      ): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}

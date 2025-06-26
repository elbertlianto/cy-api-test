/// <reference types="cypress" />

const baseUrl = 'https://gorest.co.in/public/v2/users';

const randomUser = {
  name: `Test User ${Math.floor(Math.random() * 1000)}`,
  email: `testuser${Math.floor(Math.random() * 1000)}@example.com`,
  gender: 'male',
  status: 'active',
};

let userId;

describe('Gorest API Tests', () => {
  it('GET - Retrieve user data', () => {
    cy.request('GET', baseUrl)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        console.log(response.body);
      });
  });

  it('POST - Create a new user', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        Authorization: `Bearer d3b0edff7d0f57c0b886c60fb78c9b223a9e701bfafe4faaea5010fa99dbc2b8`,
      },
      body: randomUser,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', randomUser.name);
      expect(response.body).to.have.property('email', randomUser.email);
      userId = response.body.id;
    });
  });

  it('PUT - Update the user data', () => {
    const updatedUser = {
      ...randomUser,
      name: `Updated User ${Math.floor(Math.random() * 1000)}`,
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${userId}`,
      headers: {
        Authorization: `Bearer d3b0edff7d0f57c0b886c60fb78c9b223a9e701bfafe4faaea5010fa99dbc2b8`,
      },
      body: updatedUser,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', updatedUser.name);
    });
  });

  it('DELETE - Delete the user', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/${userId}`,
      headers: {
        Authorization: `Bearer d3b0edff7d0f57c0b886c60fb78c9b223a9e701bfafe4faaea5010fa99dbc2b8`,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});

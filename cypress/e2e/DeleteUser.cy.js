import { faker } from '@faker-js/faker';

describe('Delete User', () => {

  it('should register a new user with dynamic details and then delete them', () => {

    // Generate random user details
    const randomString = Math.random().toString(36).substring(2, 8);
    const randomFirstName = `Tejaswini_${randomString}`;
    const randomLastName = `H_${randomString}`;
    const randomEmail = `tejaswini_${randomString}@yopmail.com`;
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipcode = faker.location.zipCode('######');
    const mobile_number = faker.phone.number('9#########');

    // Store user data in an object
    const userData = {
      first_name: randomFirstName,
      last_name: randomLastName,
      email: randomEmail,
      address,
      city,
      state,
      zipcode,
      mobile_number
    };

    // Visit the registration page
    cy.visit('/');
    cy.get('.shop-menu > .navbar-nav > li:nth-child(4) > a').click();
    cy.get('input[data-qa=signup-name]').type(randomFirstName);
    cy.get('input[data-qa=signup-email]').type(randomEmail);
    cy.get('.signup-form > form > button').click();

    // Fill registration form
    cy.get('#id_gender2').click();
    cy.get('[data-qa="password"]').type('Test@123');
    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('August');
    cy.get('[data-qa="years"]').select('2001');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(randomFirstName);
    cy.get('[data-qa="last_name"]').type(randomLastName);
    cy.get('[data-qa="address"]').type(address);
    cy.get('[data-qa="country"]').select('India');
    cy.get('[data-qa="state"]').type(state);
    cy.get('[data-qa="city"]').type(city);
    cy.get('[data-qa="zipcode"]').type(zipcode);
    cy.get('[data-qa="mobile_number"]').type(mobile_number);
    cy.get('[data-qa="create-account"]').click();
    cy.get('.title.text-center').should('contain', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

    // Login after registration
    cy.get('input[data-qa="login-email"]', { timeout: 10000 }).should('be.visible').type(randomEmail)
    cy.get('input[data-qa="login-password"]').type('Test@123');
    cy.get('.login-form > form > button').click();
    cy.get('.shop-menu > .nav > :nth-child(10) > a').should('contain', 'Logged in as ' + randomFirstName);

    // Delete User
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

  });

});

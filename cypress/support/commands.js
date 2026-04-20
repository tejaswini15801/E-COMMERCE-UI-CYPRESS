import { faker } from '@faker-js/faker';

 // Generate random user details
    const randomString = Math.random().toString(36).substring(2, 8);
    const randomFirstName = `Tejaswini_${randomString}`;
    const randomLastName = `Mali_${randomString}`;
    const randomEmail = `tejaswini_${randomString}@yopmail.com`;
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipcode = faker.location.zipCode('######');
    const mobile_number = faker.phone.number('9#########');

Cypress.Commands.add('register', () => {

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

    // Save user data to a JSON file
    
    // cy.writeFile('cypress/fixtures/createdUsers.json', userData, { flag: 'a+' });
    const filePath = 'cypress/fixtures/createdUsers.json';

        cy.task('fileExists', filePath).then((exists) => {
            if (exists) {
                cy.readFile(filePath).then((data) => {
                    data.push(userData);
                    cy.writeFile(filePath, data);
                });
            } else {
                cy.writeFile(filePath, [userData]);
            }
        });

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
  
  });

// Save data to Cypress.env so it's available globally

Cypress.Commands.add('login', () => {
  cy.fixture('createdUsers.json').then((users) => {
    // Pick the last created user
    const user = users[users.length - 1];

    cy.visit('/');
    cy.get('.shop-menu > .navbar-nav > li:nth-child(4) > a').click();
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type('Test@123');
    cy.get('[data-qa="login-button"]').click();

    // Confirm login worked
    cy.contains(`Logged in as ${user.first_name}`).should('be.visible');
  });
});

//Search based command
Cypress.Commands.add("addProductByName", (name) => {
  cy.get(".material-icons.card_travel").click();
  cy.get(".form-control.input-lg").type(name);
  //cy.get("input[placeholder='Search']").type(name);
  cy.get(".btn.btn-default.btn-lg").click();
  cy.get('.productinfo > .btn').click();
});


// To get the last user
Cypress.Commands.add('getLastUser', () => {
  return cy.fixture('createdUsers.json').then((users) => {
    const user = users[users.length - 1];
    return cy.wrap(user);   // wrap so it can be used in .then()
  });
});


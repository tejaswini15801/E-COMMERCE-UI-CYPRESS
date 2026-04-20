import { TESTDATA } from "../support/Constants";

describe('Address Verification in checkout page', () => {

    //beforeEach(() => {
    // Block ad/analytics requests so they don’t clutter Cypress logs
    // This stubs those requests (so they don’t really go to the ad server anymore). That means they won’t affect your test outcome.
  //   cy.intercept('GET', '**adtrafficquality.google/**', {
  //     statusCode: 204,
  //     body: {}
  //   }).as('blockedAds');
  // });

    it('should verify the user address after registration', () => {
      cy.getLastUser().then((user) => {
        cy.register();
        cy.login();
        cy.addProductByName('Blue Top');
        cy.get('[href="/view_cart"]').last().click();
        cy.get('.btn.btn-default.check_out').click();
        cy.get('.address_firstname.address_lastname').should('contain', user.first_name + ' ' + user.last_name);
        cy.get('.address_address1.address_address2').should('contain', user.address);
        cy.get('.address_city.address_state_name.address_postcode').should('contain', user.city + ' ' + user.state + ' ' + user.zipcode)
        cy.get('.address_country_name').should('contain', 'India');
        cy.get('.address_phone').should('contain', user.mobile_number);

        //cy.get("button[type='submit']").click();
      })
    });
});
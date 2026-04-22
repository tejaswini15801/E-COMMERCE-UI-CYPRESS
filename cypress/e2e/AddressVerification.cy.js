describe('Address Verification in checkout page', () => {

  beforeEach(() => {
    cy.login(); // logs in last created user
  });

  it('should verify the user address after registration', () => {

    cy.getLastUser().then((newUser) => {   // ✅ FIX: fetch user here

      cy.addProductByName('Blue Top');
      cy.get('[href="/view_cart"]').last().click();
      cy.get('.btn.btn-default.check_out').click();

      cy.visit('/checkout')                                        // 1. navigate first
      cy.get('.checkout-information').should('be.visible')         // 2. wait for page
      cy.get('#address_invoice').within(() => {                   // 3. then assert
        cy.get('.address_firstname.address_lastname')
          .should('contain', `Mrs. ${newUser.first_name} ${newUser.last_name}`)

        cy.get('li.address_address1.address_address2').then(($address) => {
          const fullAddressText = $address.text().trim();
          expect(fullAddressText).to.contain(newUser.address); // ✅ check address
          // .should('contain', newUser.address)

        })

        cy.get('.address_city.address_state_name.address_postcode')
          .should('contain', newUser.city)
          .and('contain', newUser.state)
          .and('contain', newUser.zipcode);

        cy.get('.address_country_name')
          .should('contain', 'India'); // ✅ you selected India during registration

        cy.get('.address_phone')
          .should('contain', newUser.mobile_number);
      });
    });

  });
})
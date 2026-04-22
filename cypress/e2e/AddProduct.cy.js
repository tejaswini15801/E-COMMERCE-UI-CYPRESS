describe('Add Product', () => {

  beforeEach(() => {
    cy.login(); // Reuse login logic before every test
  });


  // Test to add a product to the cart
  it('should add a product to the cart', () => {
    cy.visit('/');
    cy.get('.product-image-wrapper').first().click();
    cy.get('.btn.btn-default.add-to-cart').first().click();
    // cy.get('.btn.btn-default.add-to-cart').click({ multiple: true });
    // cy.get('.btn.btn-default.add-to-cart').then(() => {});

    // Confirm product added to cart
    cy.wait(1000); // Wait for the modal to appear
    cy.get('.modal-title').should('contain', 'Added!');

    // Navigate to cart
    cy.get('[href="/view_cart"]').last().click();   // OR cy.get('u').click();

    // 

  });

});

/**
 * This class represents the home page of the application.
 * It contains methods for interacting with the home page elements and performing actions such as
 * searching for a product, adding a product to the cart, and verifying the success message.
 *
 * The class follows the Page Object Model (POM) design pattern, which promotes code reusability
 * and maintainability by separating the test logic from the page-specific functionality.
 */
export class homePage {
  /**
   * An object containing the CSS selectors or locators for various elements on the home page.
   * These locators are used to identify and interact with the corresponding elements.
   */
  webLocators = {
    searchInput: ".form-control.input-lg", // Locator for the search input field
    searchBtn: "button[class='btn btn-default btn-lg']", // Locator for the search button
    addToCartBtn: "Add to Cart", // Locator for the "Add to Cart" button
    successMessage: ".alert.alert-success.alert-dismissible", // Locator for the success message element
  };

  /**
   * Method to search for a product on the home page.
   *
   * @param {string} product - The name of the product to search for.
   * @returns {homePage} - The instance of the homePage class for chaining methods.
   */
  searchProduct(product) {
    cy.get(this.webLocators.searchInput).type(product); // Type the product name in the search input field
    cy.get(this.webLocators.searchBtn).click(); // Click the search button
    return this; // Return the instance for method chaining
  }

  /**
   * Method to add a product to the cart.
   *
   * @returns {homePage} - The instance of the homePage class for chaining methods.
   */
  addToCart() {
    cy.contains(this.webLocators.addToCartBtn).first().click(); // Click the "Add to Cart" button for the first matching product
    return this; // Return the instance for method chaining
  }

  /**
   * Method to verify the success message after adding a product to the cart.
   *
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object for further assertions.
   */
  verifySuccessMessage() {
    return cy.get(this.webLocators.successMessage); // Return the Cypress chainable object for the success message element
  }
}

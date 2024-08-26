/**
 * This file contains the test suite for the home page workflow of the application.
 * It imports the necessary classes and data, creates instances of the homePage and loginPage classes,
 * and defines a test case for searching for a product, adding it to the cart, and verifying the success message.
 *
 * The test suite is written using the Cypress testing framework and follows the
 * Page Object Model (POM) design pattern for better code organization and maintainability.
 */

// Import the homePage class from the homePage.js file
// The homePage class encapsulates the functionality and selectors related to the home page
import { homePage } from "../../pages/homePage.js";

// Import the loginPage class from the loginPage.js file
// The loginPage class encapsulates the functionality and selectors related to the login page
import { loginPage } from "../../pages/loginPage.js";

// Import the homePageData object from the homePageData.json file
// The homePageData object contains test data related to the home page, such as product names and expected messages
import homePageData from "../../fixtures/homePageData.json";

// Import the loginData object from the loginData.json file
// The loginData object contains test data for different user accounts
import loginData from "../../fixtures/loginData.json";

// Create an instance of the homePage class
// This instance will be used to interact with the home page elements and functionality
const homePageObj = new homePage();

// Create an instance of the loginPage class
// This instance will be used to interact with the login page elements and functionality
const loginPageObj = new loginPage();

/**
 * Describe block for the "HomePage Workflow" test suite.
 * This suite contains test cases related to the home page functionality.
 *
 * The describe block is a way to group related tests together and provide a descriptive label.
 * It helps in organizing and structuring the test suite.
 */
describe("HomePage Workflow", () => {
  // Skip the test suite if the 'testPermissionGranted' environment variable is not set
  // This check is useful for running tests conditionally based on certain environment variables
  before(() => {
    if (!Cypress.env("testPermissionGranted")) this.skip();
  });

  // Before hook to perform login with test user credentials
  // This hook runs before each test case in the suite
  before("Login", () => {
    cy.login(loginData.testUser2.email, loginData.testUser2.password);
  });

  /**
   * Test case to search for a product, add it to the cart, and verify the success message.
   *
   * This test case performs the following steps:
   * 1. Search for a product using the product name from the homePageData fixture
   * 2. Add the searched product to the cart
   * 3. Verify that the success message is displayed and contains the expected text from the homePageData fixture
   * 4. Assert that the success message element is visible
   */
  it("Search product, add to cart", () => {
    homePageObj.searchProduct(homePageData.product.name).addToCart();
    homePageObj.verifySuccessMessage().should(($element) => {
      expect($element).to.contain(homePageData.messages.success); // Assert that the element contains the expected text
      expect($element).to.be.visible; // Assert that the element is visible
    });
  });
});

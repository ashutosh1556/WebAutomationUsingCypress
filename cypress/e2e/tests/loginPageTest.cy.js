/**
 * This file contains the test suite for the login functionality of the application.
 * It imports the necessary classes and data, creates an instance of the loginPage class,
 * and defines a test case for logging in to the application.
 *
 * The test suite is written using the Cypress testing framework and follows the
 * Page Object Model (POM) design pattern for better code organization and maintainability.
 */

// Import the loginPage class from the loginPage.js file
// The loginPage class encapsulates the functionality and selectors related to the login page
import { loginPage } from "../../pages/loginPage.js";

// Import the loginData object from the loginData.json file
// The loginData object contains test data for different user accounts
import loginData from "../../fixtures/loginData.json";

// Create an instance of the loginPage class
// This instance will be used to interact with the login page elements and functionality
const loginPageObj = new loginPage();

/**
 * Describe block for the "Login" test suite.
 * This suite contains test cases related to the login functionality.
 *
 * The describe block is a way to group related tests together and provide a descriptive label.
 * It helps in organizing and structuring the test suite.
 */
describe("Login Workflow", () => {
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

  // Test case to validate successful login
  it("Validate Successfull login", () => {
    // Call the verifySucessMessage method from the loginPage class
    // This method is responsible for verifying the successful login message
    loginPageObj.verifySucessMessage().should(($element) => {
      // Assert that the element contains the text "My Account"
      expect($element).to.contain("My Account");
      // Assert that the element is visible
      expect($element).to.be.visible;
    });
  });
});

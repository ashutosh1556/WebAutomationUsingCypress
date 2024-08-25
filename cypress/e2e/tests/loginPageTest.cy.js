/**
 * This file contains the test suite for the login functionality of the application.
 * It imports the necessary classes and data, creates an instance of the loginPage class,
 * and defines a test case for logging in to the application.
 */

// Import the loginPage class from the loginPage.js file
import { loginPage } from "../../pages/loginPage.js";

// Import the loginData object from the loginData.json file
import loginData from "../../fixtures/loginData.json";

// Create an instance of the loginPage class
const loginPageObj = new loginPage();

/**
 * Describe block for the "Login" test suite.
 * This suite contains test cases related to the login functionality.
 */
describe("Login Workflow", () => {
  // Skip the test suite if the 'testPermissionGranted' environment variable is not set
  before(() => {
    if (!Cypress.env("testPermissionGranted")) this.skip();
  });

  before("Login", () => {
    cy.login(loginData.testUser2.email, loginData.testUser2.password);
  });

  it("Validate Successfull login", () => {
    loginPageObj
      .verifySucessMessage() // Verify the successful login message
      .should(($element) => {
        expect($element).to.contain("My Account1"); // Assert that the element contains the text "My Account"
        expect($element).to.be.visible; // Assert that the element is visible
      });
  });
});

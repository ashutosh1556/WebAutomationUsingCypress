/**
 * This file contains the test suite for the registration workflow of the application.
 * It imports the necessary classes and data, creates an instance of the registrationPage class,
 * and defines a test case for registering a new user and verifying the error message.
 *
 * The test suite is written using the Cypress testing framework and follows the
 * Page Object Model (POM) design pattern for better code organization and maintainability.
 */

// Import the registrationPage class from the registrationPage.js file
// The registrationPage class encapsulates the functionality and selectors related to the registration page
import { registrationPage } from "../../pages/registrationPage.js";

// Import the registrationData object from the registrationData.json file
// The registrationData object contains test data related to the registration process, such as user information and expected error messages
import registrationData from "../../fixtures/registrationData.json";

// Create an instance of the registrationPage class
// This instance will be used to interact with the registration page elements and functionality
const registrationPageObj = new registrationPage();

/**
 * Describe block for the "Registration Workflow" test suite.
 * This suite contains test cases related to the registration functionality.
 *
 * The describe block is a way to group related tests together and provide a descriptive label.
 * It helps in organizing and structuring the test suite.
 */
describe("Registration Workflow", () => {
  // Skip the test suite if the 'testPermissionGranted' environment variable is not set
  // This check is useful for running tests conditionally based on certain environment variables
  before(() => {
    if (!Cypress.env("testPermissionGranted")) this.skip();
  });

  /**
   * Test case to register a new user and verify the error message.
   *
   * This test case performs the following steps:
   * 1. Open the application URL
   * 2. Enter the first name from the registrationData fixture
   * 3. Enter the last name from the registrationData fixture
   * 4. Enter the email from the registrationData fixture
   * 5. Enter the telephone number from the registrationData fixture
   * 6. Enter the password from the registrationData fixture
   * 7. Confirm the password from the registrationData fixture
   * 8. Accept the privacy policy
   * 9. Click the continue button
   * 10. Verify that the error message element is visible
   * 11. Assert that the error message displayed matches the expected error message from the registrationData fixture
   */
  it("should register a new user", () => {
    registrationPageObj
      .openURL()
      .enterFirstName(registrationData.FirstName)
      .enterLastName(registrationData.LastName)
      .enterEmail(registrationData.Email)
      .enterTelephone(registrationData.Telephone)
      .enterPassword(registrationData.Password)
      .confirmPassword(registrationData.ConfirmPassword)
      .acceptPrivacyPolicy()
      .clickContinueButton()
      .verifyErrorMessage()
      .should("be.visible")
      .contains(registrationData.ErrorMessage);
  });
});

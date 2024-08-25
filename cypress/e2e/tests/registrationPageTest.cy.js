// Import the registrationPage class from the registrationPage module
import { registrationPage } from "../../pages/registrationPage.js";

// Import the registration data from the registrationData.json fixture file
import registrationData from "../../fixtures/registrationData.json";

// Create a new instance of the registerPage class
const registrationPageObj = new registrationPage();

// Describe the test suite for validating the registration workflow
describe("Registration Workflow", () => {
  // Skip the test suite if the 'testPermissionGranted' environment variable is not set
  before(() => {
    if (!Cypress.env("testPermissionGranted")) this.skip();
  });

  // Test case to register a new user
  it("should register a new user", () => {
    // Chain the following actions on the registerationPage instance
    registrationPageObj
      .openURL() // Open the application URL
      .enterFirstName(registrationData.FirstName) // Enter the first name from the registration data
      .enterLastName(registrationData.LastName) // Enter the last name from the registration data
      .enterEmail(registrationData.Email) // Enter the email from the registration data
      .enterTelephone(registrationData.Telephone) // Enter the telephone number from the registration data
      .enterPassword(registrationData.Password) // Enter the password from the registration data
      .confirmPassword(registrationData.ConfirmPassword) // Confirm the password from the registration data
      .acceptPrivacyPolicy() // Accept the privacy policy
      .clickContinueButton() // Click the continue button
      .verifyErrorMessage()
      .should("be.visible") // Assert that the error message element is visible
      .contains(registrationData.ErrorMessage); // Verify that the expected error message is displayed
  });
});

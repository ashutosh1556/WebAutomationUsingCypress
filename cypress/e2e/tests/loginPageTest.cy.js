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
describe("Login", () => {
  it("Login to the application", () => {
    // Chain the following methods:
    loginPageObj
      .openURL() // Open the homepage URL
      .navigateToLoginPage() // Navigate to the login page
      .enterEmail(loginData.email) // Enter the email from the loginData object
      .enterPassword(loginData.password) // Enter the password from the loginData object
      .clickLoginBtn() // Click the login button
      .verifySucessMessage(); // Verify the successful login message
  });
});

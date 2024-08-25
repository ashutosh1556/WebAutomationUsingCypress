/**
 * This class represents the login page of the application.
 * It contains methods for performing various actions on the login page,
 * such as opening the URL, navigating to the login page, entering credentials,
 * clicking the login button, and verifying the successful login.
 */
export class loginPage {
  /**
   * An object containing CSS selectors for various web elements on the login page.
   * @property {string} myAccountHyperlink - Selector for the "My Account" hyperlink.
   * @property {string} loginHyperlink - Selector for the "Login" hyperlink.
   * @property {string} emailInput - Selector for the email input field.
   * @property {string} passwordInput - Selector for the password input field.
   * @property {string} loginBtn - Selector for the login button.
   * @property {string} myAccountText - Selector for the "My Account" text after successful login.
   */
  webLocators = {
    myAccountHyperlink:
      "a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']",
    loginHyperlink:
      "#top-links > ul > li.dropdown.open > ul > li:nth-child(2) > a",
    emailInput: "#input-email",
    passwordInput: "#input-password",
    loginBtn: "input[value='Login']",
    myAccountText: "h2:nth-child(1)",
  };

  /**
   * Opens the homepage URL.
   * @returns {loginPage} The current instance for method chaining.
   */
  openURL() {
    // Visit the homepage URL from the Cypress environment variables
    // cy.visit(Cypress.env("homePageURL"));
    cy.visit(Cypress.env("baseURL") + Cypress.env("homePageURL"));
    return this;
  }

  /**
   * Navigates to the login page by clicking the "My Account" and "Login" hyperlinks.
   * @returns {loginPage} The current instance for method chaining.
   */
  navigateToLoginPage() {
    cy.get(this.webLocators.myAccountHyperlink).click({ force: true }); // Click the "My Account" hyperlink (force click to bypass any issues)
    cy.get(this.webLocators.loginHyperlink).click({ force: true }); // Click the "Login" hyperlink (force click to bypass any issues)
    return this;
  }

  /**
   * Enters the provided email address in the email input field.
   * @param {string} email - The email address to be entered.
   * @returns {loginPage} The current instance for method chaining.
   */
  enterEmail(email) {
    cy.get(this.webLocators.emailInput).type(email); // Find the email input field and type the provided email address
    return this;
  }

  /**
   * Enters the provided password in the password input field.
   * @param {string} password - The password to be entered.
   * @returns {loginPage} The current instance for method chaining.
   */
  enterPassword(password) {
    cy.get(this.webLocators.passwordInput).type(password); // Find the password input field and type the provided password
    return this;
  }

  /**
   * Clicks the login button.
   * @returns {loginPage} The current instance for method chaining.
   */
  clickLoginBtn() {
    cy.get(this.webLocators.loginBtn).click(); // Find the login button and click it
    return this;
  }

  /**
   * Verifies the successful login message by checking if the "My Account" text is present and visible.
   * @returns {loginPage} The current instance for method chaining.
   */
  verifySucessMessage() {
    return cy.get(this.webLocators.myAccountText); // Find the "My Account" text element
    return this;
  }
}

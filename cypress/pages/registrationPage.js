// This class represents the registration page and contains methods to interact with its elements
export class registrationPage {
  // Object containing CSS selectors for various web elements
  WebLocators = {
    firstNameInputField: "#input-firstname", // Selector for the first name input field
    lastNameInputField: "#input-lastname", // Selector for the last name input field
    emailInputField: "#input-email", // Selector for the email input field
    telephoneInputField: "#input-telephone", // Selector for the telephone input field
    passwordInputField: "#input-password", // Selector for the password input field
    confirmPasswordInputField: "#input-confirm", // Selector for the confirm password input field
    privacyPolicyCheckBox: "input[name='agree']", // Selector for the privacy policy checkbox
    continueButton: 'input[type="submit"]', // Selector for the continue button
    errorMessage: ".alert.alert-danger.alert-dismissible",
  };
  /*
   * Method to open the application URL in the browser
   * @returns {registerPage} - The current instance of the registerPage class
   */
  openURL() {
    // Visit the URL specified in the Cypress environment variable 'registrationPageURL'
    cy.visit(Cypress.env("registrationPageURL"));

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to enter the first name in the input field
   * @param {string} firstName - The first name to be entered
   * @returns {registerPage} - The current instance of the registerPage class
   */
  enterFirstName(firstName) {
    // Get the first name input field element
    cy.get(this.WebLocators.firstNameInputField)
      .should("be.visible") // Assert that the input field is visible
      .clear() // Clear any existing text in the input field
      .type(firstName, { force: true }); // Type the provided first name, forcing the action if needed

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to enter the last name in the input field
   * @param {string} lastName - The last name to be entered
   * @returns {registerPage} - The current instance of the registerPage class
   */
  enterLastName(lastName) {
    // Get the last name input field element
    cy.get(this.WebLocators.lastNameInputField)
      .should("be.visible") // Assert that the input field is visible
      .clear() // Clear any existing text in the input field
      .type(lastName, { force: true }); // Type the provided last name, forcing the action if needed

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to enter the email address in the input field
   * @param {string} email - The email address to be entered
   * @returns {registerPage} - The current instance of the registerPage class
   */
  enterEmail(email) {
    // Get the email input field element
    cy.get(this.WebLocators.emailInputField)
      .should("be.visible") // Assert that the input field is visible
      .clear() // Clear any existing text in the input field
      .type(email, { force: true }); // Type the provided email address, forcing the action if needed

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to enter the telephone number in the input field
   * @param {string} telephone - The telephone number to be entered
   * @returns {registerPage} - The current instance of the registerPage class
   */
  enterTelephone(telephone) {
    // Get the telephone input field element
    cy.get(this.WebLocators.telephoneInputField)
      .should("be.visible") // Assert that the input field is visible
      .clear() // Clear any existing text in the input field
      .type(telephone, { force: true }); // Type the provided telephone number, forcing the action if needed

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to enter the password in the input field
   * @param {string} password - The password to be entered
   * @returns {registerPage} - The current instance of the registerPage class
   */
  enterPassword(password) {
    // Get the password input field element
    cy.get(this.WebLocators.passwordInputField)
      .should("be.visible") // Assert that the input field is visible
      .clear() // Clear any existing text in the input field
      .type(password, { force: true }); // Type the provided password, forcing the action if needed

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to confirm the password in the input field
   * @param {string} confirmPassword - The password to be confirmed
   * @returns {registerPage} - The current instance of the registerPage class
   */
  confirmPassword(confirmPassword) {
    // Get the confirm password input field element
    cy.get(this.WebLocators.confirmPasswordInputField)
      .should("be.visible") // Assert that the input field is visible
      .clear() // Clear any existing text in the input field
      .type(confirmPassword, { force: true }); // Type the provided password confirmation, forcing the action if needed

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to check the privacy policy checkbox
   * @returns {registerPage} - The current instance of the registerPage class
   */
  acceptPrivacyPolicy() {
    // Get the privacy policy checkbox element
    cy.get(this.WebLocators.privacyPolicyCheckBox)
      .should("be.visible") // Assert that the checkbox is visible
      .check({ force: true }); // Check the checkbox, forcing the action if needed

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to click the continue button
   * @returns {void}
   */
  clickContinueButton() {
    // Get the continue button element
    cy.get(this.WebLocators.continueButton)
      .should("be.visible") // Assert that the button is visible
      .click(); // Click the continue button

    // Return the current instance of the registerPage class for method chaining
    return this;
  }

  /*
   * Method to verify the error message displayed on the page
   * Checks if the error message element is visible and contains the expected text
   * @returns {void}
   */
  verifyErrorMessage() {
    // Get the error message element using the CSS selector from WebLocators
    cy.get(this.WebLocators.errorMessage)
      // Assert that the error message element is visible
      .should("be.visible")
      // Assert that the error message element contains the expected text
      .contains(" Warning: E-Mail Address is already registered!");

    // Return the current instance of the registerPage class for method chaining
    return this;
  }
}

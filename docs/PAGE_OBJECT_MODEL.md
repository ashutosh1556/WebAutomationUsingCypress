# Page Object Model (POM) Guide

This guide explains how to implement and use the Page Object Model pattern in Cypress tests.

## Table of Contents

1. [What is Page Object Model?](#what-is-page-object-model)
2. [Why Use POM?](#why-use-pom)
3. [POM Structure](#pom-structure)
4. [Creating Page Objects](#creating-page-objects)
5. [Best Practices](#best-practices)
6. [Advanced Patterns](#advanced-patterns)
7. [Examples](#examples)

## What is Page Object Model?

The Page Object Model (POM) is a design pattern that creates an object repository for web UI elements. It helps make tests more maintainable and reduces code duplication by separating test logic from page-specific code.

### Key Concepts

- **Page Object**: A class representing a web page or component
- **Locators**: Element selectors stored in one place
- **Methods**: Actions that can be performed on the page
- **Separation**: Test logic separate from page interactions

## Why Use POM?

### Benefits

1. **Maintainability**: Update selectors in one place
2. **Reusability**: Use the same methods across multiple tests
3. **Readability**: Tests read like plain English
4. **Reduced Duplication**: Don't repeat selector definitions
5. **Easy Updates**: When UI changes, update only page objects

### Without POM

```javascript
// ❌ Repeated selectors, hard to maintain
it("should login", () => {
  cy.get("#input-email").type("test@example.com");
  cy.get("#input-password").type("password123");
  cy.get("input[value='Login']").click();
});

it("should show error for invalid login", () => {
  cy.get("#input-email").type("invalid@example.com");
  cy.get("#input-password").type("wrongpass");
  cy.get("input[value='Login']").click();
});
```

### With POM

```javascript
// ✅ Clean, maintainable, reusable
it("should login", () => {
  loginPageObj
    .enterEmail("test@example.com")
    .enterPassword("password123")
    .clickLoginBtn();
});

it("should show error for invalid login", () => {
  loginPageObj
    .enterEmail("invalid@example.com")
    .enterPassword("wrongpass")
    .clickLoginBtn()
    .verifyErrorMessage();
});
```

## POM Structure

### Basic Page Object Structure

```javascript
export class PageName {
  // 1. Define all locators
  webLocators = {
    element1: "selector1",
    element2: "selector2"
  };

  // 2. Create methods for page actions
  actionMethod() {
    cy.get(this.webLocators.element1).click();
    return this; // Enable method chaining
  }

  // 3. Create methods for assertions
  verifyElement() {
    return cy.get(this.webLocators.element1);
  }
}
```

### File Organization

```
cypress/
└── pages/
    ├── loginPage.js          # Login page object
    ├── registrationPage.js   # Registration page object
    ├── homePage.js           # Home page object
    └── components/           # Reusable components
        ├── header.js
        └── footer.js
```

## Creating Page Objects

### Step 1: Identify Page Elements

First, identify all elements you'll interact with:

```javascript
// Elements on login page:
// - Email input field
// - Password input field
// - Login button
// - Error message
// - Success message
```

### Step 2: Define Locators

```javascript
export class loginPage {
  webLocators = {
    // Input fields
    emailInput: "#input-email",
    passwordInput: "#input-password",
    
    // Buttons
    loginBtn: "input[value='Login']",
    
    // Messages
    errorMessage: ".alert-danger",
    successMessage: "h2:nth-child(1)",
    
    // Navigation
    myAccountLink: "a[title='My Account']",
    loginLink: "#top-links > ul > li.dropdown.open > ul > li:nth-child(2) > a"
  };
}
```

### Step 3: Create Action Methods

```javascript
export class loginPage {
  webLocators = {
    emailInput: "#input-email",
    passwordInput: "#input-password",
    loginBtn: "input[value='Login']"
  };

  // Navigation methods
  openURL() {
    cy.visit(Cypress.env("baseURL") + Cypress.env("loginPageURL"));
    return this;
  }

  navigateToLoginPage() {
    cy.get(this.webLocators.myAccountLink).click();
    cy.get(this.webLocators.loginLink).click();
    return this;
  }

  // Input methods
  enterEmail(email) {
    cy.get(this.webLocators.emailInput).clear().type(email);
    return this;
  }

  enterPassword(password) {
    cy.get(this.webLocators.passwordInput).clear().type(password);
    return this;
  }

  // Action methods
  clickLoginBtn() {
    cy.get(this.webLocators.loginBtn).click();
    return this;
  }

  // Composite methods
  login(email, password) {
    this.enterEmail(email)
        .enterPassword(password)
        .clickLoginBtn();
    return this;
  }
}
```

### Step 4: Create Verification Methods

```javascript
export class loginPage {
  // ... previous code ...

  // Verification methods return Cypress chainable for assertions
  verifySuccessMessage() {
    return cy.get(this.webLocators.successMessage);
  }

  verifyErrorMessage() {
    return cy.get(this.webLocators.errorMessage);
  }

  verifyEmailFieldVisible() {
    return cy.get(this.webLocators.emailInput).should("be.visible");
  }
}
```

### Step 5: Use in Tests

```javascript
import { loginPage } from "../../pages/loginPage.js";
import loginData from "../../fixtures/loginData.json";

const loginPageObj = new loginPage();

describe("Login Tests", () => {
  beforeEach(() => {
    loginPageObj.openURL();
  });

  it("should login successfully", () => {
    loginPageObj
      .login(loginData.validUser.email, loginData.validUser.password)
      .verifySuccessMessage()
      .should("contain", "My Account");
  });

  it("should show error for invalid credentials", () => {
    loginPageObj
      .login(loginData.invalidUser.email, loginData.invalidUser.password)
      .verifyErrorMessage()
      .should("be.visible")
      .and("contain", "Warning");
  });
});
```

## Best Practices

### 1. Return 'this' for Method Chaining

```javascript
// ✅ Good: Return 'this' for chaining
enterEmail(email) {
  cy.get(this.webLocators.emailInput).type(email);
  return this; // Enables chaining
}

// ❌ Bad: No return value
enterEmail(email) {
  cy.get(this.webLocators.emailInput).type(email);
}
```

### 2. Use Descriptive Method Names

```javascript
// ✅ Good: Clear, descriptive names
clickLoginButton()
enterEmailAddress(email)
verifySuccessMessage()

// ❌ Bad: Vague names
click()
input(text)
check()
```

### 3. Keep Locators in One Place

```javascript
// ✅ Good: All locators in webLocators object
webLocators = {
  emailInput: "#input-email",
  passwordInput: "#input-password"
};

// ❌ Bad: Locators scattered in methods
enterEmail(email) {
  cy.get("#input-email").type(email); // Hardcoded selector
}
```

### 4. Separate Actions from Assertions

```javascript
// ✅ Good: Separate concerns
clickLoginBtn() {
  cy.get(this.webLocators.loginBtn).click();
  return this;
}

verifySuccessMessage() {
  return cy.get(this.webLocators.successMessage);
}

// ❌ Bad: Mixed concerns
clickLoginBtn() {
  cy.get(this.webLocators.loginBtn).click();
  cy.get(this.webLocators.successMessage).should("be.visible"); // Assertion in action
  return this;
}
```

### 5. Use Data Attributes for Selectors

```javascript
// ✅ Best: Data attributes (most stable)
webLocators = {
  loginBtn: "[data-testid='login-button']"
};

// ✅ Good: IDs (stable)
webLocators = {
  emailInput: "#input-email"
};

// ⚠️ Okay: Classes (can change)
webLocators = {
  errorMessage: ".alert-danger"
};

// ❌ Bad: Complex CSS (brittle)
webLocators = {
  loginBtn: "div > form > div:nth-child(3) > button"
};
```

### 6. Create Composite Methods

```javascript
// ✅ Good: High-level method for common workflows
login(email, password) {
  this.enterEmail(email)
      .enterPassword(password)
      .clickLoginBtn();
  return this;
}

// Usage in test
loginPageObj.login("test@example.com", "password123");
```

### 7. Add JSDoc Comments

```javascript
/**
 * Enters the email address in the email input field
 * @param {string} email - The email address to enter
 * @returns {loginPage} The loginPage instance for method chaining
 * @example
 * loginPageObj.enterEmail("test@example.com");
 */
enterEmail(email) {
  cy.get(this.webLocators.emailInput).type(email);
  return this;
}
```

## Advanced Patterns

### 1. Component-Based Page Objects

For reusable components like headers, footers, modals:

```javascript
// cypress/pages/components/header.js
export class Header {
  webLocators = {
    logo: ".logo",
    searchInput: "#search",
    cartIcon: ".cart-icon",
    userMenu: ".user-menu"
  };

  clickLogo() {
    cy.get(this.webLocators.logo).click();
    return this;
  }

  searchProduct(productName) {
    cy.get(this.webLocators.searchInput).type(productName);
    return this;
  }
}

// Use in page objects
import { Header } from "./components/header.js";

export class homePage {
  header = new Header();

  searchForProduct(product) {
    this.header.searchProduct(product);
    return this;
  }
}
```

### 2. Base Page Object

Create a base class with common methods:

```javascript
// cypress/pages/basePage.js
export class BasePage {
  visit(url) {
    cy.visit(url);
    return this;
  }

  getTitle() {
    return cy.title();
  }

  waitForPageLoad() {
    cy.get("body").should("be.visible");
    return this;
  }
}

// Extend in specific pages
import { BasePage } from "./basePage.js";

export class loginPage extends BasePage {
  webLocators = {
    emailInput: "#input-email"
  };

  openLoginPage() {
    this.visit("/login");
    return this;
  }
}
```

### 3. Fluent Interface Pattern

```javascript
export class loginPage {
  // ... locators ...

  // Fluent methods
  with = {
    email: (email) => {
      cy.get(this.webLocators.emailInput).type(email);
      return this;
    },
    password: (password) => {
      cy.get(this.webLocators.passwordInput).type(password);
      return this;
    }
  };

  submit() {
    cy.get(this.webLocators.loginBtn).click();
    return this;
  }
}

// Usage
loginPageObj
  .with.email("test@example.com")
  .with.password("password123")
  .submit();
```

### 4. Page Object with Getters

```javascript
export class loginPage {
  // Getters for elements
  get emailInput() {
    return cy.get("#input-email");
  }

  get passwordInput() {
    return cy.get("#input-password");
  }

  get loginBtn() {
    return cy.get("input[value='Login']");
  }

  // Methods using getters
  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.loginBtn.click();
    return this;
  }
}
```

## Examples

### Complete Login Page Object

```javascript
/**
 * Login Page Object
 * Handles all interactions with the login page
 */
export class loginPage {
  /**
   * Web element locators
   */
  webLocators = {
    // Navigation
    myAccountLink: "a[title='My Account']",
    loginLink: "#top-links > ul > li.dropdown.open > ul > li:nth-child(2) > a",
    
    // Form fields
    emailInput: "#input-email",
    passwordInput: "#input-password",
    
    // Buttons
    loginBtn: "input[value='Login']",
    forgotPasswordLink: "a[href*='forgotten']",
    
    // Messages
    successMessage: "h2:nth-child(1)",
    errorMessage: ".alert-danger"
  };

  /**
   * Navigate to the application home page
   */
  openURL() {
    cy.visit(Cypress.env("baseURL") + Cypress.env("homePageURL"));
    return this;
  }

  /**
   * Navigate to login page from home page
   */
  navigateToLoginPage() {
    cy.get(this.webLocators.myAccountLink).click({ force: true });
    cy.get(this.webLocators.loginLink).click({ force: true });
    return this;
  }

  /**
   * Enter email address
   * @param {string} email - Email address
   */
  enterEmail(email) {
    cy.get(this.webLocators.emailInput).clear().type(email);
    return this;
  }

  /**
   * Enter password
   * @param {string} password - Password
   */
  enterPassword(password) {
    cy.get(this.webLocators.passwordInput).clear().type(password);
    return this;
  }

  /**
   * Click login button
   */
  clickLoginBtn() {
    cy.get(this.webLocators.loginBtn).click();
    return this;
  }

  /**
   * Complete login workflow
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  login(email, password) {
    this.enterEmail(email)
        .enterPassword(password)
        .clickLoginBtn();
    return this;
  }

  /**
   * Verify success message after login
   */
  verifySuccessMessage() {
    return cy.get(this.webLocators.successMessage);
  }

  /**
   * Verify error message for failed login
   */
  verifyErrorMessage() {
    return cy.get(this.webLocators.errorMessage);
  }

  /**
   * Click forgot password link
   */
  clickForgotPassword() {
    cy.get(this.webLocators.forgotPasswordLink).click();
    return this;
  }
}
```

### Using the Page Object in Tests

```javascript
import { loginPage } from "../../pages/loginPage.js";
import loginData from "../../fixtures/loginData.json";

const loginPageObj = new loginPage();

describe("Login Functionality", () => {
  beforeEach(() => {
    loginPageObj.openURL().navigateToLoginPage();
  });

  it("should login with valid credentials", () => {
    const { email, password } = loginData.validUser;
    
    loginPageObj
      .login(email, password)
      .verifySuccessMessage()
      .should("be.visible")
      .and("contain", "My Account");
  });

  it("should show error with invalid credentials", () => {
    const { email, password } = loginData.invalidUser;
    
    loginPageObj
      .login(email, password)
      .verifyErrorMessage()
      .should("be.visible")
      .and("contain", "Warning");
  });

  it("should navigate to forgot password page", () => {
    loginPageObj.clickForgotPassword();
    cy.url().should("include", "forgotten");
  });

  it("should validate empty email", () => {
    loginPageObj
      .enterPassword("password123")
      .clickLoginBtn()
      .verifyErrorMessage()
      .should("be.visible");
  });
});
```

## Summary

The Page Object Model is a powerful pattern that:

- **Improves maintainability** by centralizing element locators
- **Enhances reusability** through shared methods
- **Increases readability** with descriptive method names
- **Reduces duplication** across test files
- **Simplifies updates** when UI changes

By following these guidelines and best practices, you'll create a robust, maintainable test automation framework.

## Additional Resources

- [Martin Fowler's Page Object](https://martinfowler.com/bliki/PageObject.html)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Project README](../README.md)

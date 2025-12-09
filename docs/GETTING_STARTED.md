# Getting Started with Cypress Testing Framework

This guide will help you get started with the Cypress testing framework and understand how to write and run tests.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Understanding the Project Structure](#understanding-the-project-structure)
3. [Your First Test](#your-first-test)
4. [Page Object Model Basics](#page-object-model-basics)
5. [Working with Fixtures](#working-with-fixtures)
6. [Custom Commands](#custom-commands)
7. [Running Tests](#running-tests)
8. [Next Steps](#next-steps)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Open Cypress Test Runner

```bash
npm run cypress:open
```

This opens the interactive Cypress Test Runner where you can:
- See all your test files
- Run tests in different browsers
- Watch tests run in real-time
- Debug tests easily

### 3. Run Your First Test

In the Cypress Test Runner:
1. Click on "E2E Testing"
2. Select a browser (Chrome recommended for beginners)
3. Click on any test file (try `loginPageTest.cy.js`)
4. Watch the test run!

## Understanding the Project Structure

```
cypress/
├── e2e/
│   └── tests/              # Your test files go here
│       ├── loginPageTest.cy.js
│       ├── registrationPageTest.cy.js
│       └── homePageTest.cy.js
├── fixtures/               # Test data (JSON files)
│   ├── loginData.json
│   └── registrationData.json
├── pages/                  # Page Object Model classes
│   ├── loginPage.js
│   └── registrationPage.js
└── support/
    ├── commands.js         # Custom Cypress commands
    └── e2e.js             # Global configuration
```

### Key Concepts

- **Tests**: Located in `cypress/e2e/tests/` - These are your actual test files
- **Page Objects**: Located in `cypress/pages/` - Reusable page interaction classes
- **Fixtures**: Located in `cypress/fixtures/` - Test data in JSON format
- **Commands**: Located in `cypress/support/commands.js` - Reusable custom commands

## Your First Test

Let's break down a simple test:

```javascript
// Import the page object
import { loginPage } from "../../pages/loginPage.js";
import loginData from "../../fixtures/loginData.json";

// Create an instance of the page object
const loginPageObj = new loginPage();

// Describe block groups related tests
describe("Login Tests", () => {
  
  // This runs before each test
  beforeEach(() => {
    // Visit the login page
    loginPageObj.openURL().navigateToLoginPage();
  });

  // Individual test case
  it("should login with valid credentials", () => {
    // Arrange - Get test data
    const { email, password } = loginData.testUser2;
    
    // Act - Perform actions
    loginPageObj
      .enterEmail(email)
      .enterPassword(password)
      .clickLoginBtn();
    
    // Assert - Verify results
    loginPageObj
      .verifySucessMessage()
      .should("be.visible")
      .and("contain", "My Account");
  });
});
```

### Test Structure Explained

1. **Import Dependencies**: Bring in page objects and test data
2. **Describe Block**: Groups related tests together
3. **Hooks**: `before`, `beforeEach`, `after`, `afterEach` for setup/cleanup
4. **Test Cases**: Individual `it` blocks containing test logic
5. **Assertions**: Verify expected outcomes using `.should()`

## Page Object Model Basics

The Page Object Model (POM) separates test logic from page interactions.

### Creating a Page Object

```javascript
// cypress/pages/loginPage.js
export class loginPage {
  // Define all selectors in one place
  webLocators = {
    emailInput: "#input-email",
    passwordInput: "#input-password",
    loginBtn: "input[value='Login']",
    successMessage: "h2:nth-child(1)"
  };

  // Method to enter email
  enterEmail(email) {
    cy.get(this.webLocators.emailInput).type(email);
    return this; // Return 'this' for method chaining
  }

  // Method to enter password
  enterPassword(password) {
    cy.get(this.webLocators.passwordInput).type(password);
    return this;
  }

  // Method to click login button
  clickLoginBtn() {
    cy.get(this.webLocators.loginBtn).click();
    return this;
  }

  // Method to verify success message
  verifySucessMessage() {
    return cy.get(this.webLocators.successMessage);
  }
}
```

### Using the Page Object

```javascript
import { loginPage } from "../../pages/loginPage.js";

const loginPageObj = new loginPage();

// Method chaining makes tests readable
loginPageObj
  .enterEmail("test@example.com")
  .enterPassword("password123")
  .clickLoginBtn();
```

### Benefits of POM

- **Maintainability**: Change selectors in one place
- **Reusability**: Use the same methods across multiple tests
- **Readability**: Tests read like plain English
- **Separation of Concerns**: Test logic separate from page interactions

## Working with Fixtures

Fixtures store test data in JSON format, making tests data-driven.

### Creating a Fixture

```json
// cypress/fixtures/loginData.json
{
  "validUser": {
    "email": "test@example.com",
    "password": "ValidPass123!"
  },
  "invalidUser": {
    "email": "invalid@example.com",
    "password": "WrongPass"
  }
}
```

### Using Fixtures in Tests

**Method 1: Import directly**

```javascript
import loginData from "../../fixtures/loginData.json";

it("should login with valid credentials", () => {
  const { email, password } = loginData.validUser;
  loginPageObj.enterEmail(email).enterPassword(password).clickLoginBtn();
});
```

**Method 2: Load with cy.fixture()**

```javascript
it("should login with valid credentials", () => {
  cy.fixture("loginData").then((data) => {
    loginPageObj
      .enterEmail(data.validUser.email)
      .enterPassword(data.validUser.password)
      .clickLoginBtn();
  });
});
```

## Custom Commands

Custom commands are reusable functions that simplify common operations.

### Defining Custom Commands

```javascript
// cypress/support/commands.js
Cypress.Commands.add("login", (email, password) => {
  cy.visit(Cypress.env("baseURL") + Cypress.env("loginPageURL"));
  cy.get("#input-email").type(email);
  cy.get("#input-password").type(password);
  cy.get("input[value='Login']").click();
});
```

### Using Custom Commands

```javascript
// In any test file
cy.login("test@example.com", "password123");
```

### When to Create Custom Commands

- Repeated actions across multiple tests
- Complex sequences that need abstraction
- Actions that need to be standardized

## Running Tests

### Interactive Mode (Recommended for Development)

```bash
npm run cypress:open
```

**Benefits:**
- Visual feedback
- Easy debugging
- Time travel through test steps
- Automatic reloading on file changes

### Headless Mode (For CI/CD)

```bash
# Run all tests
npm run cypress:run

# Run specific test file
npx cypress run --spec "cypress/e2e/tests/loginPageTest.cy.js"

# Run in specific browser
npx cypress run --browser firefox

# Run with specific configuration
npx cypress run --config viewportWidth=1920,viewportHeight=1080
```

### Running Specific Tests

```bash
# Run login tests only
npm run cypress:login

# Run registration tests only
npm run cypress:register

# Run home page tests only
npm run cypress:addToCart
```

## Next Steps

Now that you understand the basics, here's what to explore next:

### 1. Write Your Own Test

Try creating a new test file:

```javascript
// cypress/e2e/tests/myFirstTest.cy.js
describe("My First Test", () => {
  it("should visit the home page", () => {
    cy.visit("https://naveenautomationlabs.com/opencart/");
    cy.title().should("include", "Your Store");
  });
});
```

### 2. Create a New Page Object

Practice creating a page object for a new page in the application.

### 3. Add Test Data

Create a new fixture file with test data for your tests.

### 4. Explore Cypress Commands

Learn more Cypress commands:
- `cy.get()` - Select elements
- `cy.click()` - Click elements
- `cy.type()` - Type into inputs
- `cy.should()` - Make assertions
- `cy.intercept()` - Intercept network requests
- `cy.wait()` - Wait for conditions

### 5. Read the Documentation

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress API Documentation](https://docs.cypress.io/api/table-of-contents)
- [Project README](../README.md)

## Common Patterns

### Test with Multiple Data Sets

```javascript
const testUsers = [
  { email: "user1@test.com", password: "pass1" },
  { email: "user2@test.com", password: "pass2" }
];

testUsers.forEach((user) => {
  it(`should login with ${user.email}`, () => {
    cy.login(user.email, user.password);
    // assertions...
  });
});
```

### Conditional Testing

```javascript
it("should run only if permission granted", () => {
  if (!Cypress.env("testPermissionGranted")) {
    cy.log("Test skipped - permission not granted");
    return;
  }
  // test logic...
});
```

### Retry Failed Tests

```javascript
// In cypress.config.js
retries: {
  runMode: 2,    // Retry 2 times in headless mode
  openMode: 0    // Don't retry in interactive mode
}
```

## Tips for Success

1. **Start Small**: Begin with simple tests and gradually add complexity
2. **Use the Test Runner**: The interactive mode is your best friend for learning
3. **Read Error Messages**: Cypress provides detailed error messages
4. **Use cy.log()**: Add logging to understand test flow
5. **Take Screenshots**: Use `cy.screenshot()` for debugging
6. **Watch Videos**: Cypress records videos of test runs
7. **Ask for Help**: Check the [Cypress Discord](https://discord.gg/cypress) or [GitHub Discussions](https://github.com/cypress-io/cypress/discussions)

## Troubleshooting

### Test Fails with "Element not found"

```javascript
// Add explicit wait
cy.get("#element", { timeout: 10000 }).should("be.visible");

// Or wait for element to exist
cy.get("#element").should("exist");
```

### Test is Flaky

```javascript
// Use proper waits instead of cy.wait(milliseconds)
cy.intercept("GET", "/api/data").as("getData");
cy.wait("@getData");

// Or wait for element state
cy.get("#button").should("be.enabled").click();
```

### Need to Debug

```javascript
// Add debugger
cy.get("#element").debug();

// Or pause test
cy.pause();

// Or add logging
cy.log("Current step: Clicking submit button");
```

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Examples](https://example.cypress.io/)
- [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app)
- [Project README](../README.md)
- [Contributing Guide](../CONTRIBUTING.md)

Happy Testing! 🚀

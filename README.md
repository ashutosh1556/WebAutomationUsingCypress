# Web Automation Using Cypress

[![Cypress Tests](https://github.com/ashutosh1556/WebAutomationUsingCypress/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/ashutosh1556/WebAutomationUsingCypress/actions/workflows/cypress-tests.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

A comprehensive Cypress testing framework demonstrating best practices for web automation testing using the Page Object Model (POM) design pattern. This project includes examples of login, registration, and e-commerce workflows with detailed documentation and reusable components.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Page Object Model](#page-object-model)
- [Custom Commands](#custom-commands)
- [Test Reports](#test-reports)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **Custom Commands**: Reusable Cypress commands for common operations
- **Test Data Management**: JSON fixtures for managing test data
- **Parallel Execution**: Support for running tests in parallel
- **Retry Logic**: Automatic retry for flaky tests
- **Multiple Browsers**: Support for Chrome, Firefox, and other browsers
- **HTML Reports**: Beautiful test reports using Mochawesome
- **ESLint Integration**: Code quality checks with Cypress-specific rules
- **CI/CD Ready**: Easy integration with GitHub Actions and other CI tools

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/ashutosh1556/WebAutomationUsingCypress.git
cd WebAutomationUsingCypress
```

2. **Install dependencies**

```bash
npm install
```

3. **Verify installation**

```bash
npx cypress verify
```

## Project Structure

```
WebAutomationUsingCypress/
├── cypress/
│   ├── e2e/
│   │   ├── tests/                    # Test files
│   │   │   ├── homePageTest.cy.js
│   │   │   ├── loginPageTest.cy.js
│   │   │   └── registrationPageTest.cy.js
│   │   ├── 1-getting-started/        # Cypress example tests
│   │   └── 2-advanced-examples/      # Advanced Cypress examples
│   ├── fixtures/                     # Test data files
│   │   ├── homePageData.json
│   │   ├── loginData.json
│   │   └── registrationData.json
│   ├── pages/                        # Page Object Model classes
│   │   ├── homePage.js
│   │   ├── loginPage.js
│   │   └── registrationPage.js
│   └── support/
│       ├── commands.js               # Custom Cypress commands
│       └── e2e.js                    # Global configuration
├── cypress.config.js                 # Cypress configuration
├── eslint.config.mjs                 # ESLint configuration
├── package.json                      # Project dependencies
└── README.md                         # This file
```

## Configuration

### Cypress Configuration

The `cypress.config.js` file contains all Cypress settings:

```javascript
// Key configurations
env: {
  testPermissionGranted: true,
  baseURL: "https://naveenautomationlabs.com/opencart/index.php?",
  homePageURL: "route=common/home",
  registrationPageURL: "route=account/register",
  loginPageURL: "route=account/login"
}
```

### Environment Variables

You can override environment variables:

```bash
# Via command line
npx cypress run --env testPermissionGranted=false

# Via cypress.env.json (create this file)
{
  "testPermissionGranted": true,
  "baseURL": "https://your-app-url.com"
}
```

## Running Tests

### Interactive Mode (Cypress Test Runner)

Open the Cypress Test Runner to run tests interactively:

```bash
npm run cypress:open
```

### Headless Mode (Command Line)

Run all tests in headless mode:

```bash
npm run cypress:run
```

### Run Specific Tests

```bash
# Run login tests
npm run cypress:login

# Run registration tests
npm run cypress:register

# Run home page tests (add to cart)
npm run cypress:addToCart
```

### Run Tests in Different Browsers

```bash
# Chrome (default)
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge

# Electron (headless)
npx cypress run --browser electron
```

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/tests/loginPageTest.cy.js"
```

## Writing Tests

### Basic Test Structure

```javascript
import { loginPage } from "../../pages/loginPage.js";
import loginData from "../../fixtures/loginData.json";

const loginPageObj = new loginPage();

describe("Login Workflow", () => {
  before(() => {
    // Runs once before all tests
    cy.login(loginData.testUser2.email, loginData.testUser2.password);
  });

  it("should login successfully", () => {
    loginPageObj
      .verifySucessMessage()
      .should("be.visible")
      .and("contain", "My Account");
  });
});
```

### Using Fixtures

Fixtures store test data in JSON format:

```javascript
// cypress/fixtures/loginData.json
{
  "testUser2": {
    "email": "test.qa@dispostable.com",
    "password": "Cypress123!!"
  }
}

// In your test
import loginData from "../../fixtures/loginData.json";
cy.login(loginData.testUser2.email, loginData.testUser2.password);
```

## Page Object Model

### Creating a Page Object

```javascript
// cypress/pages/loginPage.js
export class loginPage {
  webLocators = {
    emailInput: "#input-email",
    passwordInput: "#input-password",
    loginBtn: "input[value='Login']"
  };

  enterEmail(email) {
    cy.get(this.webLocators.emailInput).type(email);
    return this; // Enable method chaining
  }

  enterPassword(password) {
    cy.get(this.webLocators.passwordInput).type(password);
    return this;
  }

  clickLoginBtn() {
    cy.get(this.webLocators.loginBtn).click();
    return this;
  }
}
```

### Using Page Objects in Tests

```javascript
import { loginPage } from "../../pages/loginPage.js";

const loginPageObj = new loginPage();

it("should login", () => {
  loginPageObj
    .enterEmail("test@example.com")
    .enterPassword("password123")
    .clickLoginBtn();
});
```

## Custom Commands

Custom commands are defined in `cypress/support/commands.js`:

```javascript
// Login command
Cypress.Commands.add("login", (email, password) => {
  cy.visit(Cypress.env("baseURL") + Cypress.env("loginPageURL"));
  cy.get("#input-email").type(email);
  cy.get("#input-password").type(password);
  cy.get("input[value='Login']").click();
});

// Usage in tests
cy.login("test@example.com", "password123");
```

## Test Reports

This project uses **Mochawesome** for generating beautiful HTML reports.

### Viewing Reports

After running tests, reports are generated in the `cypress/reports` directory:

```bash
# Run tests
npm run cypress:run

# Reports will be in:
# cypress/reports/html/index.html
```

### Report Configuration

Configure reports in `cypress.config.js`:

```javascript
reporter: "cypress-mochawesome-reporter",
reporterOptions: {
  charts: true,
  reportPageTitle: "Mochawesome Report",
  embeddedScreenshots: true,
  inlineAssets: true
}
```

## Best Practices

### 1. Use Page Object Model

- Keep selectors in page objects
- Make methods return `this` for chaining
- Use descriptive method names

### 2. Test Data Management

- Store test data in fixtures
- Use different data sets for different scenarios
- Never hardcode sensitive data

### 3. Custom Commands

- Create reusable commands for common operations
- Keep commands simple and focused
- Document command parameters

### 4. Assertions

- Use meaningful assertions
- Chain assertions when possible
- Verify both positive and negative scenarios

### 5. Test Organization

- Group related tests in describe blocks
- Use descriptive test names
- Keep tests independent

### 6. Selectors

- Prefer data attributes over CSS classes
- Use stable selectors
- Avoid brittle selectors (nth-child, etc.)

### 7. Waits and Timeouts

- Avoid `cy.wait()` with fixed times
- Use `cy.intercept()` for API calls
- Let Cypress handle automatic waiting

## Code Quality

### Running ESLint

```bash
npm run lint
```

### ESLint Rules

The project includes Cypress-specific ESLint rules:

- No unnecessary waiting
- No force actions (when possible)
- No async tests
- Assertions before screenshots

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "element not found"
- **Solution**: Check if selectors are correct, ensure page is fully loaded

**Issue**: Tests are flaky
- **Solution**: Enable retries in `cypress.config.js`, use proper waits

**Issue**: Cannot run tests in headed mode
- **Solution**: Ensure browser is installed, try different browser

### Debug Mode

Run tests with debug output:

```bash
DEBUG=cypress:* npm run cypress:run
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)

## Author

**Ashutosh Verma** - [GitHub](https://github.com/ashutosh1556)

## Acknowledgments

- Cypress.io team for the amazing testing framework
- OpenCart demo site for providing a test environment
- The open-source community for inspiration and support


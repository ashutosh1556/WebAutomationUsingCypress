# Quick Reference Guide

A cheat sheet for common tasks and commands in this Cypress testing framework.

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/ashutosh1556/WebAutomationUsingCypress.git
cd WebAutomationUsingCypress

# Install dependencies
npm install

# Verify installation
npx cypress verify
```

## Running Tests

```bash
# Interactive mode (Test Runner)
npm run cypress:open

# Headless mode (all tests)
npm run cypress:run

# Specific test suites
npm run cypress:login        # Login tests
npm run cypress:register     # Registration tests
npm run cypress:addToCart    # E-commerce tests

# Specific test file
npx cypress run --spec "cypress/e2e/tests/loginPageTest.cy.js"

# Specific browser
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## Common Cypress Commands

```javascript
// Navigation
cy.visit("/")
cy.go("back")
cy.reload()

// Element Selection
cy.get("#id")
cy.get(".class")
cy.get("[data-testid='button']")
cy.contains("text")

// Actions
cy.click()
cy.type("text")
cy.clear()
cy.check()
cy.uncheck()
cy.select("option")

// Assertions
.should("be.visible")
.should("exist")
.should("contain", "text")
.should("have.value", "value")
.should("have.length", 5)

// Waits
cy.wait(1000)                    // Fixed wait (avoid)
cy.wait("@apiRequest")           // Wait for intercept
cy.get("#element", { timeout: 10000 })

// Network
cy.intercept("GET", "/api/data").as("getData")
cy.wait("@getData")

// Custom Commands
cy.login(email, password)
```

## Page Object Pattern

```javascript
// Define page object
export class PageName {
  webLocators = {
    element: "#selector"
  };

  actionMethod() {
    cy.get(this.webLocators.element).click();
    return this;  // Enable chaining
  }

  verifyMethod() {
    return cy.get(this.webLocators.element);
  }
}

// Use in test
import { PageName } from "../../pages/pageName.js";
const pageObj = new PageName();

pageObj
  .actionMethod()
  .verifyMethod()
  .should("be.visible");
```

## Test Structure

```javascript
describe("Feature Name", () => {
  before(() => {
    // Runs once before all tests
  });

  beforeEach(() => {
    // Runs before each test
    cy.visit("/");
  });

  it("should do something", () => {
    // Arrange
    const testData = { email: "test@example.com" };
    
    // Act
    cy.get("#email").type(testData.email);
    cy.get("#submit").click();
    
    // Assert
    cy.get("#message").should("contain", "Success");
  });

  afterEach(() => {
    // Runs after each test
  });

  after(() => {
    // Runs once after all tests
  });
});
```

## Fixtures

```javascript
// Load fixture
import testData from "../../fixtures/loginData.json";

// Use in test
cy.login(testData.testUser2.email, testData.testUser2.password);

// Or with cy.fixture()
cy.fixture("loginData").then((data) => {
  cy.login(data.testUser2.email, data.testUser2.password);
});
```

## Custom Commands

```javascript
// Define in cypress/support/commands.js
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#submit").click();
});

// Use in tests
cy.login("test@example.com", "password123");
```

## Environment Variables

```javascript
// Access in tests
Cypress.env("baseURL")
Cypress.env("testPermissionGranted")

// Set via command line
npx cypress run --env baseURL=https://example.com

// Set in cypress.config.js
env: {
  baseURL: "https://example.com"
}

// Set in cypress.env.json
{
  "baseURL": "https://example.com"
}
```

## Debugging

```javascript
// Pause test
cy.pause()

// Debug element
cy.get("#element").debug()

// Log message
cy.log("Current step: Clicking button")

// Screenshot
cy.screenshot("screenshot-name")

// Console log
cy.get("#element").then(($el) => {
  console.log("Element:", $el);
});

// Debugger
cy.get("#element").then(() => {
  debugger;
});
```

## Assertions

```javascript
// Visibility
.should("be.visible")
.should("not.be.visible")
.should("exist")
.should("not.exist")

// Text
.should("contain", "text")
.should("have.text", "exact text")

// Value
.should("have.value", "value")

// Attributes
.should("have.attr", "href", "/path")
.should("have.class", "active")

// State
.should("be.enabled")
.should("be.disabled")
.should("be.checked")

// Length
.should("have.length", 5)
.should("have.length.greaterThan", 0)

// Custom
.should(($el) => {
  expect($el).to.have.length(3);
  expect($el.text()).to.include("text");
});
```

## Network Interception

```javascript
// Intercept and wait
cy.intercept("GET", "/api/users").as("getUsers");
cy.wait("@getUsers");

// Intercept and modify
cy.intercept("GET", "/api/users", {
  statusCode: 200,
  body: { users: [] }
});

// Intercept with callback
cy.intercept("POST", "/api/login", (req) => {
  req.reply({
    statusCode: 200,
    body: { token: "fake-token" }
  });
});
```

## File Operations

```javascript
// Read file
cy.readFile("path/to/file.json")

// Write file
cy.writeFile("path/to/file.json", { data: "value" })

// Upload file
cy.get("input[type='file']").selectFile("cypress/fixtures/file.json")
```

## Viewport

```javascript
// Set viewport
cy.viewport(1280, 720)
cy.viewport("iphone-6")
cy.viewport("ipad-2")

// Common sizes
cy.viewport(375, 667)   // iPhone 6/7/8
cy.viewport(768, 1024)  // iPad
cy.viewport(1920, 1080) // Desktop
```

## Useful Selectors

```javascript
// Best: Data attributes
cy.get("[data-testid='submit-button']")

// Good: IDs
cy.get("#submit-button")

// Okay: Classes
cy.get(".btn-primary")

// Avoid: Complex CSS
cy.get("div > form > div:nth-child(3) > button")

// Text content
cy.contains("Submit")
cy.contains("button", "Submit")
```

## Common Patterns

```javascript
// Conditional testing
cy.get("body").then(($body) => {
  if ($body.find(".modal").length > 0) {
    cy.get(".modal-close").click();
  }
});

// Multiple elements
cy.get(".item").first()
cy.get(".item").last()
cy.get(".item").eq(2)

// Chaining
cy.get("#element")
  .should("be.visible")
  .and("contain", "text")
  .click();

// Aliases
cy.get("#element").as("myElement");
cy.get("@myElement").click();

// Within
cy.get(".form").within(() => {
  cy.get("#email").type("test@example.com");
  cy.get("#submit").click();
});
```

## Configuration

```javascript
// cypress.config.js
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://example.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});
```

## Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npx eslint **/*.js --fix
```

## Project Structure

```
cypress/
├── e2e/tests/          # Test files (*.cy.js)
├── fixtures/           # Test data (*.json)
├── pages/              # Page objects (*.js)
└── support/
    ├── commands.js     # Custom commands
    └── e2e.js         # Global config
```

## Helpful Links

- **Documentation**: [docs/](docs/)
- **Getting Started**: [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md)
- **Page Object Model**: [docs/PAGE_OBJECT_MODEL.md](docs/PAGE_OBJECT_MODEL.md)
- **Examples**: [docs/EXAMPLES.md](docs/EXAMPLES.md)
- **Troubleshooting**: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- **FAQ**: [docs/FAQ.md](docs/FAQ.md)
- **Cypress Docs**: [docs.cypress.io](https://docs.cypress.io/)

## Tips

1. Use data attributes for stable selectors
2. Avoid fixed waits, use assertions instead
3. Keep tests independent
4. Clear state between tests
5. Use Page Object Model for maintainability
6. Mock external dependencies
7. Run tests in CI/CD
8. Review test videos for failures
9. Use meaningful test names
10. Document complex logic

---

**Need more help?** Check the [full documentation](docs/) or open an [issue](https://github.com/ashutosh1556/WebAutomationUsingCypress/issues).

# Troubleshooting Guide

Common issues and solutions when working with this Cypress testing framework.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Test Execution Issues](#test-execution-issues)
3. [Element Selection Issues](#element-selection-issues)
4. [Flaky Tests](#flaky-tests)
5. [Configuration Issues](#configuration-issues)
6. [Browser Issues](#browser-issues)
7. [Network Issues](#network-issues)
8. [Debugging Tips](#debugging-tips)

## Installation Issues

### Issue: npm install fails

**Symptoms:**
```bash
npm ERR! code ELIFECYCLE
npm ERR! errno 1
```

**Solutions:**

1. **Clear npm cache**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. **Check Node.js version**
```bash
node --version  # Should be v14 or higher
```

3. **Update npm**
```bash
npm install -g npm@latest
```

### Issue: Cypress binary not found

**Symptoms:**
```bash
The cypress npm package is installed, but the Cypress binary is missing
```

**Solutions:**

1. **Reinstall Cypress**
```bash
npm uninstall cypress
npm install cypress --save-dev
```

2. **Verify Cypress**
```bash
npx cypress verify
```

3. **Clear Cypress cache**
```bash
npx cypress cache clear
npx cypress install
```

## Test Execution Issues

### Issue: Tests fail with "element not found"

**Symptoms:**
```
CypressError: Timed out retrying: Expected to find element: '#input-email', but never found it.
```

**Solutions:**

1. **Check if selector is correct**
```javascript
// Open browser dev tools and verify selector
cy.get("#input-email").should("exist");
```

2. **Wait for element to appear**
```javascript
cy.get("#input-email", { timeout: 10000 }).should("be.visible");
```

3. **Check if element is in iframe**
```javascript
cy.iframe().find("#input-email").type("test@example.com");
```

4. **Verify page has loaded**
```javascript
cy.url().should("include", "/login");
cy.get("body").should("be.visible");
```

### Issue: Tests pass locally but fail in CI

**Symptoms:**
- Tests work on your machine
- Same tests fail in GitHub Actions or other CI

**Solutions:**

1. **Add explicit waits**
```javascript
// Wait for network requests
cy.intercept("GET", "/api/data").as("getData");
cy.wait("@getData");

// Wait for element state
cy.get("#button").should("be.enabled");
```

2. **Increase timeouts**
```javascript
// In cypress.config.js
defaultCommandTimeout: 10000,
pageLoadTimeout: 60000
```

3. **Use viewport settings**
```javascript
// In cypress.config.js
viewportWidth: 1280,
viewportHeight: 720
```

4. **Check for timing issues**
```javascript
// Add retry logic
cy.get("#element", { timeout: 10000 })
  .should("be.visible")
  .click({ force: true });
```

### Issue: Test hangs or times out

**Symptoms:**
- Test runs indefinitely
- Eventually times out

**Solutions:**

1. **Check for infinite loops**
```javascript
// ❌ Bad: Infinite loop
while (true) {
  cy.get("#element").click();
}

// ✅ Good: Conditional loop
let attempts = 0;
const maxAttempts = 5;
while (attempts < maxAttempts) {
  cy.get("#element").click();
  attempts++;
}
```

2. **Avoid unnecessary waits**
```javascript
// ❌ Bad: Fixed wait
cy.wait(5000);

// ✅ Good: Wait for condition
cy.get("#element").should("be.visible");
```

3. **Check network requests**
```javascript
// Intercept and wait for specific requests
cy.intercept("POST", "/api/login").as("loginRequest");
cy.get("#login-btn").click();
cy.wait("@loginRequest");
```

## Element Selection Issues

### Issue: Element is detached from DOM

**Symptoms:**
```
CypressError: cy.click() failed because this element is detached from the DOM
```

**Solutions:**

1. **Re-query the element**
```javascript
// ❌ Bad: Store element reference
const button = cy.get("#button");
button.click(); // May be detached

// ✅ Good: Query each time
cy.get("#button").click();
```

2. **Wait for element to be stable**
```javascript
cy.get("#button")
  .should("be.visible")
  .and("not.be.disabled")
  .click();
```

### Issue: Element is covered by another element

**Symptoms:**
```
CypressError: cy.click() failed because this element is being covered by another element
```

**Solutions:**

1. **Scroll element into view**
```javascript
cy.get("#button").scrollIntoView().click();
```

2. **Use force click (use sparingly)**
```javascript
cy.get("#button").click({ force: true });
```

3. **Close overlaying element first**
```javascript
cy.get(".modal-close").click();
cy.get("#button").click();
```

### Issue: Multiple elements found

**Symptoms:**
```
CypressError: cy.click() can only be called on a single element. Your subject contained 5 elements.
```

**Solutions:**

1. **Use .first() or .last()**
```javascript
cy.get(".button").first().click();
cy.get(".button").last().click();
```

2. **Use .eq() for specific index**
```javascript
cy.get(".button").eq(2).click(); // Click 3rd button
```

3. **Make selector more specific**
```javascript
// ❌ Bad: Too generic
cy.get(".button").click();

// ✅ Good: More specific
cy.get("#submit-button").click();
cy.get("[data-testid='submit-btn']").click();
```

## Flaky Tests

### Issue: Tests pass/fail randomly

**Symptoms:**
- Test passes sometimes, fails other times
- No code changes between runs

**Solutions:**

1. **Enable retries**
```javascript
// In cypress.config.js
retries: {
  runMode: 2,
  openMode: 0
}
```

2. **Add proper waits**
```javascript
// ❌ Bad: Race condition
cy.get("#button").click();
cy.get("#result").should("contain", "Success");

// ✅ Good: Wait for state
cy.get("#button").click();
cy.get("#button").should("be.disabled"); // Wait for processing
cy.get("#result", { timeout: 10000 }).should("contain", "Success");
```

3. **Avoid time-dependent tests**
```javascript
// ❌ Bad: Depends on current time
const now = new Date();
cy.get("#date").should("contain", now.toISOString());

// ✅ Good: Use fixtures or mocks
cy.clock(new Date(2024, 0, 1));
cy.get("#date").should("contain", "2024-01-01");
```

4. **Clear state between tests**
```javascript
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit("/");
});
```

## Configuration Issues

### Issue: Environment variables not working

**Symptoms:**
```javascript
Cypress.env("baseURL") // Returns undefined
```

**Solutions:**

1. **Check cypress.config.js**
```javascript
module.exports = defineConfig({
  env: {
    baseURL: "https://example.com"
  }
});
```

2. **Create cypress.env.json**
```json
{
  "baseURL": "https://example.com",
  "testPermissionGranted": true
}
```

3. **Pass via command line**
```bash
npx cypress run --env baseURL=https://example.com
```

### Issue: Custom commands not recognized

**Symptoms:**
```
cy.login is not a function
```

**Solutions:**

1. **Check commands.js is imported**
```javascript
// cypress/support/e2e.js
import "./commands";
```

2. **Verify command definition**
```javascript
// cypress/support/commands.js
Cypress.Commands.add("login", (email, password) => {
  // command logic
});
```

3. **Add TypeScript definitions (if using TS)**
```typescript
// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
  }
}
```

## Browser Issues

### Issue: Tests fail in specific browser

**Symptoms:**
- Tests pass in Chrome
- Same tests fail in Firefox

**Solutions:**

1. **Check browser-specific issues**
```javascript
// Conditional logic for different browsers
if (Cypress.browser.name === "firefox") {
  cy.wait(1000); // Firefox needs extra time
}
```

2. **Update browser**
```bash
# Update Chrome
brew upgrade --cask google-chrome

# Update Firefox
brew upgrade --cask firefox
```

3. **Use browser-specific configuration**
```javascript
// In cypress.config.js
e2e: {
  setupNodeEvents(on, config) {
    on("before:browser:launch", (browser, launchOptions) => {
      if (browser.name === "firefox") {
        launchOptions.preferences["network.proxy.type"] = 0;
      }
      return launchOptions;
    });
  }
}
```

### Issue: Browser crashes during test

**Symptoms:**
```
The browser process exited unexpectedly
```

**Solutions:**

1. **Increase memory**
```javascript
// In cypress.config.js
e2e: {
  setupNodeEvents(on, config) {
    on("before:browser:launch", (browser, launchOptions) => {
      if (browser.name === "chrome") {
        launchOptions.args.push("--disable-dev-shm-usage");
        launchOptions.args.push("--no-sandbox");
      }
      return launchOptions;
    });
  }
}
```

2. **Reduce test complexity**
```javascript
// Split large tests into smaller ones
// Avoid too many operations in single test
```

## Network Issues

### Issue: Network requests fail

**Symptoms:**
```
CypressError: cy.wait() timed out waiting for the 1st request to the route: 'getData'
```

**Solutions:**

1. **Increase network timeout**
```javascript
cy.intercept("GET", "/api/data").as("getData");
cy.wait("@getData", { timeout: 30000 });
```

2. **Check if request is actually made**
```javascript
cy.intercept("GET", "/api/data", (req) => {
  console.log("Request made:", req);
}).as("getData");
```

3. **Mock failing requests**
```javascript
cy.intercept("GET", "/api/data", {
  statusCode: 200,
  body: { data: "mocked" }
}).as("getData");
```

### Issue: CORS errors

**Symptoms:**
```
Cross-Origin Request Blocked
```

**Solutions:**

1. **Use cy.origin() for cross-origin**
```javascript
cy.origin("https://other-domain.com", () => {
  cy.visit("/");
  cy.get("#element").click();
});
```

2. **Configure chromeWebSecurity**
```javascript
// In cypress.config.js (use with caution)
chromeWebSecurity: false
```

## Debugging Tips

### Enable Debug Mode

```bash
# Run with debug output
DEBUG=cypress:* npm run cypress:run

# Run specific debug namespace
DEBUG=cypress:server:* npm run cypress:run
```

### Use Cypress Commands

```javascript
// Pause test execution
cy.pause();

// Add debugger
cy.get("#element").debug();

// Log values
cy.log("Current step: Clicking button");

// Take screenshot
cy.screenshot("before-click");

// Print to console
cy.get("#element").then(($el) => {
  console.log("Element:", $el);
});
```

### Use Browser DevTools

1. Open Cypress Test Runner
2. Click on test to run
3. Open browser DevTools (F12)
4. Use debugger statements
5. Inspect elements and network

### Check Test Videos

```javascript
// Videos are saved in cypress/videos/
// Review failed test videos for visual debugging
```

### Use .then() for Debugging

```javascript
cy.get("#element")
  .then(($el) => {
    debugger; // Pause here
    console.log("Element:", $el);
    console.log("Text:", $el.text());
  });
```

## Getting Help

If you're still stuck:

1. **Check Cypress Documentation**: [docs.cypress.io](https://docs.cypress.io/)
2. **Search GitHub Issues**: [github.com/cypress-io/cypress/issues](https://github.com/cypress-io/cypress/issues)
3. **Ask on Discord**: [discord.gg/cypress](https://discord.gg/cypress)
4. **Stack Overflow**: Tag questions with `cypress`
5. **Project Issues**: Open an issue in this repository

## Common Error Messages

| Error | Likely Cause | Solution |
|-------|-------------|----------|
| `Timed out retrying` | Element not found | Check selector, add wait |
| `Element is detached` | DOM updated | Re-query element |
| `Element is covered` | Overlay present | Scroll or close overlay |
| `Multiple elements` | Selector too generic | Make selector specific |
| `cy.wait() timed out` | Network request slow | Increase timeout |
| `Browser crashed` | Memory issue | Reduce test complexity |
| `Command not found` | Custom command issue | Check imports |

## Prevention Tips

1. **Use stable selectors** (data attributes, IDs)
2. **Add explicit waits** for dynamic content
3. **Clear state** between tests
4. **Mock external dependencies** when possible
5. **Keep tests independent** from each other
6. **Use retries** for flaky tests
7. **Run tests locally** before pushing
8. **Review test videos** for failures

Happy Testing! 🐛🔧

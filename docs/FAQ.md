# Frequently Asked Questions (FAQ)

Common questions and answers about this Cypress testing framework.

## General Questions

### What is this project?

This is a comprehensive Cypress testing framework that demonstrates best practices for web automation testing. It uses the Page Object Model (POM) design pattern and includes examples of login, registration, and e-commerce workflows.

### Who is this project for?

- QA Engineers learning Cypress
- Developers wanting to add E2E tests to their projects
- Teams looking for a well-structured test automation framework
- Anyone interested in learning test automation best practices

### What makes this framework different?

- **Well-documented**: Comprehensive guides and examples
- **Best practices**: Follows industry-standard patterns (POM)
- **Production-ready**: Includes CI/CD, reporting, and error handling
- **Educational**: Detailed comments and explanations
- **Maintainable**: Clean code structure and organization

## Installation & Setup

### What are the prerequisites?

- Node.js v14 or higher
- npm (comes with Node.js)
- Git
- A modern web browser (Chrome, Firefox, Edge)

### How do I install the project?

```bash
git clone https://github.com/ashutosh1556/WebAutomationUsingCypress.git
cd WebAutomationUsingCypress
npm install
```

### Why is npm install taking so long?

Cypress downloads a binary on first install, which can take a few minutes depending on your internet connection. This is normal.

### Can I use yarn instead of npm?

Yes! The project works with both npm and yarn:

```bash
yarn install
yarn cypress:open
```

## Running Tests

### How do I run tests?

**Interactive mode (recommended for development):**
```bash
npm run cypress:open
```

**Headless mode (for CI/CD):**
```bash
npm run cypress:run
```

### Can I run tests in different browsers?

Yes! Cypress supports multiple browsers:

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

### How do I run a specific test file?

```bash
npx cypress run --spec "cypress/e2e/tests/loginPageTest.cy.js"
```

### Why are my tests failing?

Common reasons:
1. **Network issues**: Check your internet connection
2. **Selector changes**: The website UI may have changed
3. **Timing issues**: Add proper waits or increase timeouts
4. **Environment variables**: Ensure they're set correctly

See the [Troubleshooting Guide](TROUBLESHOOTING.md) for detailed solutions.

## Page Object Model

### What is Page Object Model (POM)?

POM is a design pattern that creates an object repository for web UI elements. It separates test logic from page-specific code, making tests more maintainable.

### Why use POM?

- **Maintainability**: Update selectors in one place
- **Reusability**: Use the same methods across multiple tests
- **Readability**: Tests read like plain English
- **Reduced duplication**: Don't repeat selector definitions

### How do I create a new page object?

1. Create a new file in `cypress/pages/`
2. Define locators in `webLocators` object
3. Create methods for page actions
4. Return `this` for method chaining

See the [Page Object Model Guide](PAGE_OBJECT_MODEL.md) for details.

### Should I create a page object for every page?

Create page objects for pages you'll test frequently. For one-off tests, you can use Cypress commands directly.

## Test Data

### Where should I store test data?

Store test data in JSON files in the `cypress/fixtures/` directory.

### How do I use fixtures in tests?

```javascript
import testData from "../../fixtures/loginData.json";

it("should login", () => {
  cy.login(testData.testUser2.email, testData.testUser2.password);
});
```

### Can I use environment variables?

Yes! Define them in `cypress.config.js` or `cypress.env.json`:

```javascript
// Access in tests
Cypress.env("baseURL")
```

### How do I handle sensitive data?

- Never commit sensitive data to Git
- Use environment variables
- Create a `cypress.env.json` file (add to .gitignore)
- Use CI/CD secrets for production credentials

## Custom Commands

### What are custom commands?

Custom commands are reusable Cypress functions that simplify common operations.

### How do I create a custom command?

Add to `cypress/support/commands.js`:

```javascript
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#submit").click();
});
```

### When should I create a custom command?

Create custom commands for:
- Actions repeated across multiple tests
- Complex sequences that need abstraction
- Operations that should be standardized

## Test Reports

### How do I view test reports?

After running tests, open `cypress/reports/html/index.html` in a browser.

### Can I customize the reports?

Yes! Configure Mochawesome in `cypress.config.js`:

```javascript
reporterOptions: {
  charts: true,
  reportPageTitle: "My Custom Report",
  embeddedScreenshots: true
}
```

### Where are screenshots and videos saved?

- Screenshots: `cypress/screenshots/`
- Videos: `cypress/videos/`

## CI/CD

### Does this work with GitHub Actions?

Yes! The project includes a GitHub Actions workflow in `.github/workflows/cypress-tests.yml`.

### Can I use this with other CI tools?

Yes! The framework works with:
- Jenkins
- GitLab CI
- CircleCI
- Travis CI
- Azure DevOps

### How do I run tests in CI?

```bash
npm ci  # Install dependencies
npm run cypress:run  # Run tests
```

## Debugging

### How do I debug a failing test?

1. **Use Cypress Test Runner**: Run in interactive mode
2. **Add cy.pause()**: Pause test execution
3. **Use cy.debug()**: Inspect elements
4. **Check screenshots**: Review failure screenshots
5. **Watch videos**: Review test execution videos

### Can I use browser DevTools?

Yes! Open DevTools in the Cypress Test Runner and use debugger statements.

### How do I see console logs?

Console logs appear in the browser console in the Cypress Test Runner.

## Best Practices

### How often should I run tests?

- **Locally**: Before committing code
- **CI/CD**: On every pull request and merge
- **Scheduled**: Nightly for comprehensive suites

### Should I test everything?

Focus on:
- Critical user journeys
- High-risk features
- Frequently used functionality
- Recently changed code

### How do I handle flaky tests?

1. Add proper waits (avoid fixed timeouts)
2. Enable retries in config
3. Use stable selectors
4. Clear state between tests
5. Mock external dependencies

### What should I NOT test with Cypress?

- Third-party services (mock them instead)
- Email delivery (use email testing services)
- SMS/phone calls (use testing APIs)
- Payment processing (use test mode)

## Contributing

### How can I contribute?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

### What should I contribute?

- Bug fixes
- New features
- Documentation improvements
- Test examples
- Performance improvements

### Do I need to follow a coding style?

Yes! Run ESLint before submitting:

```bash
npm run lint
```

## Advanced Topics

### Can I use TypeScript?

Yes! You can migrate to TypeScript:

1. Rename files to `.ts`
2. Add TypeScript dependencies
3. Configure `tsconfig.json`
4. Add type definitions

### How do I test APIs?

Use `cy.request()` for API testing:

```javascript
cy.request("GET", "/api/users").then((response) => {
  expect(response.status).to.eq(200);
});
```

### Can I run tests in parallel?

Yes! Configure in `cypress.config.js`:

```javascript
parallelization: {
  strategy: "spec"
}
```

### How do I handle authentication?

Use custom commands or `cy.session()`:

```javascript
cy.session("user-session", () => {
  cy.login(email, password);
});
```

## Performance

### Why are my tests slow?

Common causes:
- Too many network requests
- Large page loads
- Unnecessary waits
- Complex selectors

### How can I speed up tests?

1. Mock API responses
2. Use `cy.intercept()` to stub requests
3. Minimize page visits
4. Run tests in parallel
5. Use efficient selectors

### Should I run all tests on every commit?

Run critical tests on every commit, full suite nightly or on main branch.

## Support

### Where can I get help?

- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [GitHub Issues](https://github.com/ashutosh1556/WebAutomationUsingCypress/issues)
- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Discord](https://discord.gg/cypress)

### How do I report a bug?

Open an issue on GitHub using the bug report template.

### Can I request a feature?

Yes! Open an issue using the feature request template.

## License

### What license is this project under?

ISC License - see [LICENSE](../LICENSE) file.

### Can I use this in commercial projects?

Yes! The ISC license allows commercial use.

### Do I need to credit this project?

Not required, but appreciated!

---

## Still Have Questions?

- Check the [Documentation](.)
- Open an [Issue](https://github.com/ashutosh1556/WebAutomationUsingCypress/issues)
- Read the [Cypress Docs](https://docs.cypress.io/)

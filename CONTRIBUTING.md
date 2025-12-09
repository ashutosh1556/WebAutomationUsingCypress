# Contributing to Web Automation Using Cypress

First off, thank you for considering contributing to this project! It's people like you that make this framework better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (OS, Node version, Cypress version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternative solutions** you've considered

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Simple issues perfect for newcomers
- `help wanted` - Issues that need attention
- `documentation` - Documentation improvements

### Pull Requests

- Fill in the required template
- Follow the coding standards
- Include appropriate test coverage
- Update documentation as needed
- Ensure all tests pass

## Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/WebAutomationUsingCypress.git
cd WebAutomationUsingCypress
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a branch**

```bash
git checkout -b feature/your-feature-name
```

4. **Make your changes and test**

```bash
npm run cypress:open  # Interactive testing
npm run cypress:run   # Headless testing
npm run lint          # Check code quality
```

## Coding Standards

### JavaScript Style Guide

We follow standard JavaScript conventions with Cypress-specific best practices:

#### General Rules

- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use ES6+ features (arrow functions, destructuring, etc.)

#### Cypress-Specific Rules

```javascript
// ✅ Good: Use data attributes for selectors
cy.get('[data-testid="submit-button"]').click();

// ❌ Bad: Avoid brittle selectors
cy.get('.btn.btn-primary.submit').click();

// ✅ Good: Chain assertions
cy.get('[data-testid="message"]')
  .should('be.visible')
  .and('contain', 'Success');

// ❌ Bad: Separate assertions
cy.get('[data-testid="message"]').should('be.visible');
cy.get('[data-testid="message"]').should('contain', 'Success');

// ✅ Good: Use custom commands
cy.login(email, password);

// ❌ Bad: Repeat login logic
cy.visit('/login');
cy.get('#email').type(email);
cy.get('#password').type(password);
cy.get('#submit').click();
```

### Page Object Model Guidelines

```javascript
// ✅ Good: Return 'this' for method chaining
export class LoginPage {
  enterEmail(email) {
    cy.get(this.webLocators.emailInput).type(email);
    return this; // Enable chaining
  }
}

// ✅ Good: Descriptive method names
loginPageObj.enterEmail('test@example.com').enterPassword('pass123').clickLoginBtn();

// ❌ Bad: Generic method names
loginPageObj.input1('test@example.com').input2('pass123').click();
```

### Test Structure

```javascript
describe('Feature Name', () => {
  // Setup that runs once before all tests
  before(() => {
    // Global setup
  });

  // Setup that runs before each test
  beforeEach(() => {
    // Per-test setup
  });

  // Descriptive test names
  it('should display error message when login fails', () => {
    // Arrange
    const invalidCredentials = { email: 'wrong@test.com', password: 'wrong' };
    
    // Act
    loginPageObj
      .enterEmail(invalidCredentials.email)
      .enterPassword(invalidCredentials.password)
      .clickLoginBtn();
    
    // Assert
    loginPageObj
      .verifyErrorMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  // Cleanup after each test
  afterEach(() => {
    // Per-test cleanup
  });

  // Cleanup after all tests
  after(() => {
    // Global cleanup
  });
});
```

### File Naming Conventions

- Test files: `featureName.cy.js` (e.g., `loginPageTest.cy.js`)
- Page objects: `pageName.js` (e.g., `loginPage.js`)
- Fixtures: `dataName.json` (e.g., `loginData.json`)
- Use camelCase for variables and functions
- Use PascalCase for class names

### Documentation

- Add JSDoc comments for classes and methods
- Include parameter descriptions
- Document return values
- Provide usage examples

```javascript
/**
 * Logs in a user with the provided credentials
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {loginPage} The loginPage instance for method chaining
 * @example
 * loginPageObj.login('user@example.com', 'password123');
 */
login(email, password) {
  this.enterEmail(email).enterPassword(password).clickLoginBtn();
  return this;
}
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(login): add remember me functionality

- Add checkbox to login form
- Store user preference in localStorage
- Auto-fill credentials on return visit

Closes #123

fix(registration): correct email validation regex

The previous regex was too restrictive and rejected valid emails
with plus signs. Updated to accept RFC 5322 compliant addresses.

Fixes #456

docs(readme): update installation instructions

- Add Node.js version requirement
- Include troubleshooting section
- Fix broken links
```

## Pull Request Process

1. **Update documentation** - Ensure README and other docs reflect your changes

2. **Add tests** - Include test coverage for new features

3. **Run the test suite** - Ensure all tests pass

```bash
npm run cypress:run
npm run lint
```

4. **Update CHANGELOG** - Add your changes to the unreleased section

5. **Create Pull Request** - Use the PR template and provide:
   - Clear description of changes
   - Link to related issues
   - Screenshots (if UI changes)
   - Test results

6. **Code Review** - Address feedback from reviewers

7. **Merge** - Once approved, your PR will be merged

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All existing tests pass
- [ ] New tests added
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #(issue number)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## Recognition

Contributors will be recognized in our README and release notes. Thank you for making this project better!

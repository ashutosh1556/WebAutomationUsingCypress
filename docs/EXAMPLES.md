# Test Examples

This document provides practical examples of common testing scenarios using this Cypress framework.

## Table of Contents

1. [Basic Test Examples](#basic-test-examples)
2. [Login Tests](#login-tests)
3. [Registration Tests](#registration-tests)
4. [E-commerce Tests](#e-commerce-tests)
5. [Form Validation Tests](#form-validation-tests)
6. [Data-Driven Tests](#data-driven-tests)
7. [API Integration Tests](#api-integration-tests)
8. [Advanced Examples](#advanced-examples)

## Basic Test Examples

### Simple Page Visit

```javascript
describe("Basic Navigation", () => {
  it("should visit the home page", () => {
    cy.visit("https://naveenautomationlabs.com/opencart/");
    cy.title().should("include", "Your Store");
    cy.url().should("include", "opencart");
  });
});
```

### Element Interaction

```javascript
describe("Element Interactions", () => {
  it("should interact with elements", () => {
    cy.visit("/");
    
    // Click
    cy.get("#button").click();
    
    // Type
    cy.get("#input").type("Hello World");
    
    // Select dropdown
    cy.get("select").select("Option 1");
    
    // Check checkbox
    cy.get("#checkbox").check();
    
    // Verify text
    cy.get("#message").should("contain", "Success");
  });
});
```

## Login Tests

### Valid Login

```javascript
import { loginPage } from "../../pages/loginPage.js";
import loginData from "../../fixtures/loginData.json";

const loginPageObj = new loginPage();

describe("Login - Valid Credentials", () => {
  beforeEach(() => {
    loginPageObj.openURL().navigateToLoginPage();
  });

  it("should login successfully with valid credentials", () => {
    const { email, password } = loginData.testUser2;
    
    loginPageObj
      .enterEmail(email)
      .enterPassword(password)
      .clickLoginBtn();
    
    loginPageObj
      .verifySucessMessage()
      .should("be.visible")
      .and("contain", "My Account");
    
    cy.url().should("include", "account/account");
  });
});
```

### Invalid Login

```javascript
describe("Login - Invalid Credentials", () => {
  beforeEach(() => {
    loginPageObj.openURL().navigateToLoginPage();
  });

  it("should show error with invalid email", () => {
    loginPageObj
      .enterEmail("invalid@example.com")
      .enterPassword("password123")
      .clickLoginBtn();
    
    cy.get(".alert-danger")
      .should("be.visible")
      .and("contain", "Warning");
  });

  it("should show error with empty fields", () => {
    loginPageObj.clickLoginBtn();
    
    cy.get(".alert-danger")
      .should("be.visible");
  });

  it("should show error with invalid password", () => {
    loginPageObj
      .enterEmail(loginData.testUser2.email)
      .enterPassword("wrongpassword")
      .clickLoginBtn();
    
    cy.get(".alert-danger")
      .should("be.visible")
      .and("contain", "Warning");
  });
});
```

### Login with Custom Command

```javascript
describe("Login - Using Custom Command", () => {
  it("should login using custom command", () => {
    cy.login(loginData.testUser2.email, loginData.testUser2.password);
    
    cy.get("h2").should("contain", "My Account");
    cy.url().should("include", "account/account");
  });
});
```

## Registration Tests

### Successful Registration

```javascript
import { registrationPage } from "../../pages/registrationPage.js";

const registrationPageObj = new registrationPage();

describe("Registration - New User", () => {
  it("should register a new user successfully", () => {
    const timestamp = Date.now();
    const newUser = {
      firstName: "John",
      lastName: "Doe",
      email: `john.doe.${timestamp}@example.com`,
      telephone: "1234567890",
      password: "SecurePass123!"
    };

    registrationPageObj
      .openURL()
      .enterFirstName(newUser.firstName)
      .enterLastName(newUser.lastName)
      .enterEmail(newUser.email)
      .enterTelephone(newUser.telephone)
      .enterPassword(newUser.password)
      .confirmPassword(newUser.password)
      .acceptPrivacyPolicy()
      .clickContinueButton();

    cy.get("h1").should("contain", "Your Account Has Been Created!");
  });
});
```

### Registration Validation

```javascript
describe("Registration - Field Validation", () => {
  beforeEach(() => {
    registrationPageObj.openURL();
  });

  it("should show error for existing email", () => {
    registrationPageObj
      .enterFirstName("John")
      .enterLastName("Doe")
      .enterEmail("existing@example.com")
      .enterTelephone("1234567890")
      .enterPassword("Password123!")
      .confirmPassword("Password123!")
      .acceptPrivacyPolicy()
      .clickContinueButton()
      .verifyErrorMessage()
      .should("contain", "E-Mail Address is already registered");
  });

  it("should show error for password mismatch", () => {
    registrationPageObj
      .enterFirstName("John")
      .enterLastName("Doe")
      .enterEmail("new@example.com")
      .enterTelephone("1234567890")
      .enterPassword("Password123!")
      .confirmPassword("DifferentPass123!")
      .acceptPrivacyPolicy()
      .clickContinueButton();

    cy.get(".text-danger")
      .should("contain", "Password confirmation does not match");
  });

  it("should require privacy policy acceptance", () => {
    registrationPageObj
      .enterFirstName("John")
      .enterLastName("Doe")
      .enterEmail("new@example.com")
      .enterTelephone("1234567890")
      .enterPassword("Password123!")
      .confirmPassword("Password123!")
      .clickContinueButton();

    cy.get(".alert-danger")
      .should("be.visible")
      .and("contain", "Warning");
  });
});
```

## E-commerce Tests

### Product Search and Add to Cart

```javascript
import { homePage } from "../../pages/homePage.js";
import homePageData from "../../fixtures/homePageData.json";

const homePageObj = new homePage();

describe("E-commerce - Product Operations", () => {
  before(() => {
    cy.login(loginData.testUser2.email, loginData.testUser2.password);
  });

  it("should search for product and add to cart", () => {
    homePageObj
      .searchProduct(homePageData.product.name)
      .addToCart();

    homePageObj
      .verifySuccessMessage()
      .should("be.visible")
      .and("contain", homePageData.messages.success);
  });

  it("should search for multiple products", () => {
    const products = ["iPhone", "MacBook", "Canon"];

    products.forEach((product) => {
      homePageObj.searchProduct(product);
      cy.get(".product-thumb").should("have.length.greaterThan", 0);
    });
  });

  it("should handle product not found", () => {
    homePageObj.searchProduct("NonExistentProduct123");
    cy.contains("There is no product").should("be.visible");
  });
});
```

### Shopping Cart Operations

```javascript
describe("E-commerce - Shopping Cart", () => {
  beforeEach(() => {
    cy.login(loginData.testUser2.email, loginData.testUser2.password);
  });

  it("should view cart items", () => {
    // Add product to cart
    homePageObj
      .searchProduct("MacBook")
      .addToCart();

    // View cart
    cy.get("#cart").click();
    cy.get(".dropdown-menu").should("be.visible");
    cy.contains("MacBook").should("be.visible");
  });

  it("should update cart quantity", () => {
    homePageObj
      .searchProduct("MacBook")
      .addToCart();

    cy.get("#cart").click();
    cy.contains("View Cart").click();
    
    cy.get("input[name^='quantity']").clear().type("2");
    cy.get("button[data-original-title='Update']").click();
    
    cy.get(".alert-success").should("contain", "Success");
  });

  it("should remove item from cart", () => {
    homePageObj
      .searchProduct("MacBook")
      .addToCart();

    cy.get("#cart").click();
    cy.contains("View Cart").click();
    
    cy.get("button[data-original-title='Remove']").click();
    
    cy.contains("Your shopping cart is empty").should("be.visible");
  });
});
```

## Form Validation Tests

### Email Validation

```javascript
describe("Form Validation - Email", () => {
  const invalidEmails = [
    "invalid",
    "invalid@",
    "@invalid.com",
    "invalid@.com",
    "invalid..test@example.com"
  ];

  beforeEach(() => {
    loginPageObj.openURL().navigateToLoginPage();
  });

  invalidEmails.forEach((email) => {
    it(`should reject invalid email: ${email}`, () => {
      loginPageObj
        .enterEmail(email)
        .enterPassword("password123")
        .clickLoginBtn();

      cy.get(".alert-danger").should("be.visible");
    });
  });
});
```

### Password Validation

```javascript
describe("Form Validation - Password", () => {
  const weakPasswords = [
    "123",           // Too short
    "password",      // No numbers
    "12345678",      // No letters
    "Pass1"          // Too short
  ];

  beforeEach(() => {
    registrationPageObj.openURL();
  });

  weakPasswords.forEach((password) => {
    it(`should reject weak password: ${password}`, () => {
      registrationPageObj
        .enterFirstName("John")
        .enterLastName("Doe")
        .enterEmail("test@example.com")
        .enterTelephone("1234567890")
        .enterPassword(password)
        .confirmPassword(password)
        .acceptPrivacyPolicy()
        .clickContinueButton();

      cy.get(".text-danger").should("be.visible");
    });
  });
});
```

## Data-Driven Tests

### Using Fixtures

```javascript
describe("Data-Driven - Login Tests", () => {
  beforeEach(() => {
    loginPageObj.openURL().navigateToLoginPage();
  });

  it("should test multiple user accounts", () => {
    cy.fixture("loginData").then((data) => {
      Object.values(data).forEach((user) => {
        cy.login(user.email, user.password);
        cy.get("h2").should("contain", "My Account");
        
        // Logout
        cy.get("a[title='My Account']").click();
        cy.contains("Logout").click();
      });
    });
  });
});
```

### Using Arrays

```javascript
describe("Data-Driven - Product Search", () => {
  const products = [
    { name: "MacBook", expectedResults: 1 },
    { name: "iPhone", expectedResults: 1 },
    { name: "Canon", expectedResults: 2 }
  ];

  before(() => {
    cy.login(loginData.testUser2.email, loginData.testUser2.password);
  });

  products.forEach((product) => {
    it(`should find ${product.expectedResults} result(s) for ${product.name}`, () => {
      homePageObj.searchProduct(product.name);
      cy.get(".product-thumb")
        .should("have.length", product.expectedResults);
    });
  });
});
```

## API Integration Tests

### Intercept Network Requests

```javascript
describe("API Integration - Network Requests", () => {
  it("should intercept login API call", () => {
    cy.intercept("POST", "**/index.php?route=account/login").as("loginRequest");

    loginPageObj
      .openURL()
      .navigateToLoginPage()
      .enterEmail(loginData.testUser2.email)
      .enterPassword(loginData.testUser2.password)
      .clickLoginBtn();

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("should mock API response", () => {
    cy.intercept("GET", "**/api/products", {
      statusCode: 200,
      body: {
        products: [
          { id: 1, name: "MacBook", price: 602 },
          { id: 2, name: "iPhone", price: 123 }
        ]
      }
    }).as("getProducts");

    cy.visit("/products");
    cy.wait("@getProducts");
    
    cy.contains("MacBook").should("be.visible");
    cy.contains("iPhone").should("be.visible");
  });
});
```

### API Testing

```javascript
describe("API Testing - Direct API Calls", () => {
  it("should make GET request", () => {
    cy.request("GET", "https://api.example.com/products")
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("products");
        expect(response.body.products).to.be.an("array");
      });
  });

  it("should make POST request", () => {
    cy.request({
      method: "POST",
      url: "https://api.example.com/login",
      body: {
        email: "test@example.com",
        password: "password123"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });
});
```

## Advanced Examples

### Custom Assertions

```javascript
describe("Advanced - Custom Assertions", () => {
  it("should use custom assertions", () => {
    cy.get("#price").should(($price) => {
      const priceText = $price.text();
      const priceValue = parseFloat(priceText.replace("$", ""));
      
      expect(priceValue).to.be.greaterThan(0);
      expect(priceValue).to.be.lessThan(1000);
    });
  });
});
```

### Conditional Testing

```javascript
describe("Advanced - Conditional Testing", () => {
  it("should handle conditional elements", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".modal").length > 0) {
        cy.get(".modal-close").click();
      }
      
      cy.get("#main-content").should("be.visible");
    });
  });
});
```

### File Upload

```javascript
describe("Advanced - File Upload", () => {
  it("should upload a file", () => {
    cy.get("input[type='file']").selectFile("cypress/fixtures/example.json");
    cy.get(".upload-success").should("be.visible");
  });
});
```

### Drag and Drop

```javascript
describe("Advanced - Drag and Drop", () => {
  it("should drag and drop element", () => {
    cy.get(".draggable").drag(".drop-zone");
    cy.get(".drop-zone").should("contain", "Dropped!");
  });
});
```

### Viewport Testing

```javascript
describe("Advanced - Responsive Testing", () => {
  const viewports = [
    { device: "iphone-6", width: 375, height: 667 },
    { device: "ipad-2", width: 768, height: 1024 },
    { device: "macbook-15", width: 1440, height: 900 }
  ];

  viewports.forEach((viewport) => {
    it(`should display correctly on ${viewport.device}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit("/");
      
      cy.get("header").should("be.visible");
      cy.get("nav").should("be.visible");
    });
  });
});
```

### Session Management

```javascript
describe("Advanced - Session Management", () => {
  it("should preserve session across tests", () => {
    cy.session("user-session", () => {
      cy.login(loginData.testUser2.email, loginData.testUser2.password);
    });

    cy.visit("/account");
    cy.get("h2").should("contain", "My Account");
  });
});
```

## Tips for Writing Tests

1. **Keep tests independent**: Each test should be able to run on its own
2. **Use descriptive names**: Test names should clearly describe what they test
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Avoid hardcoded waits**: Use Cypress's automatic waiting
5. **Clean up after tests**: Reset state in afterEach hooks
6. **Use fixtures for data**: Keep test data separate from test logic
7. **Make assertions meaningful**: Assert on important behaviors
8. **Group related tests**: Use describe blocks effectively

## Running These Examples

```bash
# Run all tests
npm run cypress:run

# Run specific test file
npx cypress run --spec "cypress/e2e/tests/loginPageTest.cy.js"

# Run in interactive mode
npm run cypress:open
```

## Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Examples](https://example.cypress.io/)
- [Project README](../README.md)
- [Getting Started Guide](GETTING_STARTED.md)

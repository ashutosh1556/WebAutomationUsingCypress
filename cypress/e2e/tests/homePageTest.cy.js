import { homePage } from "../../pages/homePage.js";
import { loginPage } from "../../pages/loginPage.js";
import homePageData from "../../fixtures/homePageData.json";
import loginData from "../../fixtures/loginData.json";

const homePageObj = new homePage();
const loginPageObj = new loginPage();

describe("HomePage Workflow", () => {
  // Skip the test suite if the 'testPermissionGranted' environment variable is not set
  before(() => {
    if (!Cypress.env("testPermissionGranted")) this.skip();
  });

  before("Login", () => {
    cy.login(loginData.testUser2.email, loginData.testUser2.password);
  });

  it("Search product, add to cart", () => {
    homePageObj.searchProduct(homePageData.product.name).addToCart();
    homePageObj.verifySuccessMessage().should(($element) => {
      expect($element).to.contain(homePageData.messages.success); // Assert that the element contains the expected text
      expect($element).to.be.visible; // Assert that the element is visible
    });
  });
});

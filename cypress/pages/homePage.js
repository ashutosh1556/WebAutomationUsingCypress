export class homePage {
  webLocators = {
    searchInput: ".form-control.input-lg",
    searchBtn: "button[class='btn btn-default btn-lg']",
    // body > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(8) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > span:nth-child(2)
    addToCartBtn: "Add to Cart",
    successMessage: ".alert.alert-success.alert-dismissible",
  };

  searchProduct(product) {
    cy.get(this.webLocators.searchInput).type(product);
    cy.get(this.webLocators.searchBtn).click();
    return this;
  }

  addToCart() {
    cy.contains(this.webLocators.addToCartBtn).first().click();
    return this;
  }

  verifySuccessMessage() {
    return cy.get(this.webLocators.successMessage);
    return this;
  }
}

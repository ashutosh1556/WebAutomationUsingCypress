const { defineConfig } = require("cypress");

module.exports = defineConfig({
  parallelization: {
    strategy: "spec", // Run tests in parallel across multiple spec files
    specPattern: "cypress/e2e/**/*.cy.js", // Pattern for matching spec files
  },
  retries: {
    runMode: 2, // Number of times to retry the entire test suite
    openMode: 2, // Number of times to retry opening the browser
  },
  env: {
    runRegistrationTests: true,
    baseUrl:
      "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

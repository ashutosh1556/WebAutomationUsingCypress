// Import the defineConfig function from the Cypress module
const { defineConfig } = require("cypress");

// Export the configuration object
module.exports = defineConfig({
  // Configuration for running tests in parallel
  parallelization: {
    // Strategy for running tests in parallel across multiple spec files
    strategy: "spec",
    // Pattern for matching spec files to run in parallel
    specPattern: "cypress/e2e/**/*.cy.js",
  },

  // Configuration for retrying tests
  retries: {
    // Number of times to retry the entire test suite
    runMode: 1,
    // Number of times to retry opening the browser
    openMode: 1,
  },

  // Environment variables
  env: {
    // Flag to control whether to run registration tests or not
    testPermissionGranted: true,

    // Base URL for the application under test
    baseURL: "https://naveenautomationlabs.com/opencart/index.php?",

    // URL for the home page of the application under test
    homePageURL: "route=common/home",
    // URL for the registration page of the application under test
    registrationPageURL: "route=account/register",
    // URL for the login page of the application under test
    loginPageURL: "route=account/login",
  },

  // Configuration for end-to-end tests
  e2e: {
    // Function to set up node event listeners
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      // For example, you can use this function to modify the configuration object
      // or set up browser extensions, environment variables, etc.
    },
  },
});

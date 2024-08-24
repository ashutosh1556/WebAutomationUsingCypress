const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    URL: "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});



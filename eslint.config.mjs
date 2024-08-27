/**
 * ESLint Configuration File
 *
 * This file defines the configuration for ESLint, a tool for identifying and reporting
 * patterns in JavaScript code. It specifies the rules and settings that ESLint should
 * use when linting the project's JavaScript files.
 *
 * The configuration is exported as an array, where each item represents a different
 * configuration object. These objects can define settings such as the files to lint,
 * language options, and which ESLint plugins and rule sets to use.
 */

// Import the globals module, which provides a set of predefined global variables
import globals from "globals";

// Import the recommended rules from the @eslint/js plugin
import pluginJs from "@eslint/js";

// Import the recommended rules from the eslint-plugin-react plugin
import pluginReact from "eslint-plugin-react";

/**
 * The exported configuration array.
 * Each item in the array is a configuration object.
 */
export default [
  // Configuration object to specify the files to lint
  { files: ["**/*.{js,mjs,cjs,jsx}"] },

  // Configuration object to set the language options for specific files
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },

  // Configuration object to set the global variables for the linting process
  { languageOptions: { globals: globals.browser } },

  // Include the recommended rules from the @eslint/js plugin
  pluginJs.configs.recommended,

  // Include the recommended rules from the eslint-plugin-react plugin (flat configuration)
  pluginReact.configs.flat.recommended,

  {
    rules: {
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "error",
      "cypress/assertion-before-screenshot": "warn",
      "cypress/no-force": "warn",
      "cypress/no-async-tests": "error",
      "cypress/no-async-before": "error",
      "cypress/no-pause": "error",
      "cypress/no-debug": "error",
    },
  },
  {
    env: {
      "cypress/globals": true,
    },
  },
  {
    extends: ["plugin:cypress/recommended"],
  },
];

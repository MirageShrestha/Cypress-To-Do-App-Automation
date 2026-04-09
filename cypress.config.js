const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    reportPageTitle: "Todo API Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  e2e: {
    projectId: "6xskvi",
    baseUrl: "https://61efe41b61d5000008577c36--fervent-einstein-405a63.netlify.app",

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    }
  }
});
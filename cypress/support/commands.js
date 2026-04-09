
Cypress.Commands.add("generateUniqueEmail", () => {
  const uniqueEmail = `mirage${Date.now()}@test.com`;
  return cy.wrap(uniqueEmail);
});

Cypress.Commands.add("loginByUI", (locators) => {
  cy.visit("/");

  cy.get(locators.loginPage.email)
    .should("be.visible")
    .clear()
    .type(Cypress.env("EMAIL"));

  cy.get(locators.loginPage.password)
    .should("be.visible")
    .clear()
    .type(Cypress.env("PASSWORD"));

  cy.get(locators.loginPage.loginButton)
    .should("be.visible")
    .and("not.be.disabled")
    .click();

  cy.get(locators.dashboardPage.logo)
    .should("be.visible");
});

Cypress.Commands.add("loginWithSession", (locators) => {
  cy.session(
    [Cypress.env("EMAIL"), Cypress.env("PASSWORD")],
    () => {
      cy.loginByUI(locators);
    },
    {
      validate() {
        cy.visit("/");
        cy.get(locators.dashboardPage.logo, { timeout: 10000 })
          .should("be.visible");
      }
    }
  );
});

Cypress.Commands.add("openDashboardWithSession", (locators) => {
  cy.loginWithSession(locators);
  cy.visit("/");
  cy.get(locators.dashboardPage.logo, { timeout: 10000 })
    .should("be.visible");
}); 



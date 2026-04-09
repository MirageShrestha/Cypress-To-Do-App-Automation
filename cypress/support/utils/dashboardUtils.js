export const loginByUI = (locators) => {
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

  cy.get(locators.dashboardPage.logo, { timeout: 10000 })
    .should("be.visible");
};

export const verifyDashboardLoaded = (locators) => {
  cy.get(locators.dashboardPage.logo)
    .should("be.visible")
    .and("contain", "TODO APP");

  cy.get(locators.dashboardPage.dateText).should("be.visible");

  cy.get(locators.dashboardPage.overviewHeader)
    .should("be.visible")
    .and("contain", "Overview");

  cy.get(locators.dashboardPage.overviewCards)
    .should("have.length.at.least", 3);

  cy.get(locators.dashboardPage.todayTasksContainer).should("be.visible");
  cy.get(locators.dashboardPage.listNamesContainer).should("be.visible");
};

export const verifyDashboardDateMatchesToday = (locators) => {
  const today = new Date();
  const formatted = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  cy.get(locators.dashboardPage.dateText)
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(formatted);
    });
};

export const verifyUserAvatarInitials = (locators, initials) => {
  cy.get(locators.dashboardPage.avatar)
    .should("be.visible")
    .and("contain", initials);
};

export const logoutFromDashboard = (locators) => {
  cy.get(locators.dashboardPage.logout)
    .should("be.visible")
    .click();

  cy.contains("Confirm Logout").should("be.visible");
  cy.contains("Are you sure you want to logout?").should("be.visible");

  cy.contains("button", "Logout")
    .should("be.visible")
    .click();
};
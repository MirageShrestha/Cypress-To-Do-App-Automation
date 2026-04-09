describe("TS_06_DB - Dashboard Functionality", () => {
  let locators;

  before(() => {
    cy.fixture("dashboardLocators").then((data) => {
      locators = data;
    });
  });

  beforeEach(() => {
    cy.openDashboardWithSession(locators);
  });

  it("DB_01 - Verify that the Dashboard page loads correctly after a successful login", () => {
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
  });

  it("DB_02 - Verify that the Dashboard page displays the correct current date", () => {
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
  });

  it("DB_05 - Verify that the logged-in user's initials are displayed in the user avatar", () => {
    cy.get(locators.dashboardPage.avatar)
      .should("be.visible")
      .and("contain", "MS");
  });

  it("DB_06 - Verify that clicking the Logout button logs the user out and redirects to the Login page", () => {
    cy.get(locators.dashboardPage.logout)
      .should("be.visible")
      .click();

    cy.contains("Confirm Logout").should("be.visible");
    cy.contains("Are you sure you want to logout?").should("be.visible");

    cy.contains("button", "Logout")
      .should("be.visible")
      .click();

    cy.url().should("match", /\/$|\/login$/);
    cy.get(locators.loginPage.email).should("be.visible");
    cy.get(locators.loginPage.password).should("be.visible");
    cy.get(locators.loginPage.loginButton).should("be.visible");
  });
});
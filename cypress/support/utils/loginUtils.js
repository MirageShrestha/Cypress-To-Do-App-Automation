export const openLoginPage = () => {
  cy.visit("/");
  cy.url().should("match", /\/$|\/login$/);
};

export const fillLoginForm = (locators, user) => {
  if (user.email !== undefined) {
    cy.get(locators.loginPage.email).should("be.visible").clear();
    if (user.email !== "") {
      cy.get(locators.loginPage.email).type(user.email);
    }
  }

  if (user.password !== undefined) {
    cy.get(locators.loginPage.password).should("be.visible").clear();
    if (user.password !== "") {
      cy.get(locators.loginPage.password).type(user.password);
    }
  }
};

export const clickLoginButton = (locators) => {
  cy.get(locators.loginPage.loginButton)
    .should("be.visible")
    .and("not.be.disabled")
    .click();
};

export const verifyLoginButtonDisabled = (locators) => {
  cy.get(locators.loginPage.loginButton)
    .should("be.visible")
    .and("be.disabled");
};

export const verifyLoginPageElements = (locators) => {
  cy.get(locators.loginPage.title)
    .should("be.visible")
    .and("contain", "TODO APP");

  cy.get(locators.loginPage.pageHeading)
    .should("be.visible")
    .and("contain", "Login to your account");

  cy.get(locators.loginPage.email).should("be.visible");
  cy.get(locators.loginPage.password).should("be.visible");
  cy.get(locators.loginPage.forgotPassword).should("be.visible");
  cy.get(locators.loginPage.loginButton).should("be.visible");
  cy.get(locators.loginPage.createAccount).should("be.visible");
};

export const verifyDashboardLoaded = (locators) => {
  cy.get(locators.dashboardPage.dashboardRoot, { timeout: 10000 })
    .should("be.visible");
};

export const verifyStillOnLoginPage = (locators) => {
  cy.url().should("match", /\/$|\/login$/);
  cy.get(locators.loginPage.email).should("be.visible");
  cy.get(locators.loginPage.password).should("be.visible");
};

export const clickForgotPasswordLink = (locators) => {
  cy.get(locators.loginPage.forgotPassword)
    .should("be.visible")
    .click();
};

export const clickCreateAccountLink = (locators) => {
  cy.get(locators.loginPage.createAccount)
    .should("be.visible")
    .click();
};

export const verifyValidEmailIndicator = (locators) => {
  cy.get(locators.loginPage.emailValidIcon).should("be.visible");
};

export const togglePasswordVisibility = (locators) => {
  cy.get(locators.loginPage.eyeIcon)
    .should("be.visible")
    .click();
};
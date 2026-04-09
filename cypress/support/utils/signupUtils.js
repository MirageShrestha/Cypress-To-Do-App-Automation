export const openSignupPage = (locators) => {
  cy.visit("/");
  cy.get(locators.loginPage.createAccount)
    .should("be.visible")
    .click();
  cy.url().should("include", "/signup");
};

export const fillSignupForm = (locators, user) => {
  if (user.name !== undefined) {
    cy.get(locators.signupPage.name).should("be.visible").clear();
    if (user.name !== "") {
      cy.get(locators.signupPage.name).type(user.name);
    }
  }

  if (user.gender === "male") {
    cy.get(locators.signupPage.maleRadio)
      .check({ force: true })
      .should("be.checked");
  } else if (user.gender === "female") {
    cy.get(locators.signupPage.femaleRadio)
      .check({ force: true })
      .should("be.checked");
  } else if (user.gender === "other") {
    cy.get(locators.signupPage.otherRadio)
      .check({ force: true })
      .should("be.checked");
  }

  if (user.dob !== undefined) {
    cy.get(locators.signupPage.dob).clear();
    if (user.dob !== "") {
      cy.get(locators.signupPage.dob).type(user.dob);
    }
  }

  if (user.phone !== undefined) {
    cy.get(locators.signupPage.phone).clear();
    if (user.phone !== "") {
      cy.get(locators.signupPage.phone).type(user.phone);
    }
  }

  if (user.email !== undefined) {
    cy.get(locators.signupPage.email).clear();
    if (user.email !== "") {
      cy.get(locators.signupPage.email).type(user.email);
    }
  }
};

export const clickNextButton = (locators) => {
  cy.get(locators.signupPage.nextButton)
    .should("be.visible")
    .and("not.be.disabled")
    .click();
};

export const verifyNextButtonDisabled = (locators) => {
  cy.get(locators.signupPage.nextButton)
    .should("be.visible")
    .and("be.disabled");
};

export const verifySignupPageElements = (locators) => {
  cy.get(locators.signupPage.name).should("be.visible");
  cy.get(locators.signupPage.maleRadio).should("exist");
  cy.get(locators.signupPage.femaleRadio).should("exist");
  cy.get(locators.signupPage.otherRadio).should("exist");
  cy.get(locators.signupPage.dob).should("be.visible");
  cy.get(locators.signupPage.phone).should("be.visible");
  cy.get(locators.signupPage.email).should("be.visible");
  cy.get(locators.signupPage.nextButton).should("be.visible");
  cy.contains("Login").should("be.visible");
};

export const verifyNavigatedToSetPasswordPage = (locators) => {
  cy.url().should("include", "/set-password");
  cy.get(locators.setPasswordPage.password).should("be.visible");
  cy.get(locators.setPasswordPage.confirmPassword).should("be.visible");
};

export const clickLoginLinkFromSignup = () => {
  cy.contains("Login").should("be.visible").click();
};
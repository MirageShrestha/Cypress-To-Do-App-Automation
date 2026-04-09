export const openSetPasswordPage = () => {
  cy.url().should("include", "/set-password");
};

export const verifySetPasswordPageElements = (locators) => {
  cy.get(locators.setPasswordPage.title)
    .should("be.visible")
    .and("contain", "TODO APP");

  cy.get(locators.setPasswordPage.pageHeading)
    .should("be.visible")
    .and("contain", "Welcome To TODO App");

  cy.get(locators.setPasswordPage.pageText)
    .should("be.visible")
    .and("contain", "Set your password");

  cy.get(locators.setPasswordPage.password).should("be.visible");
  cy.get(locators.setPasswordPage.confirmPassword).should("be.visible");
  cy.get(locators.setPasswordPage.setPasswordButton).should("be.visible");
  cy.get(locators.setPasswordPage.createAccount).should("be.visible");
};

export const fillSetPasswordForm = (locators, data) => {
  if (data.password !== undefined) {
    cy.get(locators.setPasswordPage.password)
      .should("be.visible")
      .clear();

    if (data.password !== "") {
      cy.get(locators.setPasswordPage.password).type(data.password);
    }
  }

  if (data.confirmPassword !== undefined) {
    cy.get(locators.setPasswordPage.confirmPassword)
      .should("be.visible")
      .clear();

    if (data.confirmPassword !== "") {
      cy.get(locators.setPasswordPage.confirmPassword).type(data.confirmPassword);
    }
  }
};

export const verifySetPasswordButtonDisabled = (locators) => {
  cy.get(locators.setPasswordPage.setPasswordButton)
    .should("be.visible")
    .and("be.disabled");
};

export const verifySetPasswordButtonEnabled = (locators) => {
  cy.get(locators.setPasswordPage.setPasswordButton)
    .should("be.visible")
    .and("not.be.disabled");
};

export const clickSetPasswordButton = (locators) => {
  cy.get(locators.setPasswordPage.setPasswordButton)
    .should("be.visible")
    .and("not.be.disabled")
    .click();
};

export const verifyNoPasswordMismatchError = () => {
  cy.contains("Passwords do not match").should("not.exist");
};

export const verifyPasswordRequiredError = () => {
  cy.contains("Password is required").should("be.visible");
};

export const verifyConfirmPasswordRequiredError = () => {
  cy.contains("Confirm Password is required").should("be.visible");
};

export const toggleSetPasswordVisibility = (locators) => {
  cy.get(locators.setPasswordPage.passwordEyeIcon)
    .should("be.visible")
    .click();
};

export const toggleConfirmPasswordVisibility = (locators) => {
  cy.get(locators.setPasswordPage.confirmPasswordEyeIcon)
    .should("be.visible")
    .click();
};
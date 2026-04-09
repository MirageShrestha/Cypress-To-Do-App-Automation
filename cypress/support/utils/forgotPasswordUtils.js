export const openForgotPasswordPage = () => {
  cy.visit("/");
  cy.contains("Forgot password?").should("be.visible").click();
  cy.url().should("include", "/forgot-password");
};

export const verifyForgotPasswordPageElements = (locators) => {
  cy.get(locators.forgotPasswordPage.title)
    .should("be.visible")
    .and("contain", "TODO APP");

  cy.get(locators.forgotPasswordPage.pageHeading)
    .should("be.visible")
    .and("contain", "Forgot your password?");

  cy.get(locators.forgotPasswordPage.pageText)
    .should("be.visible")
    .and("contain", "Enter your registered email below to receive code");

  cy.get(locators.forgotPasswordPage.email).should("be.visible");
  cy.get(locators.forgotPasswordPage.sendButton).should("be.visible");
};

export const fillForgotPasswordEmail = (locators, email) => {
  cy.get(locators.forgotPasswordPage.email)
    .should("be.visible")
    .clear();

  if (email !== "") {
    cy.get(locators.forgotPasswordPage.email).type(email);
  }
};

export const clickSendButton = (locators) => {
  cy.get(locators.forgotPasswordPage.sendButton)
    .should("be.visible")
    .click();
};

export const verifySendButtonDisabled = (locators) => {
  cy.get(locators.forgotPasswordPage.sendButton)
    .should("be.visible")
    .and("be.disabled");
};

export const verifyForgotPasswordSuccessModal = (locators) => {
  cy.get(locators.successModal.modalRoot).should("be.visible");

  cy.get(locators.successModal.heading)
    .should("be.visible")
    .and("contain", "Email has been sent!");

  cy.get(locators.successModal.content)
    .should("be.visible")
    .and("contain", "Please check your inbox");
};

export const clickForgotPasswordModalLogin = (locators) => {
  cy.get(locators.successModal.loginButton)
    .should("be.visible")
    .click();
};

export const verifyForgotPasswordValidEmailIcon = (locators) => {
  cy.get(locators.forgotPasswordPage.emailValidIcon)
    .should("be.visible");
};
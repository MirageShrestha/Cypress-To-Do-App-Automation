import {
  openForgotPasswordPage,
  verifyForgotPasswordPageElements,
  fillForgotPasswordEmail,
  clickSendButton,
  verifySendButtonDisabled,
  verifyForgotPasswordSuccessModal,
  clickForgotPasswordModalLogin,
  verifyForgotPasswordValidEmailIcon
} from "../../support/utils/forgotPasswordUtils";

describe("TS-04-FP - Forgot Password Functionality", () => {
  let locators;
  let data;

  before(() => {
    cy.fixture("forgotPasswordLocators").then((locatorData) => {
      locators = locatorData;
    });

    cy.fixture("forgotPasswordData").then((forgotPasswordData) => {
      data = forgotPasswordData;
    });
  });

  beforeEach(() => {
    openForgotPasswordPage();
  });

  it("FP_01 - Verify that the Forgot Password page loads all UI elements correctly", () => {
    verifyForgotPasswordPageElements(locators);
  });

  it("FP_02 - Verify that the system sends a password reset email when a valid registered email is entered", () => {
    fillForgotPasswordEmail(locators, data.validUser.email);
    clickSendButton(locators);
    verifyForgotPasswordSuccessModal(locators);
  });

  it("FP_05 - Verify that validation error is shown when the Email address field is left blank", () => {
    fillForgotPasswordEmail(locators, "");
    verifySendButtonDisabled(locators);
  });

  it("FP_06 - Verify that a green checkmark icon appears when a valid email is entered", () => {
    fillForgotPasswordEmail(locators, data.validUser.email);
    verifyForgotPasswordValidEmailIcon(locators);
  });

  it("FP_07 - Verify that clicking the Login button on the success modal navigates to the Login page", () => {
    fillForgotPasswordEmail(locators, data.validUser.email);
    clickSendButton(locators);
    verifyForgotPasswordSuccessModal(locators);
    clickForgotPasswordModalLogin(locators);

    cy.url().should("match", /\/$|\/login$/);
    cy.get(locators.loginPage.email).should("be.visible");
    cy.get(locators.loginPage.password).should("be.visible");
    cy.get(locators.loginPage.loginButton).should("be.visible");
  });
});
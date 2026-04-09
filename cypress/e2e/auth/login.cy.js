import {
  openLoginPage,
  fillLoginForm,
  clickLoginButton,
  verifyLoginButtonDisabled,
  verifyLoginPageElements,
  verifyDashboardLoaded,
  verifyStillOnLoginPage,
  clickForgotPasswordLink,
  clickCreateAccountLink,
  verifyValidEmailIndicator,
  togglePasswordVisibility
} from "../../support/utils/loginUtils";

describe("TS-01 - Login Functionality", () => {
  let locators;
  let data;

  before(() => {
    cy.fixture("loginLocators").then((locatorData) => {
      locators = locatorData;
    });

    cy.fixture("loginData").then((loginData) => {
      data = loginData;
    });
  });

  beforeEach(() => {
    openLoginPage();
  });

  it("LF_01 - Verify that the Login page loads all UI elements correctly", () => {
    verifyLoginPageElements(locators);
  });

  it("LF_02 - Verify that the user can login successfully with valid credentials", () => {
    const user = {
      email: data.validUser.email,
      password: data.validUser.password
    };

    fillLoginForm(locators, user);
    clickLoginButton(locators);
    verifyDashboardLoaded(locators);
  });

  it("LF_03 - Verify that the user cannot login with an invalid email format", () => {
    const user = {
      email: data.invalidUser.invalidEmailFormat,
      password: data.validUser.password
    };

    fillLoginForm(locators, user);
    verifyLoginButtonDisabled(locators);
    verifyStillOnLoginPage(locators);
    cy.contains("Invalid Pattern").should("be.visible");
  });

  it("LF_05 - Verify that an error is shown when the Email field is left blank", () => {
    const user = {
      email: "",
      password: data.validUser.password
    };

    fillLoginForm(locators, user);
    verifyLoginButtonDisabled(locators);
    verifyStillOnLoginPage(locators);
  });

  it("LF_06 - Verify that an error is shown when the Password field is left blank", () => {
    const user = {
      email: data.validUser.email,
      password: ""
    };

    fillLoginForm(locators, user);
    verifyLoginButtonDisabled(locators);
    verifyStillOnLoginPage(locators);
  });

  it("LF_07 - Verify that validation errors are shown when both Email and Password fields are left blank", () => {
    const user = {
      email: "",
      password: ""
    };

    fillLoginForm(locators, user);
    verifyLoginButtonDisabled(locators);
    verifyStillOnLoginPage(locators);
  });

  it("LF_08 - Verify that the Password field toggles between hidden and visible text when the eye icon is clicked", () => {
    cy.get(locators.loginPage.password)
      .clear()
      .type(data.validUser.password)
      .should("have.attr", "type", "password");

    togglePasswordVisibility(locators);
    cy.get(locators.loginPage.password).should("have.attr", "type", "text");

    togglePasswordVisibility(locators);
    cy.get(locators.loginPage.password).should("have.attr", "type", "password");
  });

  it("LF_09 - Verify that a green checkmark icon appears in the Email field when a valid email is entered", () => {
    cy.get(locators.loginPage.email)
      .clear()
      .type(data.validUser.email);

    verifyValidEmailIndicator(locators);
  });

  it("LF_10 - Verify that a red invalid icon appears in the Email field when an invalid email is entered", () => {
    cy.visit("/");
    cy.get("#email").clear().type("abc").blur();

    cy.contains("small.error-message", "Invalid Pattern")
      .should("be.visible");

    cy.contains("small.error-message", "Invalid Pattern")
      .find(".fa-exclamation-circle")
      .should("be.visible");
  });

  it("LF_11 - Verify that clicking the Forgot password link navigates to the Forgot Password page", () => {
    clickForgotPasswordLink(locators);
    cy.url().should("include", "/forgot-password");
  });

  it("LF_12 - Verify that clicking the Create new account link navigates to the Registration page", () => {
    clickCreateAccountLink(locators);
    cy.url().should("include", "/signup");
  });

  it("LF_13 - Verify that the user cannot login with a correct email but a wrong password", () => {
    const user = {
      email: data.validUser.email,
      password: data.invalidUser.wrongPassword
    };

    fillLoginForm(locators, user);
    clickLoginButton(locators);
    verifyStillOnLoginPage(locators);

    cy.contains(/incorrect|invalid|password/i).should("be.visible");
  });
});
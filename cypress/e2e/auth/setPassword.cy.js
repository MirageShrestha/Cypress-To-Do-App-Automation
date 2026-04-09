import {
  openSetPasswordPage,
  verifySetPasswordPageElements,
  fillSetPasswordForm,
  verifySetPasswordButtonDisabled,
  verifySetPasswordButtonEnabled,
  verifyNoPasswordMismatchError,
  toggleSetPasswordVisibility
} from "../../support/utils/setPasswordUtils";

import {
  openSignupPage,
  fillSignupForm,
  clickNextButton
} from "../../support/utils/signupUtils";

describe("TS-03 - Set Password Functionality", () => {
  let signUpLocators;
  let setPasswordLocators;
  let signupData;
  let setPasswordData;

  before(() => {
    cy.fixture("signupLocators").then((data) => {
      signUpLocators = data;
    });

    cy.fixture("signupData").then((data) => {
      signupData = data;
    });

    cy.fixture("setPasswordLocators").then((data) => {
      setPasswordLocators = data;
    });

    cy.fixture("setPasswordData").then((data) => {
      setPasswordData = data;
    });
  });

  beforeEach(() => {
    openSignupPage(signUpLocators);

    cy.generateUniqueEmail().then((email) => {
      const user = {
        name: signupData.validUser.name,
        gender: "male",
        dob: signupData.validUser.dob,
        phone: signupData.validUser.phone,
        email
      };

      fillSignupForm(signUpLocators, user);
      clickNextButton(signUpLocators);
      openSetPasswordPage();
    });
  });

  it("SP_01 - Verify that the Password Setup page loads all UI elements correctly", () => {
    verifySetPasswordPageElements(setPasswordLocators);
  });

  it("SP_05 - Verify mismatch error is shown when Confirm Password does not match", () => {
    fillSetPasswordForm(setPasswordLocators, {
      password: setPasswordData.validUser.password,
      confirmPassword: setPasswordData.invalidUser.mismatchPassword
    });

    verifySetPasswordButtonDisabled(setPasswordLocators);
  });

  it("SP_06 - Verify no error is shown when Confirm Password matches Password", () => {
    fillSetPasswordForm(setPasswordLocators, {
      password: setPasswordData.validUser.password,
      confirmPassword: setPasswordData.validUser.password
    });

    verifyNoPasswordMismatchError();
    verifySetPasswordButtonEnabled(setPasswordLocators);
  });

  it("SP_08 - Verify Password field eye icon toggles password visibility", () => {
    cy.get(setPasswordLocators.setPasswordPage.password)
      .clear()
      .type(setPasswordData.validUser.password)
      .should("have.attr", "type", "password");

    toggleSetPasswordVisibility(setPasswordLocators);
    cy.get(setPasswordLocators.setPasswordPage.password)
      .should("have.attr", "type", "text");

    toggleSetPasswordVisibility(setPasswordLocators);
    cy.get(setPasswordLocators.setPasswordPage.password)
      .should("have.attr", "type", "password");
  });

  it("SP_09 - Verify validation errors when both Password and Re-enter password fields are blank", () => {
    openSetPasswordPage();
    verifySetPasswordButtonDisabled(setPasswordLocators);
  });
});
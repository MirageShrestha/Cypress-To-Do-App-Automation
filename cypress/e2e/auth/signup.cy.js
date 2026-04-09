import {
  openSignupPage,
  fillSignupForm,
  clickNextButton,
  verifyNextButtonDisabled,
  verifySignupPageElements,
  verifyNavigatedToSetPasswordPage,
  clickLoginLinkFromSignup
} from "../../support/utils/signupUtils";

describe("TS-02 - SignUp Functionality", () => {
  let locators;
  let data;

  before(() => {
    cy.fixture("signupLocators").then((locatorData) => {
      locators = locatorData;
    });

    cy.fixture("signupData").then((signupData) => {
      data = signupData;
    });
  });

  beforeEach(() => {
    openSignupPage(locators);
  });

  it("SU_01 - Verify that the SignUp page loads all UI elements correctly", () => {
    verifySignupPageElements(locators);
  });

  it("SU_02 - Verify that user can proceed to Set Password page with valid data", () => {
    cy.generateUniqueEmail().then((email) => {
      const user = {
        name: data.validUser.name,
        gender: "male",
        dob: data.validUser.dob,
        phone: data.validUser.phone,
        email
      };

      fillSignupForm(locators, user);
      clickNextButton(locators);
      verifyNavigatedToSetPasswordPage(locators);
    });
  });

  it("SU_03_SU_04_SU_05_SU_12 - Verify Next button remains disabled for invalid signup inputs", () => {
    const runDisabledButtonCase = (userData) => {
      openSignupPage(locators);
      fillSignupForm(locators, userData);
      verifyNextButtonDisabled(locators);
      cy.url().should("include", "/signup");
    };

    cy.generateUniqueEmail().then((email1) => {
      runDisabledButtonCase({
        name: "",
        gender: "male",
        dob: data.validUser.dob,
        phone: data.validUser.phone,
        email: email1
      });
    });

    runDisabledButtonCase({
      name: data.validUser.name,
      gender: "male",
      dob: data.validUser.dob,
      phone: data.validUser.phone,
      email: ""
    });

    runDisabledButtonCase({
      name: data.validUser.name,
      gender: "male",
      dob: data.validUser.dob,
      phone: data.validUser.phone,
      email: data.invalidUser.invalidEmail
    });

    cy.generateUniqueEmail().then((email2) => {
      runDisabledButtonCase({
        name: data.validUser.name,
        gender: "male",
        dob: data.validUser.dob,
        phone: "",
        email: email2
      });
    });
  });

  it("SU_16 - Verify clicking Login link navigates back to Login page", () => {
    clickLoginLinkFromSignup();
    cy.url().should("match", /\/$|\/login$/);
    cy.get(locators.loginPage.email).should("be.visible");
    cy.get(locators.loginPage.password).should("be.visible");
    cy.get(locators.loginPage.loginButton).should("be.visible");
  });

  it("SU_06 - Verify already registered email shows error", () => {
    const user = {
      name: data.validUser.name,
      gender: "male",
      dob: data.validUser.dob,
      phone: data.validUser.phone,
      email: "mirage.shrestha@bajratechnologies.com"
    };

    fillSignupForm(locators, user);
    verifyNextButtonDisabled(locators);
  });

  it("SU_07 - Verify that the user can select the Male gender option", () => {
    cy.get(locators.signupPage.maleRadio)
      .check({ force: true })
      .should("be.checked");
  });

  it("SU_08 - Verify that the user can select the Female gender option", () => {
    cy.get(locators.signupPage.femaleRadio)
      .check({ force: true })
      .should("be.checked");

    cy.get(locators.signupPage.maleRadio).should("not.be.checked");
    cy.get(locators.signupPage.otherRadio).should("not.be.checked");
  });

  it("SU_09 - Verify that the user can select the Others gender option", () => {
    cy.get(locators.signupPage.otherRadio)
      .check({ force: true })
      .should("be.checked");

    cy.get(locators.signupPage.maleRadio).should("not.be.checked");
    cy.get(locators.signupPage.femaleRadio).should("not.be.checked");
  });

  it("SU_13 - Verify phone rejects non-numeric input", () => {
    cy.generateUniqueEmail().then((email) => {
      const user = {
        name: data.validUser.name,
        gender: "male",
        dob: data.validUser.dob,
        phone: "abcde",
        email
      };

      fillSignupForm(locators, user);
      verifyNextButtonDisabled(locators);
    });
  });

  it("SU_15 - Verify future DOB is not allowed", () => {
    cy.generateUniqueEmail().then((email) => {
      const user = {
        name: data.validUser.name,
        gender: "male",
        dob: "2027-01-01",
        phone: data.validUser.phone,
        email
      };

      fillSignupForm(locators, user);
      verifyNextButtonDisabled(locators);
      cy.url().should("include", "/signup");
    });
  });
});
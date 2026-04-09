import {
  openCreateListModal,
  verifyCreateListModalElements,
  fillListName,
  clickAddListButton,
  verifyAddListButtonDisabled,
  verifyListNameRequiredError,
  clickCancelButton,
  clickCloseIcon,
  verifyCreateListModalClosed,
  verifyListCreatedInPanel,
  verifyListNotCreatedInPanel
} from "../../support/utils/createListUtils";

describe("TS_09_CL - Create New List", () => {
  let locators;
  let data;

  before(() => {
    cy.fixture("createListLocators").then((fixtureData) => {
      locators = fixtureData;
    });

    cy.fixture("createListData").then((fixtureData) => {
      data = fixtureData;
    });
  });

  beforeEach(() => {
    cy.openDashboardWithSession(locators);
  });

  it("CL_01 - Verify that clicking [Create new list] button opens the [Create list] modal", () => {
    openCreateListModal(locators);
    verifyCreateListModalElements(locators);
  });

  it("CL_02 - Verify that a new list is created successfully when a list name is entered", () => {
    openCreateListModal(locators);
    fillListName(locators, data.validList.name);
    clickAddListButton();

    verifyCreateListModalClosed(locators);
    verifyListCreatedInPanel(data.validList.name);
  });

  it("CL_03 - Verify that a validation error is shown when the [List name] field is left blank", () => {
    openCreateListModal(locators);
    fillListName(locators, "");
    verifyAddListButtonDisabled();
  });

  it("CL_04 - Verify that the system prevents creation of a list with a duplicate name", () => {
    openCreateListModal(locators);
    fillListName(locators, data.duplicateList.name);
    clickAddListButton();

    cy.contains(/already exists|duplicate/i).should("be.visible");
  });

  it("CL_05 - Verify that clicking the [Cancel] button closes the [Create list] modal without saving", () => {
    openCreateListModal(locators);
    fillListName(locators, data.cancelList.name);
    clickCancelButton();

    verifyCreateListModalClosed(locators);
    verifyListNotCreatedInPanel(data.cancelList.name);
  });

  it("CL_06 - Verify that clicking the [X] icon closes the [Create list] modal without saving", () => {
    openCreateListModal(locators);
    clickCloseIcon(locators);
    verifyCreateListModalClosed(locators);
  });

  it("CL_07 - Verify that the [List name] field accepts special characters", () => {
    openCreateListModal(locators);
    fillListName(locators, data.specialCharList.name);
    clickAddListButton();

    verifyCreateListModalClosed(locators);
  });
});
export const openCreateListModal = (locators) => {
  cy.contains("button", "Create new list")
    .should("be.visible")
    .click();

  cy.get(locators.createListModal.modal).should("be.visible");
};

export const verifyCreateListModalElements = (locators) => {
  cy.get(locators.createListModal.modal).should("be.visible");
  cy.contains("Create list").should("be.visible");
  cy.get(locators.createListModal.listNameInput).should("be.visible");
  cy.contains("button", /Add list|Add List/).should("be.visible");
  cy.contains("button", "Cancel").should("be.visible");
  cy.get(locators.createListModal.closeIcon).should("be.visible");
};

export const fillListName = (locators, listName) => {
  cy.get(locators.createListModal.listNameInput)
    .should("be.visible")
    .clear();

  if (listName !== "") {
    cy.get(locators.createListModal.listNameInput).type(listName);
  }
};

export const clickAddListButton = () => {
  cy.contains("button", /Add list|Add List/)
    .should("be.visible")
    .click();
};

export const verifyAddListButtonDisabled = () => {
  cy.contains("button", /Add list|Add List/)
    .should("be.visible")
    .and("be.disabled");
};

export const verifyListNameRequiredError = () => {
  cy.contains(/List name is required/i).should("be.visible");
};

export const clickCancelButton = () => {
  cy.contains("button", "Cancel")
    .should("be.visible")
    .click();
};

export const clickCloseIcon = (locators) => {
  cy.get(locators.createListModal.closeIcon)
    .should("be.visible")
    .click();
};

export const verifyCreateListModalClosed = (locators) => {
  cy.get(locators.createListModal.modal).should("not.exist");
};

export const verifyListCreatedInPanel = (listName) => {
  cy.get(".list-names-container")
    .should("be.visible")
    .within(() => {
      cy.contains(".list-header", listName).should("be.visible");
    });
};

export const verifyListNotCreatedInPanel = (listName) => {
  cy.get(".list-names-container")
    .should("be.visible")
    .within(() => {
      cy.contains(".list-header", listName).should("not.exist");
    });
};
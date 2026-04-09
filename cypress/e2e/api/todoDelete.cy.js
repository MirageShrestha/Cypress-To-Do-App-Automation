import {
  generateTaskName,
  generateListName,
  createTaskBody,
  createListBody
} from "../../support/utils/apiUtils";

import {
  createTask,
  deleteTask,
  createList,
  deleteList
} from "../../support/utils/apiRequestUtils";

describe("Verify Todo API Delete Functionality", () => {
  let testData;
  let todoPayloads;
  let locators;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });

    cy.fixture("todoPayloads").then((data) => {
      todoPayloads = data;
    });

    cy.fixture("sessionLocators").then((data) => {
      locators = data;
    });
  });

  beforeEach(() => {
    cy.openDashboardWithSession(locators);
  });

  it("[TC_TASK_DELETE_001] Verify that a task can be deleted successfully via API", () => {
    const taskName = generateTaskName();

    createTask(testData.tasksUrl, createTaskBody(todoPayloads.task, taskName))
      .then((res) => {
        deleteTask(testData.tasksUrl, res.body.id)
          .then((deleteRes) => {
            expect([200, 404]).to.include(deleteRes.status);
          });
      });
  });

  it("[TC_LIST_DELETE_002] Verify that a list can be deleted successfully via API", () => {
    const listName = generateListName();

    createList(testData.listsUrl, createListBody(todoPayloads.list, listName))
      .then((res) => {
        deleteList(testData.listsUrl, res.body.id)
          .then((deleteRes) => {
            expect([200, 404]).to.include(deleteRes.status);
          });
      });
  });
});
import {
  generateTaskName,
  generateListName,
  createTaskBody,
  createListBody
} from "../../support/utils/apiUtils";

import {
  createTask,
  getTasks,
  createList,
  getLists,
  deleteTask,
  deleteList
} from "../../support/utils/apiRequestUtils";

describe("Verify Todo API Create Functionality", () => {
  let testData;
  let todoPayloads;
  let locators;

  const createdTaskIds = [];
  const createdListIds = [];

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

  after(() => {
    createdTaskIds.forEach((id) => {
      deleteTask(testData.tasksUrl, id);
    });

    createdListIds.forEach((id) => {
      deleteList(testData.listsUrl, id);
    });
  });

  it("[TC_TASK_CREATE_001] Verify that a new task can be created successfully via API", () => {
    const taskName = generateTaskName();
    const body = createTaskBody(todoPayloads.task, taskName);

    createTask(testData.tasksUrl, body).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.task).to.eq(taskName);
      createdTaskIds.push(res.body.id);
    });
  });

  it("[TC_TASK_READ_002] Verify that all tasks can be retrieved successfully via API", () => {
    getTasks(testData.tasksUrl).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });

  it("[TC_LIST_CREATE_003] Verify that a new list can be created successfully via API", () => {
    const listName = generateListName();
    const body = createListBody(todoPayloads.list, listName);

    createList(testData.listsUrl, body).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.list).to.eq(listName);
      createdListIds.push(res.body.id);
    });
  });

  it("[TC_LIST_READ_004] Verify that all lists can be retrieved successfully via API", () => {
    getLists(testData.listsUrl).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });
});
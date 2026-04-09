import {
  generateTaskName,
  generateListName,
  createTaskBody,
  createListBody
} from "../../support/utils/apiUtils";

import {
  createTask,
  updateTaskPut,
  updateTaskPatch,
  deleteTask,
  createList,
  updateListPut,
  deleteList
} from "../../support/utils/apiRequestUtils";

describe("Verify Todo API Update Functionality", () => {
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
    createdTaskIds.forEach((id) => deleteTask(testData.tasksUrl, id));
    createdListIds.forEach((id) => deleteList(testData.listsUrl, id));
  });

  it("[TC_TASK_UPDATE_001] Verify that a task can be updated successfully using PUT via API", () => {
    const taskName = generateTaskName();
    const createBody = createTaskBody(todoPayloads.task, taskName);

    createTask(testData.tasksUrl, createBody).then((res) => {
      const taskId = res.body.id;
      createdTaskIds.push(taskId);

      updateTaskPut(testData.tasksUrl, taskId, {
        ...res.body,
        ...todoPayloads.updatedTask
      }).then((putRes) => {
        expect(putRes.status).to.eq(200);
      });
    });
  });

  it("[TC_TASK_UPDATE_002] Verify that a task can be updated successfully using PATCH via API", () => {
    const taskName = generateTaskName();

    createTask(testData.tasksUrl, createTaskBody(todoPayloads.task, taskName))
      .then((res) => {
        const taskId = res.body.id;
        createdTaskIds.push(taskId);

        updateTaskPatch(testData.tasksUrl, taskId, todoPayloads.patchTask)
          .then((patchRes) => {
            expect(patchRes.status).to.eq(200);
          });
      });
  });

  it("[TC_LIST_UPDATE_003] Verify that a list can be updated successfully via API", () => {
    const listName = generateListName();

    createList(testData.listsUrl, createListBody(todoPayloads.list, listName))
      .then((res) => {
        const listId = res.body.id;
        createdListIds.push(listId);

        updateListPut(testData.listsUrl, listId, {
          ...res.body,
          ...todoPayloads.updatedList
        }).then((putRes) => {
          expect(putRes.status).to.eq(200);
        });
      });
  });
});
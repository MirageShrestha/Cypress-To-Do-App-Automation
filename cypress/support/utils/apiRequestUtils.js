export const createTask = (tasksUrl, body) => {
  return cy.request({
    method: "POST",
    url: tasksUrl,
    body
  });
};

export const getTasks = (tasksUrl) => {
  return cy.request({
    method: "GET",
    url: tasksUrl
  });
};

export const updateTaskPut = (tasksUrl, taskId, body) => {
  return cy.request({
    method: "PUT",
    url: `${tasksUrl}/${taskId}`,
    body
  });
};

export const updateTaskPatch = (tasksUrl, taskId, body) => {
  return cy.request({
    method: "PATCH",
    url: `${tasksUrl}/${taskId}`,
    body
  });
};

export const deleteTask = (tasksUrl, taskId) => {
  return cy.request({
    method: "DELETE",
    url: `${tasksUrl}/${taskId}`,
    failOnStatusCode: false
  });
};

export const createList = (listsUrl, body) => {
  return cy.request({
    method: "POST",
    url: listsUrl,
    body
  });
};

export const getLists = (listsUrl) => {
  return cy.request({
    method: "GET",
    url: listsUrl
  });
};

export const updateListPut = (listsUrl, listId, body) => {
  return cy.request({
    method: "PUT",
    url: `${listsUrl}/${listId}`,
    body
  });
};

export const deleteList = (listsUrl, listId) => {
  return cy.request({
    method: "DELETE",
    url: `${listsUrl}/${listId}`,
    failOnStatusCode: false
  });
};
export const generateTaskName = () => {
  return `API Task ${Date.now()}`;
};

export const generateListName = () => {
  return `API List ${Date.now()}`;
};

export const createTaskBody = (baseTask, taskName) => {
  return {
    ...baseTask,
    task: taskName
  };
};

export const createListBody = (baseList, listName) => {
  return {
    ...baseList,
    list: listName
  };
};
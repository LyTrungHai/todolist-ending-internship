import { type } from "@testing-library/user-event/dist/type";

export const getTodoApi = () => {
  return {
    type: "GET_TODO",
  };
};

export const addTodo = (data, enqueueSnackbar) => {
  return {
    type: "ADD_TODO",
    todo: data,
    enqueueSnackbar,
  };
};

export const DeleteTodo = (data, enqueueSnackbar) => {
  return {
    type: "DELETE_TODO",
    todoID: data,
    enqueueSnackbar,
  };
};

export const checkComplete = (data) => {
  return {
    type: "COMPLETE_TODO",
    todo: data,
  };
};

export const updateTodo = (data, newTitle, enqueueSnackbar) => {
  return {
    type: "UPDATE_TODO",
    todo: data,
    newTitle,
    enqueueSnackbar,
  };
};

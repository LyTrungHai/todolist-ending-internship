const INITIAL_STATE = [];

export const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_TODO_SAGA":
      return (state = [...action.data]);
    case "ADD_TODO_SAGA":
      return [...state, action.data];
    case "DELETE_TODO_SAGA":
      return [...state].filter((todo) => todo.id !== action.data);
    case "CHECKCOMPLETE_TODO_SAGA":
      return [...state].map((todo) => {
        return todo.id === action.data.id
          ? { ...todo, status: action.data.status }
          : { ...todo };
      });
    case "UPDATE_TODO_SAGA":
      return [...state].map((todo) => {
        return todo.id === action.data.id
          ? {
              ...todo,
              title: action.data.title,
            }
          : { ...todo };
      });
    default:
      return state;
  }
};

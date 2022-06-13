const INITIAL_STATE = {
  userLogin: JSON.parse(localStorage.getItem("LOGIN_USER")) || {},
};

export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const userInfo = action.data;
      localStorage.setItem("LOGIN_USER", JSON.stringify(userInfo));
      return { ...state, userLogin: userInfo };
    case "LOGOUT":
      localStorage.removeItem("LOGIN_USER");
      return state;
    default:
      return state;
  }
};

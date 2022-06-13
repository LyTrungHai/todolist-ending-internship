export const loginAction = (data, enqueueSnackbar, navigate) => {
  return {
    type: "LOGIN",
    userInfo: data,
    enqueueSnackbar,
    navigate,
  };
};

export const registerAction = (data, enqueueSnackbar, resetForm) => {
  return {
    type: "REGISTER",
    userInfo: data,
    enqueueSnackbar,
    resetForm,
  };
};

export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};

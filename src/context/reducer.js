export const reducer = (state, action) => {
  if (action.type === "logedin") {
    return {
      ...state,
      isLoggedIn: true,
    };
  } else if (action.type === "logedout") {
    return {
      ...state,
      isLoggedIn: false,
    };
  } else if (action.type === "CURRENT_USER_INFO") {
    return {
      ...state,

      CurrentUserInfo: action.payload,
    };
  } else if (action.type === "REMOVE_ERROR") {
    return {
      ...state,
      Error: "",
    };
  } else if (action.type === "ADD_ERROR") {
    return {
      ...state,
      Error: action.payload,
    };
  } else if (action.type === "ADD_MESSAGE") {
    return {
      ...state,
      Message: action.payload,
    };
  } else if (action.type === "REMOVE_MESSAGE") {
    return {
      ...state,
      Message: "",
    };
  } else if (action.type === "ALL_USERS") {
    return {
      ...state,
      allUsers: action.payload,
    };
  } else if (action.type === "LOADER_FALSE") {
    return {
      ...state,
      loader: false,
    };
  } else if (action.type === "LOADER_TRUE") {
    return {
      ...state,
      loader: true,
    };
  } else if (action.type === "PROGRESS_BAR") {
    return {
      ...state,
      progressBar: action.payload,
    };
  } else if (action.type === "PROGRESS_BAR_REMOVE") {
    return {
      ...state,
      progressBar: 0,
    };
  }
  // else if (action.type === "USER_IS_ACTIVE") {
  //   return {
  //     ...state,
  //     isActive: true,
  //   };
  // }
  throw new Error("no matching type");
};

const WrapReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.token,
      };
    case "LOGOUT": {
      return {
        ...state,
        token: "",
      };
    }
  }
  return state;
};

export default WrapReducer;

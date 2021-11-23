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
    case "SET_NAME":
      return {
        ...state,
        customerName: action.customerName,
      };
  }
  return state;
};

export default WrapReducer;

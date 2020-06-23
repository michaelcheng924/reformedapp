const initialState = {
  catechism: "0",
  font: "proxima-nova",
  size: 16,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_FONT":
      return {
        ...state,
        font: payload.font,
      };
    case "SET_SIZE":
      return {
        ...state,
        size: payload.size,
      };
    case "SET_CATECHISM":
      return {
        ...state,
        catechism: payload.catechism,
      };
    default:
      return state;
  }
};

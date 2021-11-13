const initialState = {
  catechism: "0",
  confession: "0",
  font: "proxima-nova",
  theme: "Light",
  size: 16,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_THEME":
      return {
        ...state,
        theme: payload.theme,
      };
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
    case "SET_CONFESSION":
      return {
        ...state,
        confession: payload.confession,
      };
    default:
      return state;
  }
};

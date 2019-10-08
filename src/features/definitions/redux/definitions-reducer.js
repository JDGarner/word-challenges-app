import { FETCH_DEFINITIONS_SUCCESS, FETCH_DEFINITIONS_ERROR } from "./definitions-actions";

const initialState = {
  allDefinitions: [],
  currentDefinitions: [],
  loaded: false,
  gameState: "",
  errorCode: "",
  connectionError: false,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_DEFINITIONS_SUCCESS: {
      const allDefinitions = action.definitions;
      console.log(">>> allDefinitions: ", allDefinitions);
      // TODO: get first 5 definitions for currentDefinitions

      return {
        ...state,
        allDefinitions,
        loaded: true,
        connectionError: false,
      };
    }

    case FETCH_DEFINITIONS_ERROR: {
      return { ...state, connectionError: true, errorCode: action.errorCode };
    }

    default:
      return state;
  }
};

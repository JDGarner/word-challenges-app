import {
  FETCH_DEFINITIONS,
  fetchDefinitionsSuccess,
  fetchDefinitionsError,
} from "./definitions-actions";
import fetchFromApi from "../../../fetch-util";
import { ENDPOINTS } from "../../../Config";

export default store => next => action => {
  const { dispatch } = store;

  switch (action.type) {
    case FETCH_DEFINITIONS:
      fetchFromApi(
        ENDPOINTS.DEFINITIONS,
        data => dispatch(fetchDefinitionsSuccess(data)),
        code => dispatch(fetchDefinitionsError(code)),
      );
      break;

    default:
      break;
  }

  return next(action);
};

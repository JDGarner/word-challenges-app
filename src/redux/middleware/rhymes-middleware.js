import { FETCH_RHYMES, fetchRhymesSuccess, fetchRhymesError } from "../actions";

async function fetchRhymesFromApi(store) {
  try {
    const response = await fetch("https://word-challenges-api.jdgarner.now.sh/words");
    const responseJson = await response.json();
    store.dispatch(fetchRhymesSuccess(responseJson));
  } catch (error) {
    console.error(error);
    store.dispatch(fetchRhymesError());
  }
}

export default store => next => action => {
  switch (action.type) {
    case FETCH_RHYMES:
      fetchRhymesFromApi(store);
      break;
    default:
      break;
  }

  return next(action);
};

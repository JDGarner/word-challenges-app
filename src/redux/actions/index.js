export const FETCH_RHYMES = "FETCH_RHYMES";
export const FETCH_RHYMES_SUCCESS = "FETCH_RHYMES_SUCCESS";
export const FETCH_RHYMES_ERROR = "FETCH_RHYMES_ERROR";

export const fetchRhymes = () => ({
  type: FETCH_RHYMES
});

export const fetchRhymesSuccess = words => ({
  type: FETCH_RHYMES_SUCCESS,
  words
});

export const fetchRhymesError = () => ({
  type: FETCH_RHYMES_ERROR
});

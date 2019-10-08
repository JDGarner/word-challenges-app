export const FETCH_DEFINITIONS = "FETCH_DEFINITIONS";
export const FETCH_DEFINITIONS_RETRY = "FETCH_DEFINITIONS_RETRY";
export const FETCH_DEFINITIONS_SUCCESS = "FETCH_DEFINITIONS_SUCCESS";
export const FETCH_DEFINITIONS_ERROR = "FETCH_DEFINITIONS_ERROR";
export const FETCH_ADDITIONAL_DEFINITIONS_SUCCESS = "FETCH_ADDITIONAL_DEFINITIONS_SUCCESS";

export const fetchDefinitions = () => ({
  type: FETCH_DEFINITIONS,
});

export const fetchDefinitionsRetry = () => ({
  type: FETCH_DEFINITIONS_RETRY,
});

export const fetchDefinitionsSuccess = definitions => ({
  type: FETCH_DEFINITIONS_SUCCESS,
  definitions,
});

export const fetchDefinitionsError = errorCode => ({
  type: FETCH_DEFINITIONS_ERROR,
  errorCode,
});

export const fetchAdditionalDefinitionsSuccess = definitions => ({
  type: FETCH_ADDITIONAL_DEFINITIONS_SUCCESS,
  definitions,
});

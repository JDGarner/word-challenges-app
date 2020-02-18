import { ENDPOINTS } from "../app-constants";
import rhymes from "./rhymes";
import { easyDefinitions, hardDefinitions } from "./definitions";

const getMockData = endpoint => {
  if (endpoint === ENDPOINTS.RHYMES) {
    return rhymes;
  }

  if (endpoint === ENDPOINTS.EASY_DEFINITIONS) {
    return easyDefinitions;
  }

  if (endpoint === ENDPOINTS.HARD_DEFINITIONS) {
    return hardDefinitions;
  }

  return null;
};

export default getMockData;

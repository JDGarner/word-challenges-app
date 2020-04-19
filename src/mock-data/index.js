import { ENDPOINTS } from "../app-constants";
import rhymes from "./rhymes";
import { definitions } from "./definitions";

const getMockData = endpoint => {
  if (endpoint === ENDPOINTS.RHYMES) {
    return rhymes;
  }

  if (endpoint === ENDPOINTS.DEFINITIONS) {
    return definitions;
  }

  return null;
};

export default getMockData;

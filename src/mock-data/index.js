import { ENDPOINTS } from "../app-constants";
import { definitions } from "./definitions";
import rhymes from "./rhymes";
import synonyms from "./synonyms";

const getMockData = (endpoint) => {
  if (endpoint === ENDPOINTS.DEFINITIONS) {
    return definitions;
  }

  if (endpoint === ENDPOINTS.RHYMES) {
    return rhymes;
  }

  if (endpoint === ENDPOINTS.SYNONYMS) {
    return synonyms;
  }

  return null;
};

export default getMockData;

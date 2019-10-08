import { MOCK_URL } from "./Config";
import getMockData from "./mock-data";

const mockFetch = endpoint => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(createMockSuccessResponse(endpoint));
    }, 200);
  });
};

const createMockSuccessResponse = endpoint => {
  return {
    status: 200,
    json: () =>
      new Promise(resolve => {
        resolve(getMockData(endpoint));
      }),
  };
};

const enhancedFetch = async (url, endpoint) => {
  if (url === MOCK_URL) {
    return mockFetch(endpoint);
  }

  return fetch(`${url}/${endpoint}`);
};

export default enhancedFetch;

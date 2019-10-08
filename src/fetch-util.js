import NetInfo from "@react-native-community/netinfo";
import { MOCK_URL, API_URL } from "./Config";
import getMockData from "./mock-data";
import { ERROR_CODES } from "./components/error/ErrorScreen";

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

async function fetchData(endpoint, onError = () => {}) {
  return await NetInfo.fetch().then(async state => {
    if (!state.isConnected && API_URL !== MOCK_URL) {
      onError(ERROR_CODES.CONNECTION);
      return null;
    }

    try {
      const response = await enhancedFetch(API_URL, endpoint);

      if (response.status === 200) {
        return response;
      } else {
        onError(ERROR_CODES.API);
        return null;
      }
    } catch (error) {
      console.error(error);
      onError(ERROR_CODES.API);
      return null;
    }
  });
}

const fetchFromApi = async (endpoint, onSuccess, onError = () => {}) => {
  const response = await fetchData(endpoint, onError);

  try {
    if (response) {
      const responseJson = await response.json();
      onSuccess(responseJson);
    }
  } catch (error) {
    console.error(error);
    onError(ERROR_CODES.GENERIC);
  }
};

export default fetchFromApi;

import Config from "react-native-config";

export const MOCK_URL = "MOCK";
export const LOCAL_URL = "http://localhost:3001";

let ConfigWithOverrides = {
  ...Config,
};

// Set any overrides here:
// ConfigWithOverrides.API_URL = MOCK_URL;
// ConfigWithOverrides.API_URL = LOCAL_URL;

export const getConfig = () => ConfigWithOverrides;

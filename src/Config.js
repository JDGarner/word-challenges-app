import Config from "react-native-config";

export const MOCK_URL = "MOCK";

let ConfigWithOverrides = {
  ...Config,
};

// Set any overrides here:
// ConfigWithOverrides.API_URL = MOCK_URL;

export const getConfig = () => ConfigWithOverrides;

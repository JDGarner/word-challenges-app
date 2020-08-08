import Config from "react-native-config";
import { Platform } from "react-native";

export const MOCK_URL = "MOCK";
export const LOCAL_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000/dev" : "http://localhost:3000/dev";

let ConfigWithOverrides = {
  ...Config,
};

// Use mocks for e2e tests (because words from real BE are random)
if (Config.RN_SRC_EXT === "e2e.js") {
  ConfigWithOverrides.API_URL = MOCK_URL;
}

// Set any overrides here:
// ConfigWithOverrides.API_URL = MOCK_URL;
// ConfigWithOverrides.API_URL = LOCAL_URL;

export const getConfig = () => ConfigWithOverrides;

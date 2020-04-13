import Config from "react-native-config";
import { Platform } from "react-native";

export const MOCK_URL = "MOCK";
export const LOCAL_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3001" : "http://localhost:3001";

let ConfigWithOverrides = {
  ...Config,
};

// Set any overrides here:
// ConfigWithOverrides.API_URL = MOCK_URL;
// ConfigWithOverrides.API_URL = LOCAL_URL;

export const getConfig = () => ConfigWithOverrides;

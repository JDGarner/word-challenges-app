import { AppRegistry, LogBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import { getConfig } from "./src/Config";

if (getConfig().IS_PROD) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  LogBox.ignoreAllLogs();
} else {
  // Ignore styled-components warning about unitless styling properties and NativeEventEmitter error
  LogBox.ignoreLogs(["to contain units", "new NativeEventEmitter"]);
}

AppRegistry.registerComponent(appName, () => App);

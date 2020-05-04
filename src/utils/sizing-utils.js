import { Dimensions } from "react-native";

export const SMALL = "SMALL";
export const MEDIUM = "MEDIUM";
export const LARGE = "LARGE";

const getScreenSize = () => {
  const windowHeight = Dimensions.get("window").height;

  if (windowHeight > 770) {
    return LARGE;
  }

  if (windowHeight > 630) {
    return MEDIUM;
  }

  return SMALL;
};

export const SCREEN_SIZE = getScreenSize();

export const getSizingForOptions = (small, medium, large) => {
  const OPTIONS = {
    [SMALL]: small,
    [MEDIUM]: medium,
    [LARGE]: large,
  };

  return OPTIONS[SCREEN_SIZE];
};

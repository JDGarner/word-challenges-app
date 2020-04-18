import { Animated } from "react-native";

export const animateButtonPressIn = (value, toValue) => {
  Animated.spring(value, {
    toValue,
    useNativeDriver: true,
  }).start();
};

export const animateButtonPressOut = value => {
  Animated.spring(value, {
    toValue: 1,
    speed: 16,
    bounciness: 16,
    useNativeDriver: true,
  }).start();
};
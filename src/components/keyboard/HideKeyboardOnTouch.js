import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import useKeyboard from "../../hooks/keyboard";

export default function HideKeyboardOnTouch({ children }) {
  const [, dismiss] = useKeyboard();

  return <TouchableWithoutFeedback onPress={dismiss}>{children}</TouchableWithoutFeedback>;
}

import React from "react";
import { SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const AppBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={["#2ac6b2", "#870acb"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default AppBackground;

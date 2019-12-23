import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";

const PopInView = ({ children }) => {
  const [scaleValue] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.0,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleValue]);

  return (
    <Animated.View pointerEvents="none" style={{ transform: [{ scale: scaleValue }] }}>
      {children}
    </Animated.View>
  );
};

export default PopInView;

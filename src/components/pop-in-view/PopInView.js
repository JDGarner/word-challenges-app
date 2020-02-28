import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";

const PopInView = ({ children, popToSize, duration, delay, pointerEvents, onAnimationEnd }) => {
  const [scaleValue] = useState(new Animated.Value(0.8));
  const [opacity] = useState(new Animated.Value(0));

  const animate = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: popToSize,
        duration: duration * 0.4,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.0,
        duration: duration * 0.6,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(onAnimationEnd);
  };

  useEffect(() => {
    if (delay) {
      setTimeout(() => {
        animate();
      }, delay);
    } else {
      animate();
    }
  }, [scaleValue]);

  return (
    <Animated.View
      pointerEvents={pointerEvents}
      style={{ transform: [{ scale: scaleValue }], opacity }}>
      {children}
    </Animated.View>
  );
};

PopInView.defaultProps = {
  pointerEvents: "none",
  popToSize: 1.2,
  duration: 300,
  onAnimationEnd: () => {},
};

export default PopInView;

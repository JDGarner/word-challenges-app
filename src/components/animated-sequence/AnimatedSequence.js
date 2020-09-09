import React from "react";
import { View } from "react-native";
import PopInView from "../pop-in-view/PopInView";

const AnimatedSequence = ({
  items,
  itemsAreButtons,
  popToSize,
  animationGapTime,
  animationStartDelay,
  animationAppearDuration,
  containerStyle,
  onAnimationStart,
  onAnimationEnd,
}) => {
  const handleAnimationEnd = (index) => {
    if (index === items.length - 1) {
      onAnimationEnd();
    }
  };

  return items.map((item, i) => (
    <View key={item.id} style={containerStyle}>
      <PopInView
        popToSize={popToSize}
        duration={animationAppearDuration}
        delay={i * animationGapTime + animationStartDelay}
        pointerEvents={itemsAreButtons ? "auto" : "none"}
        onAnimationStart={() => onAnimationStart(i)}
        onAnimationEnd={() => handleAnimationEnd(i)}>
        {item.component}
      </PopInView>
    </View>
  ));
};

AnimatedSequence.defaultProps = {
  itemsAreButtons: true,
  popToSize: 1,
  animationGapTime: 75,
  animationStartDelay: 50,
  animationAppearDuration: 700,
  containerStyle: {},
  onAnimationStart: () => {},
  onAnimationEnd: () => {},
};

export default AnimatedSequence;

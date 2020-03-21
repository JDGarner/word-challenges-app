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
}) => {
  return items.map((item, i) => (
    <View style={containerStyle}>
      <PopInView
        key={item.id}
        popToSize={popToSize}
        duration={animationAppearDuration}
        delay={i * animationGapTime + animationStartDelay}
        pointerEvents={itemsAreButtons ? "auto" : "none"}>
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
};

export default AnimatedSequence;

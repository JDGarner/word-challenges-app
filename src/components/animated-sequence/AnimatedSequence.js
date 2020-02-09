import React from "react";
import PopInView from "../pop-in-view/PopInView";

const AnimatedSequence = ({
  items,
  popToSize,
  animationGapTime,
  animationStartDelay,
  animationAppearDuration,
}) => {
  return items.map((item, i) => (
    <PopInView
      popToSize={popToSize}
      duration={animationAppearDuration}
      delay={i * animationGapTime + animationStartDelay}>
      {item}
    </PopInView>
  ));
};

AnimatedSequence.defaultProps = {
  popToSize: 1.1,
  animationGapTime: 100,
  animationStartDelay: 100,
  animationAppearDuration: 500,
};

export default AnimatedSequence;

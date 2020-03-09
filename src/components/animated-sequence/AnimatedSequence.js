import React from "react";
import PopInView from "../pop-in-view/PopInView";

const AnimatedSequence = ({
  items,
  itemsAreButtons,
  popToSize,
  animationGapTime,
  animationStartDelay,
  animationAppearDuration,
}) => {
  return items.map((item, i) => (
    <PopInView
      key={item.id}
      popToSize={popToSize}
      duration={animationAppearDuration}
      delay={i * animationGapTime + animationStartDelay}
      pointerEvents={itemsAreButtons ? "auto" : "none"}>
      {item.component}
    </PopInView>
  ));
};

AnimatedSequence.defaultProps = {
  itemsAreButtons: true,
  popToSize: 1.1,
  animationGapTime: 75,
  animationStartDelay: 50,
  animationAppearDuration: 500,
};

export default AnimatedSequence;

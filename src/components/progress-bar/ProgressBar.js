import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { getSizingForOptions } from "../../utils/sizing-utils";
import colors from "../../theme/colors";

const PROGRESS_HEIGHT = getSizingForOptions(14, 16, 18, 28);

const ProgressBarContainer = styled(View)`
  width: 100%;
  height: ${({ height }) => height || PROGRESS_HEIGHT};
  flex-direction: row;
`;

const Bar = styled(View)`
  height: ${({ height }) => height || PROGRESS_HEIGHT};
  flex: 1;
  background-color: ${({ highlighted }) =>
    highlighted ? colors.textColorSelected : colors.textColorLighter};
  margin-horizontal: ${({ marginH }) => marginH || 6};
`;

const ProgressBar = ({ currentLevel, total, containerStyle, marginH, height }) => {
  const bars = [];
  for (let i = 1; i <= total; i++) {
    bars.push(<Bar highlighted={currentLevel >= i} marginH={marginH} height={height} />);
  }

  return (
    <ProgressBarContainer height={height} style={containerStyle}>
      {bars}
    </ProgressBarContainer>
  );
};

export default ProgressBar;

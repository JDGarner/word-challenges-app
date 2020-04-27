import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { ScreenContainerPadded, TopBar, MediumLargeText } from "../../components";

const InfoScreenContainer = styled(View)`
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

// const InfoScreenRow = styled(View)`
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   padding-vertical: 8;
//   padding-horizontal: 8;
// `;

const InfoScreen = ({ onNavigateBack }) => {
  return (
    <ScreenContainerPadded>
      <TopBar onPressLeftButton={onNavigateBack} />
      <InfoScreenContainer>
        <MediumLargeText>Info Screen</MediumLargeText>
      </InfoScreenContainer>
    </ScreenContainerPadded>
  );
};

export default InfoScreen;

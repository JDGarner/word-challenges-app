import React from "react";
import styled from "styled-components";
import { ActivityIndicator, View } from "react-native";
import theme from "../../theme";

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color={theme.textColor} />
    </LoadingContainer>
  );
};

export default LoadingScreen;

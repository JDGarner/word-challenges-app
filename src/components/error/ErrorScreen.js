import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { MediumText, LargeText } from "../text/Text";
import { PaddedButton } from "../button/Button";
import { ScreenContainerPadded } from "../containers/Containers";
import TopBar from "../top-bar/TopBar";

export const ERROR_CODES = {
  CONNECTION: "CONNECTION",
  TIMEOUT: "TIMEOUT",
  API: "API",
  GENERIC: "GENERIC",
};

const ERROR_CODES_TO_TEXT = {
  CONNECTION: "Network error, no internet connection",
  TIMEOUT: "Network request timed out",
  API: "Oops, something went wrong, our servers may be down at the moment",
  GENERIC: "Oops, something went wrong, our servers may be down at the moment",
};

const ErrorText = styled(MediumText)`
  text-align: center;
  margin-bottom: 30px;
`;

const ErrorButton = styled(PaddedButton)`
  width: 160;
  justify-content: center;
  align-items: center;
`;

const ErrorScreen = ({ onButtonPress, errorCode, onPressBack }) => {
  return (
    <ScreenContainerPadded>
      {/* <TopBar onPressLeftButton={onPressBack} /> */}
      <View
        style={{
          flex: 1,
          marginBottom: 120,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}>
        <ErrorText>{ERROR_CODES_TO_TEXT[errorCode]}</ErrorText>
        {onButtonPress && (
          <ErrorButton onPress={onButtonPress}>
            <LargeText>Retry</LargeText>
          </ErrorButton>
        )}
      </View>
    </ScreenContainerPadded>
  );
};

ErrorScreen.defaultProps = {
  errorCode: ERROR_CODES.GENERIC,
};

export default ErrorScreen;

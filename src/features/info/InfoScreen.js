import React, { useState } from "react";
import { View, Linking, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { ScreenContainerPadded, TopBar, MediumLargeText, MediumText } from "../../components";
import colors from "../../theme/colors";
import AnimatedButton from "../../components/button/AnimatedButton";

const InfoScreenContainer = styled(View)`
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

const InfoScreenRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 16;
  padding-horizontal: 8;
  border-top-width: 1;
  border-top-color: ${colors.textColorLight};
`;

const InfoTextContainer = styled(View)`
  padding-bottom: 32;
  padding-horizontal: 8;
`;

const InfoText = styled(MediumText)`
  padding-bottom: ${({ pad }) => (pad ? 12 : 1)};
  padding-top: 1;
`;

const LinkText = styled(MediumText)`
  text-decoration: underline;
  text-decoration-color: ${colors.textColor};
`;

const InfoTextWithLink = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: ${({ pad }) => (pad ? 12 : 1)};
  padding-top: 1;
`;

const DownIcon = <Icon name={"keyboard-arrow-down"} size={38} color={colors.textColor} />;
const UpIcon = <Icon name={"keyboard-arrow-up"} size={38} color={colors.textColor} />;

const InfoScreen = ({ onNavigateBack }) => {
  const [showRatingInfo, setShowRatingInfo] = useState(false);
  const [showRhymingInfo, setShowRhymingInfo] = useState(false);

  const openURL = async url => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScreenContainerPadded>
      <TopBar onPressLeftButton={onNavigateBack} />
      <InfoScreenContainer>
        <AnimatedButton inTextContainer={false} onPress={() => setShowRatingInfo(!showRatingInfo)}>
          <InfoScreenRow>
            <MediumLargeText>Rating System</MediumLargeText>
            {showRatingInfo ? UpIcon : DownIcon}
          </InfoScreenRow>
        </AnimatedButton>
        {showRatingInfo && (
          <InfoTextContainer>
            <InfoTextWithLink pad>
              <MediumText>The rating system is based on the </MediumText>
              <TouchableOpacity
                onPress={() => openURL("https://en.wikipedia.org/wiki/Elo_rating_system")}>
                <LinkText>ELO system</LinkText>
              </TouchableOpacity>
            </InfoTextWithLink>

            <InfoText>
              Score changes are based on the difficulty of the question relative to your own rating,
              for example:
            </InfoText>
            <InfoText>
              - Correctly answering a Master rated question as a Novice rated player will gain you a
              lot of points
            </InfoText>
            <InfoText pad>
              - Incorrectly answering a Novice rated question as a Master rated player will lose you
              a lot of points
            </InfoText>
            <InfoText pad>
              The difficulty rating of each question also changes over time relative to the rating
              of the player that answered correctly or incorrectly.
            </InfoText>
            <InfoText>Rank Boundaries:</InfoText>
            <InfoText>Novice: 600 - 1000</InfoText>
            <InfoText>Journeyman: 1000 - 1600</InfoText>
            <InfoText>Expert: 1600 - 2200</InfoText>
            <InfoText>Master: 2200 - 3600</InfoText>
          </InfoTextContainer>
        )}
        <AnimatedButton
          inTextContainer={false}
          onPress={() => setShowRhymingInfo(!showRhymingInfo)}>
          <InfoScreenRow>
            <MediumLargeText>Rhyming</MediumLargeText>
            {showRhymingInfo ? UpIcon : DownIcon}
          </InfoScreenRow>
        </AnimatedButton>
      </InfoScreenContainer>
    </ScreenContainerPadded>
  );
};

export default InfoScreen;

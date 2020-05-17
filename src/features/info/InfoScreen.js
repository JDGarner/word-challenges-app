import React, { useState } from "react";
import { View, Linking, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { ScreenContainerPadded, TopBar, MediumLargeText, MediumText } from "../../components";
import colors from "../../theme/colors";
import AnimatedButton from "../../components/button/AnimatedButton";
import SoundManager from "../sound/SoundManager";

const InfoScreenContainer = styled(View)`
  width: 100%;
  flex: 1;
  justify-content: flex-start;
  padding-top: 16;
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
  padding-top: 4;
  padding-bottom: 32;
  padding-horizontal: 2;
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
  const [showAboutInfo, setShowAboutInfo] = useState(false);

  const openURL = async url => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  const playPressSound = showing => {
    if (showing) {
      SoundManager.getInstance().playMenuNegativeButtonSound();
    } else {
      SoundManager.getInstance().playMenuButtonSound();
    }
  };

  const onPressRatingInfo = () => {
    playPressSound(showRatingInfo);
    setShowRatingInfo(!showRatingInfo);
  };

  const onPressRhymingInfo = () => {
    playPressSound(showRhymingInfo);
    setShowRhymingInfo(!showRhymingInfo);
  };

  const onPressAboutInfo = () => {
    playPressSound(showAboutInfo);
    setShowAboutInfo(!showAboutInfo);
  };

  return (
    <ScreenContainerPadded>
      <TopBar onPressLeftButton={onNavigateBack} />
      <InfoScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AnimatedButton inTextContainer={false} onPress={onPressRatingInfo}>
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
                Score changes are based on the difficulty of the question relative to your own
                rating, for example:
              </InfoText>
              <InfoText>
                - Correctly answering a Master rated question as a Novice rated player will gain you
                a lot of points
              </InfoText>
              <InfoText pad>
                - Incorrectly answering a Novice rated question as a Master rated player will lose
                you a lot of points
              </InfoText>
              <InfoText pad>
                The difficulty rating of each question also changes over time relative to the rating
                of the player that answered correctly or incorrectly.
              </InfoText>
              <InfoText>Rank Boundaries:</InfoText>
              <InfoText>Novice: 600 - 1000</InfoText>
              <InfoText>Journeyman: 1000 - 1600</InfoText>
              <InfoText>Expert: 1600 - 2400</InfoText>
              <InfoText>Master: 2400+</InfoText>
            </InfoTextContainer>
          )}
          <AnimatedButton inTextContainer={false} onPress={onPressRhymingInfo}>
            <InfoScreenRow>
              <MediumLargeText>Rhyming</MediumLargeText>
              {showRhymingInfo ? UpIcon : DownIcon}
            </InfoScreenRow>
          </AnimatedButton>
          {showRhymingInfo && (
            <InfoTextContainer>
              <InfoTextWithLink pad>
                <MediumText>For a rhyme to be considered a </MediumText>
                <TouchableOpacity
                  onPress={() =>
                    openURL("https://en.wikipedia.org/wiki/Perfect_and_imperfect_rhymes")
                  }>
                  <LinkText>perfect rhyme</LinkText>
                </TouchableOpacity>
                <MediumText> the following must be true:</MediumText>
              </InfoTextWithLink>
              <InfoText pad>
                1) The stressed vowel sound in both words must be identical, as well as any
                subsequent sounds. For example, "sky" and "high"; "skylight" and "highlight".
              </InfoText>
              <InfoText pad>
                2) The onset of the stressed syllable in the words must differ. For example, "bean"
                and "green" is a perfect rhyme, while "leave" and "believe" is not.
              </InfoText>
              <InfoText>
                The rhyming data we use is not perfect; there may be perfect rhymes missing or
                imperfect rhymes present. We are continuing to improve this dataset.
              </InfoText>
            </InfoTextContainer>
          )}
          <AnimatedButton inTextContainer={false} onPress={onPressAboutInfo}>
            <InfoScreenRow>
              <MediumLargeText>About</MediumLargeText>
              {showAboutInfo ? UpIcon : DownIcon}
            </InfoScreenRow>
          </AnimatedButton>
          {showAboutInfo && (
            <InfoTextContainer>
              <InfoText pad>This game was developed by Jamie Garner.</InfoText>
              <InfoText>
                If you have any feedback you can email me at jamiegarner123@gmail.com :)
              </InfoText>
            </InfoTextContainer>
          )}
        </ScrollView>
      </InfoScreenContainer>
    </ScreenContainerPadded>
  );
};

export default InfoScreen;

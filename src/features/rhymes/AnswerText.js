import React, { Component } from "react";
import styled from "styled-components";
import { TextInput, View, Animated } from "react-native";

import { AnimatedMediumText } from "../../components";
import { height } from "../../constants/Layout";
import colors from "../../theme/colors";

const AnswerTextContainer = styled(View)`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const AnswerInput = styled(TextInput)`
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
  flex-shrink: 0;
  padding: 5px;
  margin-bottom: auto;
  min-width: 135px;
  text-align: center;
  font-size: ${props => props.theme.medium.fontSize};
  font-weight: ${props => props.theme.medium.fontWeight};
`;

const AnimatedAnswer = styled(Animated.View)`
  position: absolute;
  /* border-width: 1px;
  border-color: red; */
  padding: 5px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ANIMATION_DURATION = 400;
const ANIMATION_RADIUS = 100;
const ANIMATION_SNAPSHOTS = 50;

export default class AnswerText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerText: "",
      answerTextPlaceholder: "Enter Rhyme",
      animatedAnswerText: "",
      fadeAnimation: new Animated.Value(1),
      correctAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
      incorrectAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
      animatedAnswerColor: colors.correctAnswer,
    };

    this.transform = [{ translateY: 0 }, { translateX: 0 }];

    this.incorrectAnimationX = this.getIncorrectXAnimation();
    this.incorrectAnimationY = this.getIncorrectYAnimation();
  }

  getIncorrectXAnimation = () => {
    const inputRange = [];
    const outputRange = [];
    const thicknessFactor = 0.5;

    for (let i = 0; i <= ANIMATION_SNAPSHOTS; ++i) {
      const value = i / ANIMATION_SNAPSHOTS;
      const move =
        (-Math.cos(value * Math.PI) * ANIMATION_RADIUS + ANIMATION_RADIUS) * thicknessFactor;

      inputRange.push(value);
      outputRange.push(move);
    }

    // Push on the same values but negative so the animation can run in reverse
    for (let i = 0; i <= ANIMATION_SNAPSHOTS * 2 - 1; i += 2) {
      inputRange.unshift(inputRange[i + 1] * -1);
      outputRange.unshift(outputRange[i + 1] * -1);
    }

    // console.log(">>> X: ", inputRange, outputRange);

    return this.state.incorrectAnimation.x.interpolate({
      inputRange,
      outputRange,
    });
  };

  getIncorrectYAnimation = () => {
    const inputRange = [];
    const outputRange = [];
    let tailElongationCounter = 0;
    const tailElongationFactor = 4;

    for (let i = 0; i <= ANIMATION_SNAPSHOTS; ++i) {
      const value = i / ANIMATION_SNAPSHOTS;
      let move = -Math.sin(value * Math.PI) * ANIMATION_RADIUS * 0.5;

      // Elongate the tail of the semi-circle
      if (i > ANIMATION_SNAPSHOTS / 2) {
        move = move + tailElongationCounter++ * tailElongationFactor;
      }

      inputRange.push(value);
      outputRange.push(move);
    }

    // console.log(">>> Y: ", inputRange, outputRange);

    return this.state.incorrectAnimation.y.interpolate({
      inputRange,
      outputRange,
    });
  };

  animateCorrectAnswer = () => {
    const { correctAnimation } = this.state;

    this.transform = correctAnimation.getTranslateTransform();
    this.setState({
      animatedAnswerColor: colors.correctAnswer,
    });

    Animated.spring(correctAnimation, {
      toValue: { x: 0, y: -height / 4 },
      duration: ANIMATION_DURATION,
    }).start(() => correctAnimation.resetAnimation());

    this.animateAnswerFade();
  };

  animateIncorrectAnswer = () => {
    const { incorrectAnimation } = this.state;

    this.transform = [
      { translateY: this.incorrectAnimationY },
      { translateX: this.incorrectAnimationX },
    ];
    this.setState({
      animatedAnswerColor: colors.incorrectAnswer,
    });

    const x = Math.random() > 0.5 ? 1 : -1;

    Animated.timing(incorrectAnimation, {
      toValue: { x, y: 1 },
      duration: ANIMATION_DURATION,
    }).start(() => incorrectAnimation.resetAnimation());

    this.animateAnswerFade();
  };

  animateAnswerFade = () => {
    const { fadeAnimation } = this.state;

    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start(() => fadeAnimation.resetAnimation());
  };

  onChangeAnswerText = answerText => {
    this.setState({ answerText });
  };

  isAnswerCorrect = () => {
    return this.props.currentRhymes.some(
      rhyme => rhyme.word === this.state.answerText.toLowerCase(),
    );
  };

  onSubmitAnswer = () => {
    if (this.isAnswerCorrect()) {
      this.animateCorrectAnswer();
    } else {
      this.animateIncorrectAnswer();
    }

    this.setState({
      answerText: "",
      answerTextPlaceholder: "",
      animatedAnswerText: this.state.answerText,
    });
  };

  render() {
    const {
      answerText,
      answerTextPlaceholder,
      animatedAnswerText,
      animatedAnswerColor,
      fadeAnimation,
    } = this.state;

    return (
      <AnswerTextContainer>
        <AnimatedAnswer style={{ transform: this.transform }}>
          <AnimatedMediumText style={{ opacity: fadeAnimation, color: animatedAnswerColor }}>
            {animatedAnswerText}
          </AnimatedMediumText>
        </AnimatedAnswer>
        <AnswerInput
          value={answerText}
          placeholder={answerTextPlaceholder}
          onChangeText={this.onChangeAnswerText}
          onSubmitEditing={this.onSubmitAnswer}
          blurOnSubmit={false}
          autoFocus
        />
      </AnswerTextContainer>
    );
  }
}

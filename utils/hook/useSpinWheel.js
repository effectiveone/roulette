import { useState, useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import useBet from "./useBet";
const useSpinWheel = (rewards) => {
  const { onBetPress } = useBet();
  const [selectedReward, setSelectedReward] = useState(null);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(null);
  const [myBetValue, setMyBetValue] = useState();
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const spinWheel = (myBet) => {
    if (isWheelSpinning) return;

    const spinDuration = 3000;
    const spinAngleDegrees = Math.floor(Math.random() * 360) + 1080;
    setSpinAngle(spinAngleDegrees);

    setIsWheelSpinning(true);
    setMyBetValue(myBet);
  };

  const onEndAnimation = () => {
    let selectedRewards = null;
    rewards.forEach((reward) => {
      const { color, number, startAngle, endAngle } = reward;
      const spinAngleDegrees = spinAngle % 360;

      if (spinAngleDegrees >= startAngle && spinAngleDegrees <= endAngle) {
        selectedRewards = { color, number };
      }
    });
    setSelectedReward(selectedRewards);
    setIsWheelSpinning(false);
    onBetPress(selectedRewards, myBetValue);
  };

  const wheelStyle = {
    animationName: isWheelSpinning ? "spin" : "",
    animationDuration: "5s",
    animationTimingFunction: "cubic-bezier(  0.95 , 0.55, 0.1,  0.045)",
    transform: `rotate(${spinAngle}deg)`,
    transformOrigin: "center",
    position: "relative",
  };

  return {
    selectedReward,
    isWheelSpinning,
    spin,
    onEndAnimation,
    spinWheel,
    wheelStyle,
    spinAngle,
  };
};

export default useSpinWheel;

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import Svg, { Circle, Text as SvgText, Path } from "react-native-svg";
import rouletteWheelNumbers from "../utils/helpers/rouletteWheelNumbers";
import useSpinWheel from "../utils/hook/useSpinWheel";
import BetScreen from "./betScreen";
const WheelOfFortune = () => {
  const {
    selectedReward,
    isWheelSpinning,
    onEndAnimation,
    spin,
    spinWheel,
    wheelStyle,
    spinAngle,
  } = useSpinWheel(rouletteWheelNumbers);
  console.log("selectedReward", selectedReward);
  const renderWheelSection = (section, index, selectedNumber) => {
    const sweepAngle = 360 / rouletteWheelNumbers.length;
    const rotateAngle = index * sweepAngle;
    const path = `M250,250 L250,50 A200,200 0 0,1 ${
      250 + 200 * Math.sin((sweepAngle * Math.PI) / 180)
    },${250 - 200 * Math.cos((sweepAngle * Math.PI) / 180)} L250,250 Z`;

    const labelRadius = 180;
    const labelX =
      250 +
      labelRadius * Math.sin(((rotateAngle + sweepAngle / 2) * Math.PI) / 180);
    const labelY =
      250 -
      labelRadius * Math.cos(((rotateAngle + sweepAngle / 2) * Math.PI) / 180);

    const ballSize = 20;
    const ballX = 250 + 160 * Math.sin((rotateAngle * Math.PI) / 180);
    const ballY = 250 - 160 * Math.cos((rotateAngle * Math.PI) / 180);
    const ballPath = `M${
      ballX - ballSize
    },${ballY} A${ballSize},${ballSize} 0 1,0 ${
      ballX + ballSize
    },${ballY} A${ballSize},${ballSize} 0 1,0 ${ballX - ballSize},${ballY} Z`;

    const keyframes = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(${
      360 + spinAngle
    }deg); } } `;

    return (
      <React.Fragment key={section.number}>
        <style>{keyframes}</style>
        <g style={wheelStyle} onAnimationEnd={onEndAnimation}>
          <Path
            d={path}
            fill={section.color}
            transform={`rotate(${rotateAngle}, 250, 250)`}
          />
          {selectedNumber === section.number && !isWheelSpinning && (
            <Path key={`${section.number}-ball`} d={ballPath} fill="white" />
          )}
          <SvgText
            x={labelX}
            y={labelY}
            textAnchor="middle"
            fill="white"
            fontSize="16"
          >
            {section.number}
          </SvgText>
        </g>
      </React.Fragment>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.button, marginBottom: "-400px" }}
        onPress={spinWheel}
        disabled={isWheelSpinning}
      >
        <Text style={styles.buttonText}>
          {isWheelSpinning ? "Kręcę..." : "Kręć kołem!"}
        </Text>
      </TouchableOpacity>
      <Svg width="100%" height="100%" viewBox="0 0 500 500">
        <Circle
          cx="250"
          cy="250"
          r="220"
          fill="black"
          stroke="#000"
          strokeWidth="2"
        />
        {rouletteWheelNumbers.map(renderWheelSection)}
        {/* {rouletteWheelNumbers.map(renderWheelSectionWithBall)} */}
        <Circle
          cx="250"
          cy="250"
          r="100"
          fill="black"
          stroke="#000"
          strokeWidth="2"
        />
        <SvgText
          x="290"
          y="257"
          textAnchor="end"
          fontSize="16"
          fontWeight="bold"
          style={styles.centeredText}
        >
          {isWheelSpinning
            ? "?"
            : selectedReward
            ? selectedReward.label
            : "Kręć kołem!"}
        </SvgText>
      </Svg>

      <BetScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredText: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WheelOfFortune;

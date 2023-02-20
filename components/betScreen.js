import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useBet from "../utils/hook/useBet";
import rouletteWheelNumbers from "../utils/helpers/rouletteWheelNumbers";

const BetButton = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.betButton,
      {
        height: "100%",
        border: "1px solid white",
        backgroundColor: "lightgreen",
      },
    ]}
  >
    <Text style={styles.betButtonText}>{title}</Text>
  </TouchableOpacity>
);

const BetScreen = () => {
  const [betAmount, setBetAmount] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { win, payout, placeBet } = useBet(
    betAmount,
    selectedNumber,
    selectedColor
  );

  const onNumberPress = (number) => {
    setSelectedNumber(number);
    setSelectedColor(null);
  };

  const onColorPress = (color) => {
    setSelectedColor(color);
    setSelectedNumber(null);
  };

  const onBetPress = () => {
    placeBet();
  };

  const onClearPress = () => {
    setBetAmount(0);
    setSelectedNumber(null);
    setSelectedColor(null);
  };

  const renderNumber = (number) => (
    <TouchableOpacity
      key={number}
      style={[
        styles.numberButton,
        selectedNumber === number && styles.selectedNumberButton,
      ]}
      onPress={() => onNumberPress(number)}
    >
      <Text style={[styles.numberButtonText, { color: "white" }]}>
        {number}
      </Text>
    </TouchableOpacity>
  );

  const renderColor = (color) => (
    <TouchableOpacity
      key={color}
      style={[
        styles.colorButton,
        selectedColor === color && styles.selectedColorButton,
      ]}
      onPress={() => onColorPress(color)}
    >
      <Text style={[styles.colorButtonText, { color: "white" }]}>{color}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderColor("green")}
      {renderColor("black")}
      {renderColor("red")}
      <View style={styles.betAmountContainer}>
        <Text style={styles.betAmountText}>Bet Amount:</Text>
        <Text style={styles.betAmountText}>{betAmount}</Text>
      </View>
      <View style={styles.superGrid}>
        <View style={styles.betButtonColorContainer}>
          <BetButton
            style={{ gridRow: "1/2" }}
            title="Even"
            onPress={() => onNumberPress("even")}
          />
          <BetButton title="Odd" onPress={() => onNumberPress("odd")} />
          <BetButton title="Black" onPress={() => onColorPress("black")} />
          <BetButton title="Red" onPress={() => onColorPress("red")} />
        </View>
        <View style={styles.betButtonNumbersContainer}>
          <BetButton
            style={{ gridRow: "1/2" }}
            title="1-12"
            onPress={() => onNumberPress("1-12")}
          />
          <BetButton
            style={[styles.betButton, { gridRow: "2/3" }]}
            title="13-24"
            onPress={() => onNumberPress("13-24")}
          />
          <BetButton
            style={[styles.betButton, { gridRow: "3/4" }]}
            title="25-36"
            onPress={() => onNumberPress("25-36")}
          />
        </View>
        <View style={styles.numbersContainer}>
          {rouletteWheelNumbers
            ?.sort((a, b) => a.number - b.number)
            .map((item, index) => {
              const stylesArray = [
                styles.numberRow,
                { backgroundColor: item.color },
                index === 0 && styles.centerChild, // add the class to the first item
              ];
              return (
                <View key={item.number} style={stylesArray}>
                  {renderNumber(item.number)}
                </View>
              );
            })}
        </View>
      </View>
      <TouchableOpacity onPress={onBetPress} style={styles.placeBetButton}>
        <Text style={styles.placeBetButtonText}>Place Bet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClearPress} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      {win !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{win ? "You won!" : "You lost"}</Text>
          <Text style={styles.resultText}>Payout: {payout}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  betAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  betAmountText: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  superGrid: {
    backgroundColor: "green",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    paddingBottom: "-50px",
  },
  betButtonColorContainer: {
    paddingTop: "40px",
    paddingBottom: "30px",
    backgroundColor: "green",
    gridColumn: "1/2",
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
  },
  betButtonNumbersContainer: {
    paddingTop: "40px",
    paddingBottom: "30px",
    gridColumn: "2/3",
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
  },
  numbersContainer: {
    gridColumn: "3 / 6",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(13, 1fr)",

    justifyContent: "center",
    marginBottom: 20,
  },
  centerChild: {
    gridColumn: "1 / 4",
    gridRow: "1",
    justifyContent: "center",
    alignItems: "center",
  },

  betButton: {
    opacity: 1,
    backgroundColor: "green",
  },
  numberButton: {
    width: 40,
    height: 40,
    margin: 5,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedNumberButton: {
    backgroundColor: "yellow",
  },
  numberButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  colorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  colorButton: {
    width: 60,
    height: 30,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedColorButton: {
    backgroundColor: "yellow",
  },

  colorButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  betButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  betButton: {
    width: 80,
    height: 50,
    margin: 10,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  betButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
  placeBetButton: {
    width: 150,
    height: 50,
    margin: 20,
    borderRadius: 25,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  placeBetButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  clearButton: {
    width: 100,
    height: 50,
    margin: 20,
    borderRadius: 25,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  resultContainer: {
    marginVertical: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BetScreen;

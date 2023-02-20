import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import useBet from "./useBet";

const RouletteGame = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [winningNumber, setWinningNumber] = useState(null);
  const { bets, addBet, clearBets } = useBet();

  // funkcja sprawdzająca, czy gracz wygrał
  const checkWin = () => {
    if (!selectedNumber || !winningNumber) {
      return;
    }

    let winAmount = 0;

    if (selectedNumber === winningNumber) { // wygrana na konkretny numer
      winAmount = bets.reduce((total, bet) => {
        if (bet.type === "number" && bet.value === selectedNumber) {
          return total + bet.amount * 35;
        }
        return total;
      }, 0);
    } else if (selectedNumber === "odd" && winningNumber % 2 === 1) { // wygrana na nieparzyste
      winAmount = bets.reduce((total, bet) => {
        if (bet.type === "odd") {
          return total + bet.amount * 2;
        }
        return total;
      }, 0);
    } else if (selectedNumber === "even" && winningNumber % 2 === 0) { // wygrana na parzyste
      winAmount = bets.reduce((total, bet) => {
        if (bet.type === "even") {
          return total + bet.amount * 2;
        }
        return total;
      }, 0);
    } else if (selectedNumber === "black" && ["2", "4", "6", "8", "10", "11", "13", "15", "17", "20", "22", "24", "26", "28", "29", "31", "33", "35"].includes(winningNumber)) { // wygrana na czarne numery
      winAmount = bets.reduce((total, bet) => {
        if (bet.type === "color" && bet.value === "black") {
          return total + bet.amount * 2;
        }
        return total;
      }, 0);
    } else if (selectedNumber === "red" && ["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"].includes(winningNumber)) { // wygrana na czerwone numery
      winAmount = bets.reduce((total, bet) => {
        if (bet.type === "color" && bet.value === "red") {
          return total + bet.amount * 2;
        }
        return total;
      }, 0);
    } else if (selectedNumber === "1-12" && winningNumber >= 1 && winningNumber <= 12) { // wygrana na zakres 1-12
      winAmount = bets.reduce((total, bet) => {
        if (bet.type === "range" && bet.value === "1-12") {
          return total + bet.amount * 3;
        }
        return total;
      }, 0);
    } else if (selectedNumber === "13-24" && winningNumber >= 13 && winningNumber <= 24) { // wygrana na zakres 13-24
        winAmount = bets.reduce((total, bet) => {
        if (bet.type === "range" && bet.value === "13-24") {
        return total + bet.amount * 3;
        }
        return total;
        }, 0);
        } else if (selectedNumber === "25-36" && winningNumber >= 25 && winningNumber <= 36) { // wygrana na zakres 25-36
        winAmount = bets.reduce((total, bet) => {
        if (bet.type === "range" && bet.value === "25-36") {
        return total + bet.amount * 3;
        }
        return total;
        }, 0);
        }
        // Zwracanie ilości wygranej lub 0 w przypadku braku wygranej
return winAmount || 0;
};

// Funkcja obsługująca kliknięcie przycisku "spin"
const handleSpin = () => {
// Losowanie numeru
const number = Math.floor(Math.random() * 37).toString();
// Ustawienie wygranego numeru
setWinningNumber(number);

// Sprawdzenie wygranej i wyświetlenie alertu z odpowiednim komunikatem
const winAmount = checkWin();
if (winAmount > 0) {
  alert(`Gratulacje! Wygrałeś ${winAmount}!`);
} else {
  alert("Niestety nie udało Ci się wygrać. Spróbuj jeszcze raz.");
}

// Wyczyszczenie zakładów
clearBets();
};

// Renderowanie komponentu
return (
<View>
<View style={{ alignItems: "center" }}>
<Text style={{ fontSize: 32, marginBottom: 16 }}>Ruletka</Text>
<Text style={{ fontSize: 24, marginBottom: 8 }}>Wybierz numer:</Text>
<View style={{ flexDirection: "row", justifyContent: "space-between", width: "50%" }}>
<TouchableOpacity onPress={() => setSelectedNumber("1")} style={{ backgroundColor: selectedNumber === "1" ? "green" : "red", padding: 8, borderRadius: 4 }}>
<Text style={{ color: "white", fontSize: 18 }}>1</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setSelectedNumber("2")} style={{ backgroundColor: selectedNumber === "2" ? "green" : "black", padding: 8, borderRadius: 4 }}>
<Text style={{ color: "white", fontSize: 18 }}>2</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setSelectedNumber("3")} style={{ backgroundColor: selectedNumber === "3" ? "green" : "red", padding: 8, borderRadius: 4 }}>
<Text style={{ color: "white", fontSize: 18 }}>3</Text>
</TouchableOpacity>
</View>
<View style={{ flexDirection: "row", justifyContent: "space-between", width: "50%" }}>
<TouchableOpacity onPress={() => setSelectedNumber("4")} style={{ backgroundColor: selectedNumber === "4" ? "green" : "black", padding: 8, borderRadius: 4 }}>
<Text style={{ color: "white", fontSize: 18 }}>4</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setSelectedNumber("5")} style={{ backgroundColor: selectedNumber === "5

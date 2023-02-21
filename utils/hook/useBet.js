import { useState, useCallback } from "react";
import { useBetContext } from "../context/useBetContext";

const useBet = () => {
  const { balance, setBalance, setWin, setPayout, betAmount, setBetAmount } =
    useBetContext();
  const [myBet, setMyBet] = useState([]);

  const newBet = ({ id, bet, amount }) => {
    if (!amount) {
      return;
    }

    setMyBet((prevMyBet) => {
      const existingBetIndex = prevMyBet.findIndex(
        (item) => item.id === id && item.bet === bet
      );
      if (existingBetIndex !== -1) {
        const existingBet = prevMyBet[existingBetIndex];
        const updatedBet = {
          ...existingBet,
          amount: existingBet.amount + amount,
        };
        return [
          ...prevMyBet.slice(0, existingBetIndex),
          updatedBet,
          ...prevMyBet.slice(existingBetIndex + 1),
        ];
      }
      return [...prevMyBet, { id, bet, amount }];
    });
    setBetAmount((prev) => prev + amount);
  };

  const onBetPress = useCallback((selectedReward, myBet) => {
    // Execute wheel spin
    const winAmount = myBet
      .map((bet) => checkWin(bet.amount, selectedReward.number, bet.bet))
      .reduce((a, b) => a + b, 0);

    if (winAmount > 0) {
      setBalance(parseFloat(balance) + parseFloat(winAmount));
      setWin(true);
      setPayout(winAmount);
      console.log("Gratulacje!", `Wygrales ${winAmount} monet!`, [
        { text: "OK" },
      ]);
    } else {
      setBalance(parseFloat(balance) - parseFloat(betAmount));
      setWin(false);
      setPayout(0);
      console.log("Przegrana", `Nie udalo sie wygrac. Sprobuj ponownie.`, [
        { text: "OK" },
      ]);
    }
  }, []);

  const checkWin = (bet, winningNumber, selectedNumber) => {
    let winAmount = 0;

    if (selectedNumber === winningNumber) {
      winAmount = bet * 35;
    } else if (selectedNumber === "odd" && winningNumber % 2 === 1) {
      winAmount = bet * 2;
    } else if (selectedNumber === "even" && winningNumber % 2 === 0) {
      winAmount = bet * 2;
    } else if (
      selectedNumber === "black" &&
      [
        "2",
        "4",
        "6",
        "8",
        "10",
        "11",
        "13",
        "15",
        "17",
        "20",
        "22",
        "24",
        "26",
        "28",
        "29",
        "31",
        "33",
        "35",
      ].includes(winningNumber)
    ) {
      winAmount = bet * 2;
    } else if (
      selectedNumber === "red" &&
      [
        "1",
        "3",
        "5",
        "7",
        "9",
        "12",
        "14",
        "16",
        "18",
        "19",
        "21",
        "23",
        "25",
        "27",
        "30",
        "32",
        "34",
        "36",
      ].includes(winningNumber)
    ) {
      winAmount = bet * 2;
    } else if (
      selectedNumber === "1-12" &&
      winningNumber >= 1 &&
      winningNumber <= 12
    ) {
      winAmount = bet * 3;
    } else if (
      selectedNumber === "13-24" &&
      winningNumber >= 13 &&
      winningNumber <= 24
    ) {
      winAmount = bet * 3;
    } else if (
      selectedNumber === "25-36" &&
      winningNumber >= 25 &&
      winningNumber <= 36
    ) {
      winAmount = bet * 3;
    } else if (selectedNumber === "1st" && winningNumber <= 12) {
      winAmount = bet * 3;
    } else if (
      selectedNumber === "2nd" &&
      winningNumber >= 13 &&
      winningNumber <= 24
    ) {
      winAmount = bet * 3;
    } else if (
      selectedNumber === "3rd" &&
      winningNumber >= 25 &&
      winningNumber <= 36
    ) {
      winAmount = bet * 3;
    }
    return winAmount;
  };

  return {
    // win,
    // payout,
    myBet,
    newBet,
    // betAmount,
    // clearBets,
    onBetPress,
    // balance,
  };
};

export default useBet;

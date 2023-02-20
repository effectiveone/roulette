import { useState } from "react";

const useBet = () => {
  const [bets, setBets] = useState([]);

  const addBet = (type, value, amount) => {
    const newBet = { type, value, amount };
    setBets([...bets, newBet]);
  };

  const removeBet = (index) => {
    const newBets = [...bets];
    newBets.splice(index, 1);
    setBets(newBets);
  };

  const clearBets = () => {
    setBets([]);
  };

  return {
    bets,
    addBet,
    removeBet,
    clearBets,
  };
};

export default useBet;

import { createContext, useContext, useState } from "react";

const betContext = createContext();

export const useBetContextProvider = () => {
  const [betAmount, setBetAmount] = useState(0);
  const [state, setState] = useState({
    balance: 400,
    win: false,
    payout: 0,
  });

  const clearBets = () => {
    setBetAmount(0);
  };

  const resetState = () => {
    setBetAmount(0);
    setState({
      balance: 400,
      win: false,
      payout: 0,
    });
  };

  const setBalance = (value) => {
    setState((prevState) => ({ ...prevState, balance: value }));
  };

  const setWin = (value) => {
    setState((prevState) => ({ ...prevState, win: value }));
  };

  const setPayout = (value) => {
    setState((prevState) => ({ ...prevState, payout: value }));
  };

  return {
    betAmount,
    setBetAmount,
    balance: state.balance,
    setBalance,
    win: state.win,
    setWin,
    payout: state.payout,
    setPayout,
    clearBets,
    resetState,
  };
};

export const useBetContext = () => useContext(betContext);

export const BetContextProvider = ({ children }) => {
  const betState = useBetContextProvider();

  return <betContext.Provider value={betState}>{children}</betContext.Provider>;
};

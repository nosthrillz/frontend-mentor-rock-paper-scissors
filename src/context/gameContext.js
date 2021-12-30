import React, { createContext, useReducer } from "react";

export const GameContext = createContext();

const initialState = {
  game: 0,
  step: 0,
  wins: 0,
  selection: {
    player: "",
    house: "",
  },
};

const gameReducer = (state, action) => {
  if (action.type === "switch")
    return state.game === 0 ? { ...state, game: 1 } : { ...state, game: 0 };
  if (action.type === "next") {
    if (state.step === 0) return { ...state, step: 1 };
    if (state.step === 1) return { ...state, step: 2 };
    if (state.step === 2) return { ...state, step: 3 };
    return { ...state, step: 0 };
  }
  if (action.type === "win") return { ...state, wins: state.wins + 1 };
  if (action.type === "playerPick")
    return {
      ...state,
      selection: { ...state.selection, player: action.payload },
    };
  if (action.type === "housePick")
    return {
      ...state,
      selection: { ...state.selection, house: action.payload },
    };
  if (action.type === "reset") return { ...initialState, game: state.game };
};

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

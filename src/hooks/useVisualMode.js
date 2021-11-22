import React, { useState } from "react";

export default function useVisualMode(inital) {
  const [mode, setMode] = useState(inital)
  const [history, setHistory] = useState([inital]);

  function transition(value, replace = false) {
    setHistory([inital, mode, value]);
    if (replace === true) {
      setHistory([inital, mode]);
    }
    setMode(value);
  };

  function back() {
    history.pop();
    // EDGE CASE - What happens IF History ARR only has one item? Back() would run into an empty History [];
    if (history.length === 0) {
      return undefined;
    }
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back }
};

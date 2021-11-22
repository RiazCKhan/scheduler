import React, { useState } from "react";

export default function useVisualMode(inital) {
  const [mode, setMode] = useState(inital)
  const [history, setHistory] = useState([inital]);

  function transition(value) {
    setHistory([inital, mode, value])
    setMode(value)

    // console.log('init 1 then 2 transition', mode)
    // console.log('Transition FN History ARR', history)
  }

  function back() {
    history.pop()
    // console.log('Back FN History ARR', history)
    if (history.length === 0) {
      return undefined;
    }
    setMode(history[history.length - 1])
  }
  // EDGE CASE - What happens IF History ARR only has one item? Back() would run into an empty History [];


  return { mode, transition, back }
};

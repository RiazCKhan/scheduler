import React, { useState } from "react";

export default function useVisualMode(inital) {
  const [mode, setMode] = useState(inital)

  function transition(value) {
    setMode(value)
  }

  return { mode, transition }
};

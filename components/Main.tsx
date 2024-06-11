"use client";

import React from "react";
import { useInput } from "@/context/InputContext";

export function Main() {
  const { input, setInput } = useInput();

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}

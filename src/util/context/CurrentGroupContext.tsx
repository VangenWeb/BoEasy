"use client";

import React from "react";
import { createContext, useState } from "react";

interface CurrentGroupContextProps {
  currentGroup: string | null;
  setCurrentGroup: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CurrentGroupContext = createContext<CurrentGroupContextProps>({
  currentGroup: null,
  setCurrentGroup: () => void 0,
});

export function CurrentGroupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentGroup, setCurrentGroup] = useState<string | null>(null);

  return (
    <CurrentGroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
      {children}
    </CurrentGroupContext.Provider>
  );
}

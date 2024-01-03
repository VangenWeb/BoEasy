import type React from "react";
import { createContext } from "react";

interface CurrentGroupContextProps {
  currentGroup: string | null;
  setCurrentGroup: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CurrentGroupContext = createContext<CurrentGroupContextProps>({
  currentGroup: null,
  setCurrentGroup: () => void 0,
});

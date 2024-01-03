import { useContext } from "react";
import { CurrentGroupContext } from "../context/CurrentGroupContext";

export function useGroup() {
  const group = useContext(CurrentGroupContext);

  return group.currentGroup;
}

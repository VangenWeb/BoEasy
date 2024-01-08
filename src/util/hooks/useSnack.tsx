import { Alert, Snackbar, type SnackbarProps } from "@mui/material";
import { useState } from "react";

type SnackType = "success" | "error" | "warning" | "info";

interface UseSnackProps {
  autoHideDuration?: number;
  anchorOrigin?: SnackbarProps["anchorOrigin"];
}
/**
 * I wanted to make a hook for this since I didn't want to have to make the logic for this every time.
 * Initially I wanted to make something that would only return the createSnack function. But that would
 * require me to have a component to render it in somewhere higher up in the hierarchy. And I decided
 * I didn't want to rerender a high hierarchy component to show a snack. Might just attach it to .root
 * That might work without re-rendering?
 */
export function useSnack({ autoHideDuration, anchorOrigin }: UseSnackProps) {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<JSX.Element | null>(null);

  function handleClose() {
    setOpen(false);
  }

  function createSnack({
    message,
    type,
  }: {
    message: string;
    type: SnackType;
  }) {
    setSnack(
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>,
    );
    setOpen(true);
  }

  function SnackComponent() {
    return (
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration ?? 3000}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        {snack ?? <></>}
      </Snackbar>
    );
  }

  return {
    createSnack,
    SnackComponent,
  };
}

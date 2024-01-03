import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

type SnackType = "success" | "error" | "warning" | "info";

export function useSnack() {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<JSX.Element | null>(null);

  function handleClose() {
    setOpen(false);
  }

  function createSnack(message: string, type: SnackType) {
    setSnack(
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>,
    );
    setOpen(true);
  }

  function SnackComponent() {
    return (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {snack ?? <></>}
      </Snackbar>
    );
  }

  return {
    createSnack,
    SnackComponent,
  };
}

import { Alert, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

interface SnackProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

interface SnackContextProps {
  createSnack: ({
    message,
    severity,
  }: {
    message: string;
    severity: SnackProps["severity"];
  }) => void;
}

export const SnackContext = createContext<SnackContextProps>({
  createSnack: () => void 0,
});

export const SnackProvider: React.CFC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<JSX.Element | null>(null);

  function handleClose() {
    setOpen(false);
  }

  function createSnack({ message, severity }: Omit<SnackProps, "open">) {
    setSnack(
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>,
    );
    setOpen(true);
  }

  return (
    <SnackContext.Provider
      value={{
        createSnack: createSnack,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {snack ?? <></>}
      </Snackbar>
    </SnackContext.Provider>
  );
};

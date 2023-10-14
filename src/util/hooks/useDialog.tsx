import { Dialog } from "@mui/material";
import { useState } from "react";

interface useDialogProps {
  dialogContent: JSX.Element;
}

export function useDialog({ dialogContent }: useDialogProps) {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  function DialogComponent() {
    return (
      <Dialog open={open} onClose={handleClose}>
        {dialogContent}
      </Dialog>
    );
  }

  return {
    handleToggle,
    DialogComponent,
  };
}

import { Dialog } from "@mui/material";
import { useState } from "react";

interface useDialogProps {
  dialogContent: JSX.Element;
  fullscreen?: boolean;
}

export function useDialog({ dialogContent, fullscreen }: useDialogProps) {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  function DialogComponent() {
    return (
      <Dialog
        fullScreen={fullscreen ?? false}
        open={open}
        onClose={handleClose}
      >
        {dialogContent}
      </Dialog>
    );
  }

  return {
    handleToggle,
    DialogComponent,
  };
}

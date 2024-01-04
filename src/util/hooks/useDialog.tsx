import { Dialog } from "@mui/material";
import { useState } from "react";

interface useDialogProps {
  dialogContent: JSX.Element;
  fullscreen?: boolean;
}

export function useDialog({ dialogContent, fullscreen }: useDialogProps) {
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }

  function openDialog() {
    setOpen(true);
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  function DialogComponent() {
    return (
      <Dialog
        fullScreen={fullscreen ?? false}
        open={open}
        onClose={closeDialog}
      >
        {dialogContent}
      </Dialog>
    );
  }

  return {
    closeDialog,
    openDialog,
    toggle,
    DialogComponent,
  };
}

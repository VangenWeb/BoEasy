import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

interface ConfirmDialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  declineText?: string;

  onConfirm: () => void;
  onCancel?: () => void;
  onDecline?: () => void;
}

// Made for the useDialog hook
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  onDecline,
  declineText = "Nei",
  confirmText = "Ja",
  cancelText = "Avbryt",
}) => {
  return (
    <>
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {description && (
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {onCancel && (
          <Button onClick={onCancel} variant="outlined">
            {cancelText}
          </Button>
        )}
        {onDecline && (
          <Button onClick={onDecline} variant="outlined">
            {declineText}
          </Button>
        )}
        <Button onClick={onConfirm} autoFocus variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </>
  );
};

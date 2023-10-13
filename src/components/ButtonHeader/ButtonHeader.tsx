import { Button, ButtonGroup } from "@mui/material";
import { type ButtonHeaderButton } from "./types";

interface ButtonHeaderProps {
  buttons: ButtonHeaderButton[];
}

export const ButtonHeader: React.FC<ButtonHeaderProps> = ({ buttons }) => {
  const btns = buttons?.map((buttons) => (
    <Button
      key={buttons.text}
      variant={buttons.active ? "contained" : "outlined"}
      sx={{
        flex: 1,
      }}
      onClick={buttons.handleClick}
    >
      {buttons.text}
    </Button>
  ));
  return <ButtonGroup>{btns}</ButtonGroup>;
};

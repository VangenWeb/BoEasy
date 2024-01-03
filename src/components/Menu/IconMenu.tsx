import styled from "@emotion/styled";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";

export interface MenuItemProps {
  type: "item";
  icon: JSX.Element;
  text: string;
  typography?: string;
  onClick: () => void;
}

export interface MenuDividerProps {
  type: "divider";
}

export interface IconMenuProps {
  items: (MenuItemProps | MenuDividerProps)[];
  anchor: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
}

export const IconMenu: React.FC<IconMenuProps> = ({
  items,
  anchor,
  open,
  handleClose,
}) => {
  function makeMenuItem(
    item: MenuItemProps | MenuDividerProps,
    index: number | string,
  ) {
    if (item.type === "item") {
      return (
        <MenuItem key={`${item.text}${index}`} onClick={item.onClick}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.text}</ListItemText>
          {item.typography && (
            <Typography variant="body2" color="text.secondary">
              {item.typography}
            </Typography>
          )}
        </MenuItem>
      );
    } else {
      return <Divider />;
    }
  }
  return (
    <Menu open={open} anchorEl={anchor} onClose={handleClose}>
      <MenuList variant="menu">
        {items.map((item, index) => makeMenuItem(item, index))}
      </MenuList>
    </Menu>
  );
};

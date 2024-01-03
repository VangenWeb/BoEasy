import TextFieldsIcon from "@mui/icons-material/TextFields";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export function getFieldRowIcon(fieldType: string) {
  switch (fieldType) {
    case "text":
      return <TextFieldsIcon />;
    case "checkbox":
      return <CheckBoxIcon />;
    default:
      return null;
  }
}

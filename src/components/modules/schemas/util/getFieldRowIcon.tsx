import TextFieldsIcon from "@mui/icons-material/TextFields";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TitleIcon from "@mui/icons-material/Title";
export function getFieldRowIcon(fieldType: string) {
  switch (fieldType) {
    case "text":
      return <TextFieldsIcon />;
    case "checkbox":
      return <CheckBoxIcon />;
    case "title":
      return <TitleIcon />;
    default:
      return null;
  }
}

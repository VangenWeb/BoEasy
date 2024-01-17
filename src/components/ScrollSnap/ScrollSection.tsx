import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ScrollSectionProps {
  section: JSX.Element;
  scrollToNextSection?: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  lastSection?: boolean;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  section,
  lastSection,
  scrollToNextSection,
}) => {
  return (
    <div className="relative flex h-[100%] max-h-[100%] min-h-0 w-[100%] min-w-0 flex-1 snap-center flex-col overflow-hidden">
      <div className="flex flex-1 overflow-y-hidden">
        {section}
        {!lastSection && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <IconButton onClick={scrollToNextSection}>
              <ExpandMoreIcon fontSize="large" className="text-black" />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

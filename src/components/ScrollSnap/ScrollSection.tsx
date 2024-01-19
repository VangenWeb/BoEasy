import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface ScrollSectionProps {
  section: JSX.Element;
  scrollToNextSection?: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  lastSection?: boolean;
  firstSection?: boolean;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  section,
  lastSection,
  firstSection,
  scrollToNextSection,
}) => {
  return (
    <div className="relative flex h-[100%] max-h-[100%] min-h-0 w-[100%] min-w-0 flex-1 snap-center flex-col overflow-hidden">
      <div className="flex flex-1 overflow-y-hidden">
        {!firstSection && (
          <div className="absolute left-0 right-0 top-0 z-50 flex justify-center">
            <IconButton onClick={scrollToNextSection} size="large">
              <ExpandLessIcon
                fontSize="large"
                className="text-black"
                sx={{
                  width: "4rem",
                  height: "4rem",
                }}
              />
            </IconButton>
          </div>
        )}
        {section}
        {!lastSection && (
          <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center">
            <IconButton onClick={scrollToNextSection} size="large">
              <ExpandMoreIcon
                fontSize="large"
                className="text-black"
                sx={{
                  width: "4rem",
                  height: "4rem",
                }}
              />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

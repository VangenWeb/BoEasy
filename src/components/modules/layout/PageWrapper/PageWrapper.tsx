import styled from "@emotion/styled";
import { type CommonProps } from "@mui/material/OverridableComponent";

const Content = styled.div`
  flex: 1;
  overflow-x: visible;
  overflow-y: auto;
  max-height: 100dvh;
`;

export const PageWrapper: React.CFC<CommonProps> = ({ children, ...props }) => {
  return <Content {...props}>{children}</Content>;
};

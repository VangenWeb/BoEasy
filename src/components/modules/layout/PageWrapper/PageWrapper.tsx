import styled from "@emotion/styled";
import { type CommonProps } from "@mui/material/OverridableComponent";

const Content = styled.div`
  flex: 1;
`;

export const PageWrapper: React.CFC<CommonProps> = ({ children, ...props }) => {
  return <Content {...props}>{children}</Content>;
};

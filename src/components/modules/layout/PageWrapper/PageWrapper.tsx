import styled from "@emotion/styled";

const Content = styled.div`
  flex: 1;
`;

interface PageWrapperProps {
  className?: string;
}
export const PageWrapper: React.CFC<PageWrapperProps> = ({ children }) => {
  return <Content>{children}</Content>;
};

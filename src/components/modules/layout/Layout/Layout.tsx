import React from "react";
import { Header } from "../Header/Header";
import styled from "@emotion/styled";

interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-areas: "header header" "main main" "footer footer";
  grid-template-rows: 60px 1fr 60px;
  grid-template-columns: 200px 1fr;
`;

const ContentWrapper = styled.div`
  grid-area: main;
  display: flex;
  padding: 1rem;
`;

export const Layout: React.CFC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper className="flex min-h-screen flex-col">
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
};

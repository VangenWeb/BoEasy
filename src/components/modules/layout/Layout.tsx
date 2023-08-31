import React from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.CFC<LayoutProps> = ({ children }) => {
  return <div className="flex min-h-screen">{children}</div>;
};

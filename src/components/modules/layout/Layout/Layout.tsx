import React, { useContext, useEffect, useLayoutEffect } from "react";
import { Header } from "../Header/Header";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import { AuthHeader } from "../Header/AuthHeader";
import { CurrentGroupContext } from "~/util/context/CurrentGroupContext";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

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
  const session = useSession();
  const currentGroup = useContext(CurrentGroupContext);
  const router = useRouter();

  // We set the current group to the primary group of the user.
  // This is done here as I couldn't figure out how to do it in the _app.tsx file without querying.
  // The "session" prop the app file gets is empty, so we can't use that.
  useEffect(() => {
    if (session.data?.user.primaryGroupId === null) {
      session.update().catch((err) => console.error(err));
    }

    if (currentGroup.currentGroup === null) {
      currentGroup.setCurrentGroup(session?.data?.user.primaryGroupId ?? null);
    }
  }, [currentGroup, session, session.data?.user.primaryGroupId]);

  // Handle unathenticated access to pages
  // Todo: add exceptions for about etc.
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/").catch((err) => console.error(err));
    }
  }, [session.status]);

  return (
    <LayoutWrapper className="flex min-h-screen flex-col">
      {session?.data?.user ? <AuthHeader /> : <Header />}
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
};

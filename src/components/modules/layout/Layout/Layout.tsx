import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { CurrentGroupContext } from "~/util/context/CurrentGroupContext";
import { AuthHeader } from "../Header/AuthHeader";

interface LayoutProps {
  authenticated?: boolean;
}

const LayoutWrapper = styled.div<LayoutProps>`
  display: grid;
  grid-template-areas: "header header" "main main";
  grid-template-rows: 60px 1fr;
  grid-template-columns: 200px 1fr;

  ${(props) =>
    !props?.authenticated &&
    css`
      grid-template-areas: "main";
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
    `}
`;

const ContentWrapper = styled.div`
  grid-area: main;
  display: flex;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

  return (
    <LayoutWrapper
      className="flex min-h-screen flex-col"
      authenticated={session?.status === "authenticated"}
    >
      {session?.data?.user && <AuthHeader />}
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
};

import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  grid-area: header;

  border-bottom: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

interface TabProps {
  active?: boolean;
}
const Tab = styled.div<TabProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => (props.active ? "#E0E0E0" : "transparent")};
`;

export const AuthHeader: React.FC = () => {
  const router = useRouter();
  const { pathname } = router;

  function handleTabClick(path: string) {
    return () => {
      router.push(path).catch((err) => console.error(err));
    };
  }
  return (
    <Wrapper>
      <Tab active={pathname === "/home"} onClick={handleTabClick("/home")}>
        Hjem
      </Tab>
      <Tab
        active={pathname === "/schemas"}
        onClick={handleTabClick("/schemas")}
      >
        Skjemaer
      </Tab>
      <Tab active={pathname === "/config"} onClick={handleTabClick("/config")}>
        Instillinger
      </Tab>
    </Wrapper>
  );
};

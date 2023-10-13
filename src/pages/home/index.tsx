import { Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { PageWrapper } from "~/components";
import { api } from "~/utils/api";

export default function Home() {
  const session = useSession();
  const { data: groupData } = api.group.getUserGroups.useQuery(
    session.data?.user.id ?? "",
    {
      enabled: !!session.data?.user?.id,
    },
  );

  if (!groupData) {
    return (
      <PageWrapper>
        <CircularProgress />;
      </PageWrapper>
    );
  }

  if (groupData.length === 0) {
    return (
      <PageWrapper>
        <div>You have no groups</div>
        <div>Click here to create a group to get started</div>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
          }}
        >
          Create Group
        </Button>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      HOME
      {groupData?.map((group) => {
        return <div key={group.id}>{group.name}</div>;
      })}
    </PageWrapper>
  );
}

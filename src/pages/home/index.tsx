import { Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { PageWrapper } from "~/components";
import { api } from "~/utils/api";

export default function Home() {
  const session = useSession();
  const { data } = api.group.getUserGroups.useQuery(
    session.data?.user.id ?? "",
    {
      enabled: !!session.data?.user?.id,
    },
  );

  console.log(session.data?.user.id);
  console.log(data);

  if (!data) {
    return (
      <PageWrapper>
        <CircularProgress />;
      </PageWrapper>
    );
  }

  if (data.length === 0) {
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
      {data?.map((group) => {
        return <div key={group.id}>{group.name}</div>;
      })}
    </PageWrapper>
  );
}

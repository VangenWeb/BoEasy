import { Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PageWrapper } from "~/components";
import { potentialErrorHandling } from "~/util/potentialErrorHandling";
import { api } from "~/utils/api";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const { data: groupData } = api.user.getUserPrimaryGroup.useQuery(
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

  if (!groupData.group) {
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
          onClick={() => {
            router.push("/group/create").catch(potentialErrorHandling);
          }}
        >
          Create Group
        </Button>
      </PageWrapper>
    );
  }
  const { group } = groupData;

  return (
    <PageWrapper>
      <div key={group.id}>{group.name}</div>;
    </PageWrapper>
  );
}

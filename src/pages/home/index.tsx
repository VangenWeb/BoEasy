import { Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PageWrapper } from "~/components";
import { TaskCard } from "~/components/modules/tasks/TaskCard/TaskCard";
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
      <div key={group.id}>{group.name}</div>
      <TaskCard
        userId={session.data?.user.id}
        groupId={session.data?.user.primaryGroupId}
      />
      <TaskCard
        period="daily"
        userId={session.data?.user.id}
        groupId={session.data?.user.primaryGroupId}
      />
      <TaskCard
        period="monthly"
        userId={session.data?.user.id}
        groupId={session.data?.user.primaryGroupId}
      />
      <TaskCard
        period="yearly"
        userId={session.data?.user.id}
        groupId={session.data?.user.primaryGroupId}
      />
    </PageWrapper>
  );
}

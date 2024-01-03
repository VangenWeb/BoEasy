import { Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PageWrapper } from "~/components";
import { potentialErrorHandling } from "~/util/potentialErrorHandling";
import { api } from "~/utils/api";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const { data: groupData, isLoading } = api.user.getUserPrimaryGroup.useQuery(
    session.data?.user.id ?? "",
    {
      enabled: !!session.data?.user?.id,
    },
  );

  if (isLoading) {
    return (
      <PageWrapper>
        <CircularProgress />;
      </PageWrapper>
    );
  }

  if (!groupData?.group) {
    return (
      <PageWrapper>
        <div>Du er ikke med i noen borettslag</div>
        <div>Klikk her for å lage et nytt</div>
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
        Eller spørr om å bli med i ett eksisterende.
      </PageWrapper>
    );
  }

  const { group } = groupData;

  return (
    <PageWrapper>
      <div key={group.id}>{group.name}</div>
    </PageWrapper>
  );
}

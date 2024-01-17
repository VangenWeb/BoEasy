import { Button, CircularProgress, Typography } from "@mui/material";
import { type Editor } from "@tinymce/tinymce-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { PageWrapper } from "~/components";
import { RichTextEditor } from "~/components/Editor/RichTextEditor";
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
        <Typography>
          <div>Du er ikke med i noen borettslag</div>
          <div>Klikk her for å lage et nytt</div>
        </Typography>
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
          Lag gruppe
        </Button>
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

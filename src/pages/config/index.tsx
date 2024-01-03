import { CircularProgress } from "@mui/material";
import { PageWrapper } from "~/components";
import { useGroup } from "~/util/hooks";
import { api } from "~/utils/api";

export default function Home() {
  const groupId = useGroup();

  const {
    data: group,
    isLoading,
    isFetching,
  } = api.group.getGroup.useQuery(
    {
      groupId: groupId ?? "",
    },
    {
      enabled: !!groupId,
    },
  );

  if (isLoading || isFetching) {
    return (
      <PageWrapper>
        <CircularProgress />
      </PageWrapper>
    );
  }

  if (!group?.ok) {
    return <PageWrapper>TODO: ERRORHANDLING+</PageWrapper>;
  }

  return <PageWrapper>{group.data.name}</PageWrapper>;
}

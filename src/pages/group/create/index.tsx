import styled from "@emotion/styled";
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { PageWrapper as BasePageWrapper } from "~/components";
import { api } from "~/utils/api";

const PageWrapper = styled(BasePageWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

export default function CreateGroup() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");

  const { mutate, isLoading } = api.group.createPrimaryGroup.useMutation({
    onSuccess: () => {
      router.push("/home").catch((err) => console.error(err));
    },
  });

  function handleCreateGroup() {
    if (groupName.length > 1) {
      mutate({
        name: groupName,
      });
    }
  }

  return (
    <PageWrapper>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>

      <Card
        sx={{
          maxWidth: 600,
        }}
      >
        <CardHeader title="Opprett borettslag" />
        <CardContent>
          <FormControl>
            <TextField
              size="small"
              label="Navn på borettslag"
              value={groupName}
              onChange={(event) => {
                setGroupName(event.target.value);
              }}
            />
            <TextField size="small" label="Adresse" />
          </FormControl>
        </CardContent>
        <Button
          onClick={handleCreateGroup}
          sx={{
            width: "100%",
          }}
          variant="contained"
          color="primary"
        >
          Opprett
        </Button>
      </Card>
    </PageWrapper>
  );
}

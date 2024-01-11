import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { type Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { IconButton } from "~/components/Button";
import { ConfirmDialog } from "~/components/Dialog";
import { RichTextEditor } from "~/components/Editor/Editor";
import { CurrentGroupContext } from "~/util/context/CurrentGroupContext";
import { useDialog } from "~/util/hooks";
import { useRootSnack } from "~/util/hooks/useSnack";
import { api } from "~/utils/api";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  padding: 0.8rem;
  & > :last-child {
    justify-self: flex-end;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const ActionContainer = styled.div`
  display: inline-block;
  flex-direction: row;
  margin-left: auto;
  gap: 0.5rem;

  & > * {
    float: right;
  }

  & > :last-child {
    margin-right: 8px;
  }
`;

export default function RichTextDialog() {
  const richTextRef = useRef<Editor | null>(null);
  const router = useRouter();
  const group = useContext(CurrentGroupContext);
  const createSnack = useRootSnack();
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);

  const {
    DialogComponent,
    closeDialog: closeConfirm,
    openDialog: openConfirm,
  } = useDialog({
    dialogContent: dialogContent ?? <></>,
  });

  const { mutate: createTextFile, isLoading } =
    api.schema.createTextFile.useMutation();

  function handleCloseRichTextDialog() {
    setDialogContent(
      <ConfirmDialog
        title="Lukk tekst editor?"
        onConfirm={() => {
          console.log("Yeet");
        }}
        onDecline={closeConfirm}
      />,
    );
    openConfirm();
  }

  function handleSaveRichText() {
    setDialogContent(
      <ConfirmDialog
        title="Opprett dokument?"
        onConfirm={() => {
          handleSubmitRichText();
          closeConfirm();
        }}
        onDecline={closeConfirm}
      />,
    );
    openConfirm();
  }

  function handleSubmitRichText() {
    if (!router.query.id) return;
    if (!group.currentGroup) return;

    createTextFile(
      {
        parentFolderId: router.query.id as string,
        groupId: group.currentGroup,
        name: "test",
        content: "test",
      },
      {
        onSuccess: () => {
          createSnack({
            message: "Dokument opprettet ez",
            severity: "success",
          });
        },
        onError: () => {
          createSnack({
            message: "Noe gikk galt",
            severity: "error",
          });
        },
      },
    );
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Typography variant="h6">Tittel på dokument</Typography>
        <ActionContainer>
          <IconButton onClick={handleCloseRichTextDialog}>
            <CloseIcon />
          </IconButton>
        </ActionContainer>
      </TitleContainer>
      <TextField
        sx={{}}
        placeholder="Info skriv om Harrys hårete legger"
      ></TextField>
      <RichTextEditor ref={richTextRef} />
      <Button
        onClick={() => {
          createSnack({
            message: "Dokument opprettet",
            severity: "success",
          });
        }}
        variant="outlined"
      >
        TEST
      </Button>
      <Button
        onClick={handleSaveRichText}
        variant="contained"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size="1.5rem" /> : "Opprett dokument"}
      </Button>
      <DialogComponent />
    </Wrapper>
  );
}

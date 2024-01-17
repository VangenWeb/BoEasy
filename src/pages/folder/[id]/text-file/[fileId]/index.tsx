import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import { type Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { ConfirmDialog } from "~/components";
import { RichText } from "~/components/Editor/RichText";
import { RichTextEditor } from "~/components/Editor/RichTextEditor";
import { getEditorContent } from "~/components/Editor/util";
import { useDialog } from "~/util/hooks";
import { api } from "~/utils/api";
import { useRootSnack } from "~/util/hooks/useSnack";
import CloseIcon from "@mui/icons-material/Close";

export default function ViewTextFile() {
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState<{
    saved: string;
    current: string;
  }>({
    saved: "",
    current: "",
  });
  const [content, setContent] = useState("");
  const [contentFetched, setContentFetched] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const createSnack = useRootSnack();

  const router = useRouter();
  const { fileId } = router.query;
  const { data: textFile } = api.file.getTextFile.useQuery(
    {
      id: fileId as string,
    },
    {
      enabled: !!fileId,
    },
  );

  useEffect(() => {
    if (!contentFetched && textFile?.ok && textFile?.data?.content) {
      setContent(textFile.data.content);
      setFileName({
        saved: textFile.data.name,
        current: textFile.data.name,
      });
      setContentFetched(true);
    }
  }, [contentFetched, textFile]);

  const { mutate: mutateTextFile, isLoading: updateTextFileLoading } =
    api.file.updateTextFile.useMutation();

  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const {
    DialogComponent,
    closeDialog: closeConfirm,
    openDialog: openConfirm,
  } = useDialog({
    dialogContent: dialogContent ?? <></>,
  });

  function handleStartEditClick() {
    setIsEditing(true);
  }

  function handleStopEditClick() {
    setDialogContent(
      <ConfirmDialog
        title="Lagre endringer?"
        onConfirm={() => {
          saveTextFile(() => {
            setIsEditing(false);
          });
          closeConfirm();
        }}
        onDecline={() => {
          closeConfirm();
          setIsEditing(false);
          setFileName({
            saved: fileName.saved,
            current: fileName.saved,
          });
        }}
        onCancel={() => {
          closeConfirm();
        }}
      />,
    );
    openConfirm();
  }

  function saveTextFile(callback?: () => void) {
    const editorContent = getEditorContent(editorRef);

    if (!editorContent || !contentFetched || updateTextFileLoading) {
      return;
    }

    mutateTextFile(
      {
        id: fileId as string,
        content: editorContent,
        name: fileName.current,
      },
      {
        onSuccess: () => {
          setContent(editorContent);
          setFileName({
            saved: fileName.current,
            current: fileName.current,
          });
          createSnack({
            message: "Endringer lagret",
            severity: "success",
          });
          if (callback) {
            callback();
          }
        },
        onError: () => {
          console.log("Error");
          closeConfirm();
          createSnack({
            message: "Kunne ikke lagre endringer",
            severity: "error",
          });
        },
      },
    );
    setContent(editorContent);
  }

  function handleSaveTextFile() {
    saveTextFile();
  }

  if (!textFile || !textFile.ok) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex w-[100%]  flex-row items-center border-b border-solid">
        {isEditing ? (
          <TextField
            value={fileName.current}
            onChange={(e) =>
              setFileName({ ...fileName, current: e.target.value })
            }
          />
        ) : (
          <div className="mr-auto">{fileName.saved}</div>
        )}
        {isEditing && (
          <IconButton
            disabled={updateTextFileLoading}
            onClick={handleSaveTextFile}
            sx={{
              marginLeft: "auto",
            }}
          >
            {updateTextFileLoading ? (
              <CircularProgress size="1.5rem" />
            ) : (
              <SaveIcon />
            )}
          </IconButton>
        )}
        <IconButton
          disabled={updateTextFileLoading}
          onClick={isEditing ? handleStopEditClick : handleStartEditClick}
        >
          {isEditing ? <CloseIcon /> : <EditIcon />}
        </IconButton>
      </div>
      {isEditing ? (
        <RichTextEditor
          ref={editorRef}
          className="flex-1"
          initialValue={content}
        />
      ) : (
        <RichText content={content} />
      )}
      <DialogComponent />
    </div>
  );
}

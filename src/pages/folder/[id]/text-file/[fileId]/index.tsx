import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "~/components";
import { RichText } from "~/components/Editor/RichText";
import { RichTextEditor } from "~/components/Editor/RichTextEditor";
import { getEditorContent } from "~/components/Editor/util";
import { useDialog } from "~/util/hooks";
import { api } from "~/utils/api";

export default function ViewTextFile() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [contentFetched, setContentFetched] = useState(false);
  const editorRef = useRef<Editor | null>(null);

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
      setContentFetched(true);
    }
  }, [contentFetched, textFile]);

  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const {
    DialogComponent,
    closeDialog: closeConfirm,
    openDialog: openConfirm,
  } = useDialog({
    dialogContent: dialogContent ?? <></>,
  });

  if (!textFile || !textFile.ok) {
    return <div>loading...</div>;
  }

  function handleStartEditClick() {
    setIsEditing(true);
  }

  function handleStopEditClick() {
    setDialogContent(
      <ConfirmDialog
        title="Lagre endringer?"
        onConfirm={() => {
          console.log("Saved Yeppers");
          setIsEditing(false);
          handleSave();
          closeConfirm();
        }}
        onDecline={() => {
          console.log("Declined");
          closeConfirm();
          setIsEditing(false);
        }}
        onCancel={() => {
          console.log("Cancelled");
          closeConfirm();
        }}
      />,
    );
    openConfirm();
  }

  function handleSave() {
    const editorContent = getEditorContent(editorRef);

    if (!editorContent) {
      return;
    }
    setContent(editorContent);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div></div>
      <div className="flex w-[100%]  flex-row items-center border-b border-solid">
        {textFile.data.name}
        <IconButton
          sx={{
            marginLeft: "auto",
          }}
          onClick={isEditing ? handleStopEditClick : handleStartEditClick}
        >
          <EditIcon />
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

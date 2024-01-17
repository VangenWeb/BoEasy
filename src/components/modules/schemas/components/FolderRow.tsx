import styled from "@emotion/styled";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { CircularProgress, IconButton } from "@mui/material";
import { type SchemaFolder } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { IconMenu } from "~/components/Menu";
import { CreateSchemaContextProvider } from "~/util/context/CreateSchemaContext";
import { useDialog } from "~/util/hooks";
import { useSnack } from "~/util/hooks/useSnack";
import { api } from "~/utils/api";
import { CreateSchemaDialog } from "../CreateSchemaDialog";
import SchemaRow from "./SchemaRow";
import { TextFileRow } from "./TextFileRow";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e0e0e0;
`;

interface NameContainerProps {
  isExpanded: boolean;
}
const NameContainer = styled.div<NameContainerProps>`
  display: flex;
  flex: 1;
  align-items: center;

  background-color: ${(props) =>
    props.isExpanded ? "#E0E0E0" : "transparent"};
  & > :last-child {
    margin-left: auto;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const FolderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;

  & > :last-child {
    border-bottom: none;
  }
`;

const FolderRow: React.FC<SchemaFolder> = (folder) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnchor = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const { SnackComponent, createSnack } = useSnack({});
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);
  const { DialogComponent, closeDialog, openDialog } = useDialog({
    fullscreen: true,
    dialogContent: dialogContent ?? <></>,
  });

  const {
    data: childrenData,
    refetch: refetchChildrenFolders,
    isFetching: isFetchingFolders,
    isLoading: isLoadingFolders,
  } = api.file.getChildren.useQuery(
    {
      groupId: folder.groupId,
      parentId: folder.id,
    },
    {
      enabled: isExpanded,
    },
  );

  function handleCloseCreateSchemaDialog() {
    closeDialog();
  }

  function handleOpenCreateSchemaDialog() {
    setDialogContent(
      <CreateSchemaDialog
        groupId={folder.groupId}
        parentId={folder.id}
        parentName={folder.name}
        handleClose={handleCloseCreateSchemaDialog}
      />,
    );
    openDialog();
  }

  function handleCreateTextFile() {
    router.push(`/folder/${folder.id}/create-text-file`).catch((err) => {
      console.error(err);
    });
  }

  const { mutate } = api.file.createFolder.useMutation();

  function handleCreateFolder() {
    if (!folder.groupId) {
      // Add error handling
      return;
    }
    const name = prompt("Navn på mappen");

    if (!name) {
      return;
    }
    mutate(
      {
        name: name,
        parentId: folder.id ?? null,
        groupId: folder.groupId,
      },
      {
        onSuccess: () => {
          void refetchChildrenFolders().catch((err) => console.error(err));
        },
      },
    );
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function handleOpenMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function handleSuccess() {
    void refetchChildrenFolders().catch((err) => console.error(err));
    handleCloseMenu();
    handleCloseCreateSchemaDialog();
    createSnack({ message: "Skjema opprettet", type: "success" });
  }

  return (
    <Wrapper>
      <NameContainer isExpanded={isExpanded}>
        <FolderIcon /> {folder.name}{" "}
        {(isLoadingFolders || isFetchingFolders) && isExpanded && (
          <CircularProgress size={16} />
        )}
        <ActionRow>
          <IconButton ref={menuAnchor} onClick={handleOpenMenu}>
            <SettingsApplicationsIcon />
          </IconButton>
          <IconButton onClick={handleExpand}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </ActionRow>
      </NameContainer>
      {isExpanded && (
        <FolderWrapper>
          {childrenData?.ok &&
            childrenData.data.folders.map((child) => (
              <FolderRow key={child.id} {...child} />
            ))}
          {childrenData?.ok &&
            childrenData.data.schemas.map((schema) => {
              return <SchemaRow key={schema.id} {...schema} />;
            })}
          {childrenData?.ok &&
            childrenData.data?.files.map((file) => (
              <TextFileRow key={file.id} {...file} />
            ))}
        </FolderWrapper>
      )}
      <IconMenu
        items={[
          {
            type: "item",
            text: "Opprett mappe",
            icon: <CreateNewFolderIcon />,
            onClick: handleCreateFolder,
          },
          {
            type: "item",
            text: "Opprett skjema",
            icon: <NoteAddIcon />,
            onClick: handleOpenCreateSchemaDialog,
          },
          {
            type: "item",
            text: "Opprett tekstfil",
            icon: <NoteAddIcon />,
            onClick: handleCreateTextFile,
          },
          {
            type: "divider",
          },
          {
            type: "item",
            text: "Slett mappe",
            icon: <DeleteIcon />,
            onClick: () => void 0,
          },
        ]}
        anchor={menuAnchor?.current}
        open={isMenuOpen}
        handleClose={handleCloseMenu}
      />
      <CreateSchemaContextProvider onSuccess={handleSuccess}>
        {/* Not sure how I like having this here, but it can be moved at a later stage.
            its one of those in the moment decisions that take too much time to fix for a prototype.
            It's also easy session storage ish behaviour. 
        */}
        <DialogComponent />
      </CreateSchemaContextProvider>
      <SnackComponent />
    </Wrapper>
  );
};

export default FolderRow;

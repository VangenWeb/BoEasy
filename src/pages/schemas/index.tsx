import styled from "@emotion/styled";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { IconButton as BaseIconButton, PageWrapper } from "~/components";
import FolderRow from "~/components/modules/schemas/FolderRow";
import SchemaRow from "~/components/modules/schemas/SchemaRow";
import { useGroup } from "~/util/hooks";
import { api } from "~/utils/api";

const CreateFolderButton = styled(BaseIconButton)``;
const CreateSchemaButton = styled(BaseIconButton)``;

const Wrapper = styled.div`
  position: relative;
  flex: 1;
`;
const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
`;

// DISCLAIMER: This function WILL need rework if this EVER gets used in larger systems. The way the folders/schemas are fetched is ridiculous and is recursive on the front-end.
// But as I am making this right now its easy, its fast, and at the moment I am only after making something that works as a demo.
// TODO: Make this non-recursive on the front-end and have the entire file system be fetched once.
export default function Schemas() {
  const group = useGroup();
  const {
    data: children,
    isLoading: childrenLoading,
    refetch: refetchFolders,
  } = api.schema.getChildren.useQuery(
    {
      groupId: group ?? "",
      parentId: null,
    },
    {
      enabled: !!group,
    },
  );
  const { mutate, isLoading } = api.schema.createFolder.useMutation();

  function handleCreateFolder(parentId: string | null) {
    return () => {
      if (!group) {
        // Add error handling
        return;
      }
      const name = prompt("Mappe navn?");
      if (!name) {
        return;
      }
      mutate(
        {
          name: name,
          parentId: parentId ?? null,
          groupId: group,
        },
        {
          onSuccess: () => {
            void refetchFolders().catch((err) => console.error(err));
          },
        },
      );
    };
  }

  return (
    <PageWrapper>
      <Wrapper>
        <ActionWrapper>
          <CreateSchemaButton>
            <NoteAddIcon />
          </CreateSchemaButton>
          <CreateFolderButton onClick={handleCreateFolder(null)}>
            <CreateNewFolderIcon />
          </CreateFolderButton>
        </ActionWrapper>
        {children?.ok &&
          children.data.folders.map((folder) => {
            return <FolderRow key={folder.id} {...folder} />;
          })}
        {children?.ok &&
          children.data.schemas.map((schema) => (
            <SchemaRow key={schema.id} {...schema} />
          ))}
      </Wrapper>
    </PageWrapper>
  );
}

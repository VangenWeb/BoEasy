import styled from "@emotion/styled";
import { Editor } from "@tinymce/tinymce-react";
import { forwardRef } from "react";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  & .mce-notification,
  & .tox-notification--warning {
    display: none !important;
  }
`;

interface RichTextEditorProps {
  initialValue?: string;
}
export const RichTextEditor = forwardRef<Editor, RichTextEditorProps>(
  function RichTextComponent({ initialValue }, ref) {
    return (
      <Wrapper>
        <Editor
          ref={ref}
          apiKey="q1s6btuh4znfoym9mpgv5mybz5206ooilz327q68h7nk0no3"
          initialValue={initialValue ?? ""}
          onInit={(evt, editor) => {
            if (ref && "current" in ref) {
              return (ref.current = editor as unknown as Editor);
            }
          }}
          init={{
            height: "100%",
            width: "100%",
            menubar: true,
            mobile: {
              menubar: false,
              toolbar1: "undo redo | blocks | ",
              toolbar2:
                "bold italic forecolor | alignleft aligncenter alignright alignjustify",
              toolbar3: " bullist numlist outdent indent",
            },
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </Wrapper>
    );
  },
);

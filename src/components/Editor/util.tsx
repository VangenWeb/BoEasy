import { type MutableRefObject } from "react";
import { type Editor } from "@tinymce/tinymce-react";

export function getEditorContent(ref: MutableRefObject<Editor | null>) {
  if (
    ref &&
    "current" in ref &&
    ref.current &&
    "getContent" in ref.current &&
    ref.current.getContent &&
    typeof ref.current.getContent === "function"
  ) {
    return ref.current.getContent() as string;
  }
}

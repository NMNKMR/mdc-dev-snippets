type ThemeMode = "light" | "dark" | "system";
type ExportFormat = "txt" | "js" | "json";
type AttachmentKind = "image" | "file";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  isFavorite: boolean;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

interface SnippetRow {
  id: string;
  title: string;
  code: string;
  language: string;
  is_favorite: number;
  created_at: number;
  updated_at: number;
  // Present only on rows from the tag-join queries (GROUP_CONCAT result).
  tags?: string | null;
}

interface Attachment {
  id: string;
  snippetId: string;
  uri: string;
  name: string;
  kind: AttachmentKind;
  size: number;
  createdAt: number;
}

// A picked-but-not-yet-persisted attachment. Held in local state on the create
// screen (no snippet id yet); copied into storage + recorded once the snippet
// is saved.
interface DraftAttachment {
  uri: string;
  name: string;
  kind: AttachmentKind;
  size: number;
}

interface AttachmentRow {
  id: string;
  snippet_id: string;
  uri: string;
  name: string;
  kind: AttachmentKind;
  size: number;
  created_at: number;
}

declare module "react-native-syntax-highlighter" {
  import { ComponentType, ReactNode } from "react";

  interface SyntaxHighlighterProps {
    language: string;
    style?: Record<string, unknown>;
    highlighter?: "hljs" | "prism";
    fontFamily?: string;
    fontSize?: number;
    customStyle?: Record<string, unknown>;
    // React 19 dropped function-component defaultProps, so the wrapper's
    // built-in PreTag/CodeTag defaults no longer apply — we must pass them.
    PreTag?: ComponentType<any>;
    CodeTag?: ComponentType<any>;
    children?: ReactNode;
  }

  const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps>;
  export default SyntaxHighlighter;
}

declare module "react-syntax-highlighter/dist/cjs/styles/hljs" {
  export const atomOneDark: Record<string, unknown>;
  export const atomOneLight: Record<string, unknown>;
}

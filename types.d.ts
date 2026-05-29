type ThemeMode = "light" | "dark" | "system";

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

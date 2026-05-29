import { lightColors } from "@/constants/colors";

export type Language = {
  id: string;
  name: string;
  color: string;
};

export const LANGUAGES: Language[] = [
  { id: "javascript", name: "JavaScript", color: lightColors.langJs },
  { id: "typescript", name: "TypeScript", color: lightColors.langTs },
  { id: "python", name: "Python", color: lightColors.langPython },
  { id: "go", name: "Go", color: lightColors.langGo },
  { id: "rust", name: "Rust", color: lightColors.langRust },
  { id: "swift", name: "Swift", color: lightColors.langSwift },
  { id: "kotlin", name: "Kotlin", color: lightColors.langKotlin },
];

export const getLanguage = (id: string): Language | undefined =>
  LANGUAGES.find((l) => l.id === id);

export const getLanguageColor = (id: string): string | undefined =>
  getLanguage(id)?.color;

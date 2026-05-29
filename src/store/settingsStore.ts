import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type FontSize = 12 | 13 | 14 | 16;
export const FONT_SIZES: FontSize[] = [12, 13, 14, 16];

type SettingsState = {
  themeMode: ThemeMode;
  defaultLanguage: string;
  fontSize: FontSize;
  setThemeMode: (mode: ThemeMode) => void;
  setDefaultLanguage: (lang: string) => void;
  setFontSize: (size: FontSize) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: "system",
      defaultLanguage: "typescript",
      fontSize: 13,
      setThemeMode: (mode) => set({ themeMode: mode }),
      setDefaultLanguage: (lang) => set({ defaultLanguage: lang }),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        defaultLanguage: state.defaultLanguage,
        fontSize: state.fontSize,
      }),
    },
  ),
);

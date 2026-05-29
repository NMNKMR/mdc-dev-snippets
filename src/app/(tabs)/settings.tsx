import Divider from "@/components/core/Divider";
import Dropdown from "@/components/core/Dropdown";
import PickerModal, { PickerOption } from "@/components/core/PickerModal";
import ActionRow from "@/components/settings/ActionRow";
import Card from "@/components/settings/Card";
import SectionHeader from "@/components/settings/SectionHeader";
import { radius, spacing, typography } from "@/constants";
import { useTheme } from "@/context/theme";
import { getLanguage, LANGUAGES } from "@/lib/language";
import { FONT_SIZES, FontSize, useSettingsStore } from "@/store/settingsStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const DUMMY_API = {
  apiKey: "abcdefghijkl",
  aiModel: "Claude 3.5 Sonnet",
  version: "v1.0.0",
};

const THEME_LABELS: Record<ThemeMode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

type PickerKind = "theme" | "language" | "fontSize" | null;

export default function Settings() {
  const { colors, isDarkMode } = useTheme();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const defaultLanguage = useSettingsStore((s) => s.defaultLanguage);
  const fontSize = useSettingsStore((s) => s.fontSize);
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);
  const setDefaultLanguage = useSettingsStore((s) => s.setDefaultLanguage);
  const setFontSize = useSettingsStore((s) => s.setFontSize);

  const [picker, setPicker] = useState<PickerKind>(null);
  const language = getLanguage(defaultLanguage);

  const themeOptions: PickerOption<ThemeMode>[] = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  const languageOptions: PickerOption<string>[] = LANGUAGES.map((l) => ({
    value: l.id,
    label: l.name,
    tint: l.color,
  }));

  const fontSizeOptions: PickerOption<FontSize>[] = FONT_SIZES.map((s) => ({
    value: s,
    label: `${s}px`,
  }));

  return (
    <>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Configuration */}
        <SectionHeader title="AI Configuration" />
        <Card>
          <View style={styles.apiHeader}>
            <Text style={[styles.apiLabel, { color: colors.onSurface }]}>
              API Key
            </Text>
            <Pressable hitSlop={8}>
              <Text style={[styles.apiLink, { color: colors.primary }]}>
                Get your key
              </Text>
            </Pressable>
          </View>
          <View
            style={[
              styles.input,
              {
                borderColor: colors.outlineVariant,
                backgroundColor: colors.surfaceContainerHigh,
              },
            ]}
          >
            <TextInput
              value={DUMMY_API.apiKey}
              secureTextEntry
              editable={false}
              style={[styles.inputText, { color: colors.onSurface }]}
            />
            <Pressable hitSlop={8} style={styles.inputIcon}>
              <Ionicons
                name="eye-off-outline"
                size={20}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
            <Pressable hitSlop={8} style={styles.inputIcon}>
              <Ionicons
                name="clipboard-outline"
                size={20}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.validateBtn,
              {
                backgroundColor: colors.primaryContainer,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={colors.onPrimaryContainer}
            />
            <Text
              style={[
                styles.validateText,
                { color: colors.onPrimaryContainer },
              ]}
            >
              Validate Key
            </Text>
          </Pressable>
        </Card>
        <Card>
          <Dropdown
            layout="stacked"
            label="AI Model"
            value={DUMMY_API.aiModel}
          />
        </Card>

        {/* Editor */}
        <SectionHeader title="Editor" />
        <Card>
          <Dropdown
            icon={
              <Ionicons name="code-slash" size={20} color={colors.onSurface} />
            }
            label="Default Language"
            value={language?.name ?? defaultLanguage}
            valueAsChip
            valueColor={language?.color}
            onPress={() => setPicker("language")}
          />
          <Divider style={styles.cardDivider} />
          <Dropdown
            icon={
              <MaterialIcons
                name="text-fields"
                size={20}
                color={colors.onSurface}
              />
            }
            label="Font Size"
            value={`${fontSize}px`}
            onPress={() => setPicker("fontSize")}
          />
        </Card>

        {/* Appearance */}
        <SectionHeader title="Appearance" />
        <Card>
          <Dropdown
            icon={
              <Ionicons
                name={isDarkMode ? "moon-outline" : "sunny-outline"}
                size={20}
                color={colors.onSurface}
              />
            }
            label="Theme"
            value={THEME_LABELS[themeMode]}
            onPress={() => setPicker("theme")}
          />
        </Card>

        {/* Data */}
        <SectionHeader title="Data" />
        <Card>
          <ActionRow
            icon={
              <Ionicons
                name="cloud-upload-outline"
                size={20}
                color={colors.onSurface}
              />
            }
            label="Export Snippets"
          />
          <Divider style={styles.cardDivider} />
          <ActionRow
            icon={
              <Ionicons
                name="download-outline"
                size={20}
                color={colors.onSurface}
              />
            }
            label="Import Snippets"
          />
          <Divider style={styles.cardDivider} />
          <ActionRow
            icon={
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            }
            label="Clear AI Cache"
            labelColor={colors.error}
          />
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <MaterialIcons
            name="terminal"
            size={32}
            color={colors.primaryContainer}
          />
          <Text style={[styles.footerVersion, { color: colors.onSurface }]}>
            DevSnippets AI {DUMMY_API.version}
          </Text>
          <View style={styles.footerLinks}>
            <Text style={[styles.footerLink, { color: colors.primaryFixed }]}>
              Credits
            </Text>
            <Text
              style={[styles.footerDot, { color: colors.onSurfaceVariant }]}
            >
              ·
            </Text>
            <Text style={[styles.footerLink, { color: colors.primaryFixed }]}>
              Privacy
            </Text>
            <Text
              style={[styles.footerDot, { color: colors.onSurfaceVariant }]}
            >
              ·
            </Text>
            <Text style={[styles.footerLink, { color: colors.primaryFixed }]}>
              Terms
            </Text>
          </View>
        </View>
      </ScrollView>

      <PickerModal
        visible={picker === "theme"}
        title="Theme"
        options={themeOptions}
        selected={themeMode}
        onSelect={setThemeMode}
        onClose={() => setPicker(null)}
      />
      <PickerModal
        visible={picker === "language"}
        title="Default Language"
        options={languageOptions}
        selected={defaultLanguage}
        onSelect={setDefaultLanguage}
        onClose={() => setPicker(null)}
      />
      <PickerModal
        visible={picker === "fontSize"}
        title="Font Size"
        options={fontSizeOptions}
        selected={fontSize}
        onSelect={setFontSize}
        onClose={() => setPicker(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.huge,
  },

  // Inset divider used inside a Card
  cardDivider: {
    marginHorizontal: spacing.lg,
  },

  // API key block
  apiHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  apiLabel: {
    ...typography.bodyLg,
  },
  apiLink: {
    ...typography.bodyMd,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  inputText: {
    flex: 1,
    ...typography.codeBlock,
    paddingVertical: spacing.xs,
  },
  inputIcon: {
    paddingHorizontal: 2,
  },
  validateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  validateText: {
    ...typography.labelCaps,
    fontSize: 13,
  },

  // Footer
  footer: {
    alignItems: "center",
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  footerVersion: {
    ...typography.labelCaps,
    fontSize: 13,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  footerLink: {
    ...typography.bodyMd,
  },
  footerDot: {
    ...typography.bodyMd,
  },
});

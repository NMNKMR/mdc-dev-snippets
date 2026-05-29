import { radius, spacing, typography } from "@/constants";
import { useTheme } from "@/context/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Dummy AI panel — the actions are placeholders until the AI flow is built.
const AI_ACTIONS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "document-text-outline", label: "Summary" },
  { icon: "information-circle-outline", label: "Explain" },
  { icon: "flash-outline", label: "Improvements" },
];

const AIBox = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surfaceContainer,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Ionicons
          style={{ position: "relative", bottom: 2 }}
          name="sparkles"
          size={20}
          color={colors.warning}
        />
        <Text style={[styles.title, { color: colors.onSurface }]}>Ask AI</Text>
      </View>

      {AI_ACTIONS.map((action) => (
        <Pressable
          key={action.label}
          style={({ pressed }) => [
            styles.action,
            {
              backgroundColor: colors.surfaceContainerHigh,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Ionicons name={action.icon} size={16} color={colors.onSurface} />
          <Text style={[styles.actionLabel, { color: colors.onSurface }]}>
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default AIBox;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  spacer: {
    flex: 1,
  },
  title: {
    ...typography.headlineMd,
    marginBottom: spacing.xs,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  actionLabel: {
    ...typography.bodyMd,
  },
});

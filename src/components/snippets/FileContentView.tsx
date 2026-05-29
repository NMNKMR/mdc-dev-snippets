import CodeEditor from "@/components/core/CodeEditor";
import { spacing, typography } from "@/constants";
import { useTheme } from "@/context/theme";
import { useFileText } from "@/hooks/useAttachments";
import { isTextFileName, languageFromFileName } from "@/lib/language";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

type FileContentViewProps = {
  uri: string;
  name?: string;
};

const FileContentView = ({ uri, name }: FileContentViewProps) => {
  const { colors } = useTheme();
  const readable = isTextFileName(name ?? "");
  const { data, isLoading } = useFileText(readable ? uri : null);

  if (!readable) {
    return (
      <View style={styles.center}>
        <Text style={[styles.message, { color: colors.onSurfaceVariant }]}>
          {name ?? "This file"} can&apos;t be previewed.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <CodeEditor
        value={data ?? ""}
        language={languageFromFileName(name ?? "")}
        mode="read"
        showLineNumbers
        fontSize={13}
      />
    </ScrollView>
  );
};

export default FileContentView;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  message: {
    ...typography.bodyLg,
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
});

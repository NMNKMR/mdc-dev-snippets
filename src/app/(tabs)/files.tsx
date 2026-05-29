import { typography } from "@/constants";
import { useTheme } from "@/context/theme";
import { StyleSheet, Text, View } from "react-native";

export default function Files() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.onSurfaceVariant }]}>
        Files
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { ...typography.bodyLg },
});

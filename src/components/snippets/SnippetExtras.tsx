import AIBox from "@/components/snippets/AIBox";
import AttachmentBox, {
  type AttachmentItem,
} from "@/components/snippets/AttachmentBox";
import { spacing } from "@/constants";
import { StyleSheet, View } from "react-native";

type SnippetExtrasProps = {
  attachments: AttachmentItem[];
  onAdd: (kind: AttachmentKind) => void;
  onDelete: (item: AttachmentItem) => void;
};

const SnippetExtras = ({
  attachments,
  onAdd,
  onDelete,
}: SnippetExtrasProps) => {
  return (
    <View style={styles.row}>
      <AIBox />
      <AttachmentBox
        attachments={attachments}
        onAdd={onAdd}
        onDelete={onDelete}
      />
    </View>
  );
};

export default SnippetExtras;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.md,
  },
});

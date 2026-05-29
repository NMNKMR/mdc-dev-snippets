import { useTheme } from "@/context/theme";
import { Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const SearchHeaderButton = () => {
  const { colors } = useTheme();
  return (
    <Pressable
      hitSlop={8}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Octicons name="codescan" size={24} color={colors.primary} />
    </Pressable>
  );
};

export default SearchHeaderButton;

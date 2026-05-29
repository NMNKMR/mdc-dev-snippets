import Brand from "@/components/shared/Brand";
import AddTabButton from "@/components/tabs/AddBtn";
import SearchHeaderButton from "@/components/tabs/SearchHeaderBtn";
import { spacing, typography } from "@/constants";
import { useTheme } from "@/context/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { tabs } from "../../constants/data";

export default function TabsLayout() {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTitle: () => <Brand />,
        headerStyle: {
          backgroundColor: isDarkMode ? colors.black : colors.white,
        },
        headerRightContainerStyle: { paddingRight: spacing.lg },
        sceneStyle: { backgroundColor: colors.background },
        tabBarStyle: {
          backgroundColor: colors.surfaceContainer,
          borderTopColor: colors.outlineVariant,
        },
        tabBarActiveTintColor: colors.onSurface,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontFamily: typography.labelCaps.fontFamily,
          fontSize: 11,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerRight: tab.showHeaderSearch
              ? () => <SearchHeaderButton />
              : undefined,
            tabBarIcon: tab.isAddButton
              ? () => null
              : ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? tab.iconActive : tab.icon}
                    size={20}
                    color={color}
                  />
                ),
            tabBarButton: tab.isAddButton
              ? () => (
                  <AddTabButton onPress={() => router.push("/snippets/new")} />
                )
              : undefined,
          }}
        />
      ))}
    </Tabs>
  );
}

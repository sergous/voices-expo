import { useClientOnlyValue } from "@/components/useClientOnlyValue"
import { Tabs } from "expo-router"
import { Activity, Home, Library, User } from "lucide-react-native"
import React from "react"

function TabBarIcon({ Icon, color }: { Icon: any; color: string }) {
  return <Icon size={24} color={color} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "#1E1E1E",
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: "#1ED760",
        tabBarInactiveTintColor: "#9CA3AF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Home} color={color} />,
        }}
      />

      <Tabs.Screen
        name="content-list"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Library} color={color} />,
        }}
      />

      <Tabs.Screen
        name="voice-analysis"
        options={{
          title: "Analysis",
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Activity} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon Icon={User} color={color} />,
        }}
      />
    </Tabs>
  )
}

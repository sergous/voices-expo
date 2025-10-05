import { router, usePathname } from "expo-router"
import { Home, Library, User } from "lucide-react-native"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface BottomNavigationProps {
  className?: string
}

const TabBarIcon = ({ Icon, color }: { Icon: any; color: string }) => {
  return <Icon size={24} color={color} />
}

export default function BottomNavigation({ className = "" }: BottomNavigationProps) {
  const pathname = usePathname()
  const insets = useSafeAreaInsets()

  // Map paths to tab names for consistent styling
  const getTabName = (path: string) => {
    if (path === "/" || path === "/index") return "home"
    if (path.includes("/content-list")) return "library"
    if (path.includes("/profile")) return "profile"
    return "home"
  }

  const activeTab = getTabName(pathname)

  const tabs = [
    {
      name: "home",
      title: "Home",
      icon: Home,
      href: "/",
    },
    {
      name: "library",
      title: "Library",
      icon: Library,
      href: "/content-list",
    },
    {
      name: "profile",
      title: "Profile",
      icon: User,
      href: "/profile",
    },
  ]

  return (
    <View
      className={`absolute bottom-0 left-0 right-0 bg-[#121212] border-t border-[#1E1E1E] z-50 ${className}`}
      style={{
        paddingBottom: Math.max(insets.bottom, 20), // Use safe area insets with minimum fallback
      }}
    >
      <View className="flex-row justify-around py-3 px-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            className={`items-center px-3 py-2 rounded-lg min-w-[60px] ${activeTab === tab.name ? "bg-[#1E1E1E]" : ""}`}
            onPress={() => {
              router.push(tab.href as any)
            }}
            activeOpacity={0.7}
          >
            <TabBarIcon Icon={tab.icon} color={activeTab === tab.name ? "#1ED760" : "#9CA3AF"} />
            <Text
              className={`text-xs mt-1 font-medium ${activeTab === tab.name ? "text-[#1ED760]" : "text-[#B3B3B3]"}`}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

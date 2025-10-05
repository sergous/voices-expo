import BottomNavigation from "@/components/BottomNavigation"
import { router } from "expo-router"
import {
  Bell,
  Calendar,
  CreditCard,
  Edit3,
  HelpCircle,
  Lock,
  LogOut,
  Settings,
} from "lucide-react-native"
import React, { useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ProfileScreen = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState("active")
  const [learningProgress, setLearningProgress] = useState([
    { id: 1, title: "Voice Fundamentals", progress: 75, category: "Course" },
    { id: 2, title: "Breathing Techniques", progress: 40, category: "Podcast" },
    { id: 3, title: "Pitch Control", progress: 90, category: "Course" },
  ])

  const purchaseHistory = [
    {
      id: 1,
      title: "Advanced Vocal Techniques",
      date: "2023-05-15",
      amount: "$2.00",
      type: "Course",
    },
    {
      id: 2,
      title: "Monthly Subscription",
      date: "2023-05-01",
      amount: "$50.00",
      type: "Subscription",
    },
    { id: 3, title: "Pronunciation Mastery", date: "2023-04-22", amount: "$2.00", type: "Podcast" },
  ]

  const accountOptions = [
    { id: 1, title: "Payment Methods", icon: <CreditCard color="#B3B3B3" size={20} /> },
    { id: 2, title: "Notifications", icon: <Bell color="#B3B3B3" size={20} /> },
    { id: 3, title: "Security", icon: <Lock color="#B3B3B3" size={20} /> },
    { id: 4, title: "Settings", icon: <Settings color="#B3B3B3" size={20} /> },
    { id: 5, title: "Help & Support", icon: <HelpCircle color="#B3B3B3" size={20} /> },
  ]

  const handleLogout = () => {
    // In a real app, this would handle the logout logic
    console.log("User logged out")
  }

  const handleAccountOptionPress = (optionTitle: string) => {
    switch (optionTitle) {
      case "Payment Methods":
        router.push("/payment")
        break
      case "Notifications":
        console.log("Navigate to notifications")
        break
      case "Security":
        console.log("Navigate to security")
        break
      case "Settings":
        console.log("Navigate to settings")
        break
      case "Help & Support":
        console.log("Navigate to help & support")
        break
      default:
        break
    }
  }

  return (
    <View className="flex-1 bg-[#121212]">
      {/* Profile Header */}
      <SafeAreaView>
        <View className="items-center">
          <View className="relative">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
              }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-[#1ED760] p-2 rounded-full">
              <Edit3 color="white" size={16} />
            </TouchableOpacity>
          </View>
          <Text className="text-white text-2xl font-bold mt-4">Alex Morgan</Text>
          <Text className="text-[#B3B3B3] text-base mt-1">alex.morgan@example.com</Text>
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1 px-4 py-6 pb-24">
        <View className="pb-100">
          {/* Subscription Status */}
          <View className="mt-6 bg-[#1E1E1E] rounded-xl p-4 w-full">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white text-lg font-semibold">Subscription Status</Text>
                <Text
                  className={`text-${subscriptionStatus === "active" ? "[#1ED760]" : "[#FF5C5C]"} text-base font-medium mt-1`}
                >
                  {subscriptionStatus === "active" ? "Active" : "Inactive"}
                </Text>
              </View>
              <View className="bg-[#2D5BFF] px-3 py-1 rounded-full">
                <Text className="text-white text-sm">Premium</Text>
              </View>
            </View>
            <Text className="text-[#B3B3B3] text-sm mt-3">Renews on June 1, 2023 • $50/month</Text>
          </View>

          {/* Learning Progress */}
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-xl font-bold">Learning Progress</Text>
              <TouchableOpacity>
                <Text className="text-[#2D5BFF]">View All</Text>
              </TouchableOpacity>
            </View>

            {learningProgress.map((item) => (
              <View key={item.id} className="bg-[#1E1E1E] rounded-xl p-4 mb-3">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white text-base font-medium">{item.title}</Text>
                    <Text className="text-[#B3B3B3] text-sm mt-1">{item.category}</Text>
                  </View>
                  <View className="bg-[#2D5BFF] px-2 py-1 rounded-full">
                    <Text className="text-white text-xs">{item.progress}%</Text>
                  </View>
                </View>
                <View className="flex-row items-center mt-3">
                  <View className="flex-1 h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <View
                      className="h-full bg-[#1ED760] rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Purchase History */}
          <View className="mb-8">
            <Text className="text-white text-xl font-bold mb-4">Purchase History</Text>

            {purchaseHistory.map((item) => (
              <View
                key={item.id}
                className="flex-row justify-between items-center bg-[#1E1E1E] rounded-xl p-4 mb-3"
              >
                <View>
                  <Text className="text-white text-base font-medium">{item.title}</Text>
                  <View className="flex-row items-center mt-1">
                    <Calendar color="#B3B3B3" size={14} />
                    <Text className="text-[#B3B3B3] text-sm ml-2">{item.date}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-white text-base font-medium">{item.amount}</Text>
                  <Text className="text-[#B3B3B3] text-sm mt-1">{item.type}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Account Management */}
          <View className="mb-8">
            <Text className="text-white text-xl font-bold mb-2">Account Management</Text>

            {accountOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                className="flex-row items-center bg-[#1E1E1E] rounded-xl p-4 mb-3"
                onPress={() => handleAccountOptionPress(option.title)}
              >
                <View className="mr-4">{option.icon}</View>
                <Text className="text-white text-base flex-1">{option.title}</Text>
                <View className="bg-[#2A2A2A] w-6 h-6 rounded-full items-center justify-center">
                  <Text className="text-[#B3B3B3] text-sm">›</Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center justify-center bg-[#FF5C5C] rounded-xl p-4 mt-16"
            >
              <LogOut color="white" size={20} className="mr-2" />
              <Text className="text-white text-base font-medium">Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  )
}

export default ProfileScreen

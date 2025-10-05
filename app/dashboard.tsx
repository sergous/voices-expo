import {
  Calendar,
  ChevronRight,
  Clock,
  Download,
  Home,
  Library,
  Lock,
  Mic,
  Play,
  Search,
  Star,
  TrendingUp,
  User,
} from "lucide-react-native"
import React, { useState } from "react"
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"

const { width } = Dimensions.get("window")

// Mock data for recommendations
const recommendedContent = [
  {
    id: "1",
    title: "Vocal Power Foundations",
    instructor: "Juliana Andreeva",
    type: "course",
    duration: "8 lessons",
    progress: 75,
    price: 2,
    isPurchased: true,
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "2",
    title: "Breath Control Mastery",
    instructor: "Juliana Andreeva",
    type: "podcast",
    duration: "42 min",
    progress: 0,
    price: 2,
    isPurchased: false,
    imageUrl:
      "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "3",
    title: "Vocal Range Expansion",
    instructor: "Juliana Andreeva",
    type: "course",
    duration: "12 lessons",
    progress: 30,
    price: 2,
    isPurchased: true,
    imageUrl:
      "https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3R1ZGVudCUyMGxlYXJuZXIlMjBwdXBpbCUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
]

// Mock data for recent activity
const recentActivity = [
  { id: "1", title: "Daily Vocal Warmups", type: "course", time: "2 hours ago" },
  { id: "2", title: "Interview with Vocal Coach", type: "podcast", time: "1 day ago" },
  { id: "3", title: "Pitch Training Exercises", type: "course", time: "2 days ago" },
]

// Subscription plans
const subscriptionPlans = [
  { id: "monthly", name: "Monthly", price: 50, description: "Full access to all content" },
  { id: "annual", name: "Annual", price: 500, description: "Save 20% with annual plan" },
]

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("home")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [userName, setUserName] = useState("Alex")

  return (
    <View className="flex-1 bg-[#121212]">
      {/* Header */}
      <View className="bg-[#121212] pt-12 pb-4 px-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-2xl font-bold">Voices</Text>
            <Text className="text-[#1ED760] text-sm">Vocal Training with Juliana</Text>
          </View>
          <TouchableOpacity className="bg-[#1E1E1E] rounded-full p-2">
            <User color="#1ED760" size={24} />
          </TouchableOpacity>
        </View>

        {/* Subscription Banner */}
        {!isSubscribed && (
          <View className="mt-4 bg-gradient-to-r from-[#1ED760] to-[#2D5BFF] rounded-xl p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Unlock All Content</Text>
                <Text className="text-gray-200 text-sm">Subscribe for $50/month</Text>
              </View>
              <TouchableOpacity
                className="bg-white rounded-full px-4 py-2"
                onPress={() => setIsSubscribed(true)}
              >
                <Text className="text-[#1ED760] font-bold">Subscribe</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-4 pb-20" showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View className="mt-6 mb-6">
          <Text className="text-white text-2xl font-bold">Good morning, {userName}</Text>
          <Text className="text-[#B3B3B3]">Ready to improve your voice today?</Text>
        </View>

        {/* Stats Overview */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-[#1E1E1E] rounded-2xl p-4">
            <View className="flex-row items-center">
              <TrendingUp color="#1ED760" size={20} />
              <Text className="text-white font-bold ml-2">Progress</Text>
            </View>
            <Text className="text-white text-2xl font-bold mt-2">78%</Text>
            <Text className="text-[#B3B3B3] text-sm mt-1">This month</Text>
          </View>

          <View className="flex-1 bg-[#1E1E1E] rounded-2xl p-4">
            <View className="flex-row items-center">
              <Clock color="#2D5BFF" size={20} />
              <Text className="text-white font-bold ml-2">Practice</Text>
            </View>
            <Text className="text-white text-2xl font-bold mt-2">42h</Text>
            <Text className="text-[#B3B3B3] text-sm mt-1">This month</Text>
          </View>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Categories</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="bg-[#1E1E1E] rounded-2xl px-4 py-3 flex-1 items-center">
              <Mic color="#1ED760" size={20} />
              <Text className="text-white mt-1">Podcasts</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#1E1E1E] rounded-2xl px-4 py-3 flex-1 items-center">
              <Library color="#1ED760" size={20} />
              <Text className="text-white mt-1">Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#1E1E1E] rounded-2xl px-4 py-3 flex-1 items-center">
              <Star color="#1ED760" size={20} />
              <Text className="text-white mt-1">Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Learning */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-lg font-bold">Continue Learning</Text>
            <TouchableOpacity>
              <Text className="text-[#2D5BFF]">View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-40">
            <View className="flex-row gap-4">
              <View className="bg-[#1E1E1E] rounded-2xl p-4 w-64">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white font-bold">Breath Control Mastery</Text>
                    <Text className="text-[#B3B3B3] text-sm">Lesson 3 of 8</Text>
                  </View>
                  <TouchableOpacity className="bg-[#1ED760] rounded-full p-2">
                    <Play color="white" size={16} />
                  </TouchableOpacity>
                </View>
                <View className="mt-3 h-2 bg-[#2A2A2A] rounded-full">
                  <View className="h-2 bg-[#1ED760] rounded-full w-3/4"></View>
                </View>
              </View>

              <View className="bg-[#1E1E1E] rounded-2xl p-4 w-64">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white font-bold">Vocal Warmups</Text>
                    <Text className="text-[#B3B3B3] text-sm">Not started</Text>
                  </View>
                  <TouchableOpacity className="bg-[#2A2A2A] rounded-full p-2">
                    <Play color="white" size={16} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Recommended for You */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Recommended for You</Text>
          <View className="gap-4">
            {recommendedContent.map((item) => (
              <TouchableOpacity key={item.id} className="bg-[#1E1E1E] rounded-2xl overflow-hidden">
                <View className="flex-row">
                  <Image source={{ uri: item.imageUrl }} className="w-24 h-24 rounded-l-2xl" />
                  <View className="flex-1 p-3 justify-between">
                    <View>
                      <Text className="text-white font-bold">{item.title}</Text>
                      <Text className="text-[#B3B3B3] text-sm">{item.instructor}</Text>
                      <Text className="text-[#B3B3B3] text-sm">{item.duration}</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        {item.isPurchased ? (
                          <>
                            {item.progress > 0 ? (
                              <View className="flex-row items-center">
                                <Text className="text-[#1ED760] text-sm mr-2">
                                  {item.progress}%
                                </Text>
                                <TouchableOpacity className="bg-[#1ED760] rounded-full p-2">
                                  <Play color="white" size={16} />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <TouchableOpacity className="bg-[#1ED760] rounded-full p-2">
                                <Play color="white" size={16} />
                              </TouchableOpacity>
                            )}
                          </>
                        ) : (
                          <TouchableOpacity className="bg-[#2D5BFF] rounded-full px-3 py-1 flex-row items-center">
                            <Lock color="white" size={14} />
                            <Text className="text-white text-sm ml-1">${item.price}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <TouchableOpacity className="bg-[#2A2A2A] rounded-full p-2">
                        <Download color="white" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Recent Activity</Text>
          <View className="gap-3">
            {recentActivity.map((activity) => (
              <View key={activity.id} className="flex-row items-center bg-[#1E1E1E] rounded-xl p-4">
                <View className="bg-[#2A2A2A] w-10 h-10 rounded-full items-center justify-center mr-3">
                  {activity.type === "course" ? (
                    <Library color="#1ED760" size={20} />
                  ) : (
                    <Mic color="#1ED760" size={20} />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">{activity.title}</Text>
                  <View className="flex-row items-center mt-1">
                    <Calendar color="#B3B3B3" size={14} />
                    <Text className="text-[#B3B3B3] text-sm ml-1">{activity.time}</Text>
                  </View>
                </View>
                <ChevronRight color="#B3B3B3" size={20} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#121212] border-t border-[#1E1E1E]">
        <View className="flex-row justify-around py-3">
          <TouchableOpacity
            className={`items-center px-4 py-2 rounded-full ${activeTab === "home" ? "bg-[#1E1E1E]" : ""}`}
            onPress={() => setActiveTab("home")}
          >
            <Home color={activeTab === "home" ? "#1ED760" : "#9CA3AF"} size={24} />
            <Text
              className={`text-xs mt-1 ${activeTab === "home" ? "text-[#1ED760]" : "text-[#B3B3B3]"}`}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`items-center px-4 py-2 rounded-full ${activeTab === "search" ? "bg-[#1E1E1E]" : ""}`}
            onPress={() => setActiveTab("search")}
          >
            <Search color={activeTab === "search" ? "#1ED760" : "#9CA3AF"} size={24} />
            <Text
              className={`text-xs mt-1 ${activeTab === "search" ? "text-[#1ED760]" : "text-[#B3B3B3]"}`}
            >
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`items-center px-4 py-2 rounded-full ${activeTab === "library" ? "bg-[#1E1E1E]" : ""}`}
            onPress={() => setActiveTab("library")}
          >
            <Library color={activeTab === "library" ? "#1ED760" : "#9CA3AF"} size={24} />
            <Text
              className={`text-xs mt-1 ${activeTab === "library" ? "text-[#1ED760]" : "text-[#B3B3B3]"}`}
            >
              Library
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`items-center px-4 py-2 rounded-full ${activeTab === "profile" ? "bg-[#1E1E1E]" : ""}`}
            onPress={() => setActiveTab("profile")}
          >
            <User color={activeTab === "profile" ? "#1ED760" : "#9CA3AF"} size={24} />
            <Text
              className={`text-xs mt-1 ${activeTab === "profile" ? "text-[#1ED760]" : "text-[#B3B3B3]"}`}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

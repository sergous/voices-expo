import BottomNavigation from "@/components/BottomNavigation"
import { useRouter } from "expo-router"
import { Mic, Play, Search, Unlock } from "lucide-react-native"
import React, { useEffect, useState } from "react"
import { Animated, SectionList, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// Mock data for courses and podcasts
const mockCourses = [
  {
    id: "1",
    title: "Voice Confidence Fundamentals",
    duration: "7 min",
    category: "Voice Training",
    previewUrl: "https://example.com/preview1.mp3",
    price: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3R1ZGVudCUyMGxlYXJuZXIlMjBwdXBpbCUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    isPurchased: false,
  },
  {
    id: "2",
    title: "Breathing Techniques for Speakers",
    duration: "12 min",
    category: "Voice Training",
    previewUrl: "https://example.com/preview2.mp3",
    price: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
    isPurchased: true,
  },
  {
    id: "3",
    title: "Relaxation Through Vocalization",
    duration: "15 min",
    category: "Relaxation",
    previewUrl: "https://example.com/preview3.mp3",
    price: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    isPurchased: false,
  },
  {
    id: "4",
    title: "Public Speaking Mastery",
    duration: "22 min",
    category: "Voice Training",
    previewUrl: "https://example.com/preview4.mp3",
    price: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1543033906-8f2a9f541af9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXNwb3J0cyUyMHZpcnR1YWwlMjByYWNpbmclMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D",
    isPurchased: false,
  },
  {
    id: "5",
    title: "Morning Vocal Warmups",
    duration: "10 min",
    category: "Warmups",
    previewUrl: "https://example.com/preview5.mp3",
    price: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1635099404457-91c3d0dade3b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8MyUyMGdyYXBoaWNzfGVufDB8fDB8fHww",
    isPurchased: false,
  },
  {
    id: "6",
    title: "Stress Relief Breathing",
    duration: "8 min",
    category: "Relaxation",
    previewUrl: "https://example.com/preview6.mp3",
    price: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1675351085230-ab39b2289ff4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
    isPurchased: false,
  },
]

// Group items by category
const groupByCategory = (items: typeof mockCourses) => {
  const categories: Record<string, typeof mockCourses> = {}
  items.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = []
    }
    categories[item.category].push(item)
  })
  return Object.entries(categories).map(([title, data]) => ({ title, data }))
}

const ContentListScreen = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [sections, setSections] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Simulate fetching data from Supabase
    const fetchData = () => {
      setTimeout(() => {
        const groupedData = groupByCategory(mockCourses)
        setSections(groupedData)
        setIsLoading(false)

        // Animate card entrance
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start()
      }, 800)
    }

    fetchData()
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refreshing data
    setTimeout(() => {
      const groupedData = groupByCategory(mockCourses)
      setSections(groupedData)
      setIsRefreshing(false)
    }, 1000)
  }

  // Filter items based on search and category - memoized for performance
  const filteredSections = React.useMemo(() => {
    return sections
      .map((section) => {
        const filteredData = section.data.filter((item: any) => {
          const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
          const matchesFilter = activeFilter === "All" || item.category === activeFilter
          return matchesSearch && matchesFilter
        })
        return { ...section, data: filteredData }
      })
      .filter((section) => section.data.length > 0)
  }, [sections, searchQuery, activeFilter])

  const renderFixedHeader = () => (
    <SafeAreaView className="bg-gray-900 z-10">
      <View className="p-4">
        {/* Search bar */}
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center bg-gray-800 rounded-full px-4 py-2 flex-1">
            <Search color="#B3B3B3" size={20} />
            <TextInput
              placeholder="Search courses..."
              placeholderTextColor="#B3B3B3"
              className="flex-1 text-white ml-2"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filter buttons */}
        <View className="flex-row mb-2">
          {["All", "Voice Training", "Relaxation", "Warmups"].map((filter) => (
            <TouchableOpacity
              key={filter}
              className={`px-4 py-2 rounded-full mr-2 ${
                activeFilter === filter ? "bg-green-500" : "bg-gray-800"
              }`}
              onPress={() => setActiveFilter(filter)}
            >
              <Text className={`${activeFilter === filter ? "text-white" : "text-gray-300"}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )

  const renderListHeader = () => (
    <View className="bg-gray-900 p-4 pt-2">
      {/* Section header */}
      <Text className="text-white text-2xl font-bold mb-2">Your Learning Journey</Text>
      <Text className="text-gray-400 mb-4">Continue where you left off</Text>
    </View>
  )

  const renderCourseItem = ({ item }: { item: any }) => (
    <View className="bg-gray-800 rounded-2xl mb-4 overflow-hidden mx-4">
      <View className="flex-row p-4">
        <View className="bg-gray-700 rounded-xl w-16 h-16 items-center justify-center mr-4">
          <Mic color="#1ED760" size={24} />
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-lg">{item.title}</Text>
          <Text className="text-gray-400">{item.duration}</Text>
        </View>
        <View className="flex-row items-center">
          {item.isPurchased ? (
            <TouchableOpacity
              className="bg-green-500 rounded-full p-2"
              onPress={() =>
                router.push({
                  pathname: "/player",
                  params: {
                    id: item.id,
                    title: item.title,
                    duration: item.duration,
                    imageUrl: item.imageUrl,
                    isPurchased: "true",
                  },
                })
              }
            >
              <Play color="white" size={16} />
            </TouchableOpacity>
          ) : (
            <View className="items-center">
              <TouchableOpacity
                className="bg-blue-500 rounded-full px-3 py-1 mb-1"
                onPress={() =>
                  router.push({
                    pathname: "/payment",
                    params: {
                      title: item.title,
                      price: item.price.toString(),
                      type: "Course",
                      duration: item.duration,
                    },
                  })
                }
              >
                <Text className="text-white text-xs font-bold">${item.price}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Unlock color="#B3B3B3" size={16} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  )

  const renderSectionHeader = ({ section }: { section: any }) => (
    <Text className="text-white text-xl font-bold mt-6 mb-3 px-4">{section.title}</Text>
  )

  return (
    <View className="flex-1 bg-gray-900">
      {/* Fixed Header */}
      {renderFixedHeader()}

      {/* Scrollable Content */}
      <SectionList
        sections={filteredSections}
        renderItem={renderCourseItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderListHeader}
        className="flex-1"
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  )
}

export default ContentListScreen

import BottomNavigation from "@/components/BottomNavigation"
import { Slider } from "@/components/ui/slider"
import {
  Clock,
  Download,
  Heart,
  Pause,
  Play,
  Settings,
  Share2,
  SkipBack,
  SkipForward,
  User,
} from "lucide-react-native"
import React, { useEffect, useState } from "react"
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"

const { width } = Dimensions.get("window")

// Mock data for audio content
const audioContent = {
  id: "1",
  title: "Breathing Techniques for Better Voice Control",
  instructor: "Juliana Rodrigues",
  duration: "12:45",
  description:
    "Master proper breathing techniques to enhance your vocal performance and maintain consistency during long sessions.",
  category: "Voice Control",
  isPremium: true,
  imageUrl:
    "https://images.unsplash.com/photo-1718947109846-f19c3fe3062e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE11c2ljJTIwYmFuZCUyMHBlcmZvcm1hbmNlfGVufDB8fDB8fHww",
  audioUrl: "https://example.com/audio/breathing-techniques.mp3",
  progress: 3.5, // minutes played
}

export default function AudioPlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(3.5 * 60) // in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
  const [isLiked, setIsLiked] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const totalTime = 12 * 60 + 45 // 12:45 in seconds
  const progressPercentage = (currentTime / totalTime) * 100

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Handle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  // Handle seeking
  const handleSeek = (value: number) => {
    setCurrentTime(value * totalTime)
  }

  // Handle speed change
  const changeSpeed = () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]
    const currentIndex = speeds.indexOf(playbackSpeed)
    const nextIndex = (currentIndex + 1) % speeds.length
    setPlaybackSpeed(speeds[nextIndex])
  }

  // Simulate playback progress
  useEffect(() => {
    let interval: number | null = null

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalTime) {
            setIsPlaying(false)
            return totalTime
          }
          return prev + 1
        })
      }, 1000) as unknown as number
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, totalTime])

  return (
    <View className="flex-1 bg-gray-900">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 pt-12 pb-4 bg-gray-800">
          <Text className="text-white text-lg font-bold">Now Playing</Text>
          <TouchableOpacity>
            <Settings size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Album Art */}
        <View className="items-center py-8">
          <Image
            source={{ uri: audioContent.imageUrl }}
            className="w-64 h-64 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        {/* Content Info */}
        <View className="px-6">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold">{audioContent.title}</Text>
              <View className="flex-row items-center mt-2">
                <User size={16} color="#B3B3B3" />
                <Text className="text-gray-400 ml-2">{audioContent.instructor}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
              <Heart
                size={24}
                color={isLiked ? "#1ED760" : "#B3B3B3"}
                fill={isLiked ? "#1ED760" : "none"}
              />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-400 mt-4">{audioContent.description}</Text>

          <View className="flex-row items-center mt-4">
            <View className="bg-green-500 px-2 py-1 rounded">
              <Text className="text-white text-xs font-bold">PREMIUM</Text>
            </View>
            <Text className="text-gray-400 ml-3">{audioContent.category}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400">{formatTime(currentTime)}</Text>
            <Text className="text-gray-400">{formatTime(totalTime)}</Text>
          </View>
          <Slider
            style={{ width: width - 48, height: 40 }}
            minValue={0}
            maxValue={1}
            value={progressPercentage / 100}
            onChange={(value) => handleSeek(value)}
          />
        </View>

        {/* Controls */}
        <View className="items-center mt-6">
          {/* Playback Speed */}
          <TouchableOpacity onPress={changeSpeed} className="flex-row items-center mb-6">
            <Clock size={16} color="#B3B3B3" />
            <Text className="text-gray-400 ml-2">{playbackSpeed}x</Text>
          </TouchableOpacity>

          {/* Main Controls */}
          <View className="flex-row items-center justify-center">
            <TouchableOpacity className="mx-4">
              <SkipBack size={32} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-green-500 rounded-full w-16 h-16 items-center justify-center mx-4"
              onPress={togglePlayback}
            >
              {isPlaying ? <Pause size={32} color="#000000" /> : <Play size={32} color="#000000" />}
            </TouchableOpacity>

            <TouchableOpacity className="mx-4">
              <SkipForward size={32} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Download and Share */}
        <View className="flex-row justify-around mt-10 px-6">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setDownloaded(!downloaded)}
          >
            <Download size={24} color={downloaded ? "#1ED760" : "#FFFFFF"} />
            <Text className="text-white ml-2">{downloaded ? "Downloaded" : "Download"}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <Share2 size={24} color="#FFFFFF" />
            <Text className="text-white ml-2">Share</Text>
          </TouchableOpacity>
        </View>

        {/* Subscription CTA */}
        <View className="mt-8 mx-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <Text className="text-white text-center font-bold text-lg">
            Unlock All Premium Content
          </Text>
          <Text className="text-white text-center mt-2">
            Subscribe for $50/month to access all courses and podcasts
          </Text>
          <TouchableOpacity className="mt-4 bg-white py-3 rounded-lg items-center">
            <Text className="text-blue-600 font-bold">Subscribe Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  )
}

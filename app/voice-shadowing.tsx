import { ArrowLeft, Music, Pause, Play, SkipForward, Trophy } from "lucide-react-native"
import React, { useEffect, useState } from "react"
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Slider,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const { width } = Dimensions.get("window")

// Mock data for tracks
const mockTracks = [
  {
    id: "1",
    title: "Empty Spaces",
    artist: "Freddie Mercury",
    imageUrl:
      "https://images.unsplash.com/photo-1487954335942-047e6d1551ee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q29uY2VydCUyMG11c2ljJTIwcGVyZm9ybWFuY2V8ZW58MHx8MHx8fDA%3D",
    phrases: [
      { id: "1-1", text: "What is this feeling", start: 0, end: 3 },
      { id: "1-2", text: "So near and yet so far", start: 3, end: 6 },
      { id: "1-3", text: "No matter what I do", start: 6, end: 9 },
      { id: "1-4", text: "I feel like I'm going to", start: 9, end: 12 },
    ],
  },
  {
    id: "2",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    imageUrl:
      "https://images.unsplash.com/photo-1542844985-d6ee1fc9b891?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TXVzaWMlMjBjbGFzcyUyMHBlcmZvcm1hbmNlfGVufDB8fDB8fHww",
    phrases: [
      { id: "2-1", text: "Is this the real life", start: 0, end: 3 },
      { id: "2-2", text: "Is this just fantasy", start: 3, end: 6 },
      { id: "2-3", text: "Caught in a landslide", start: 6, end: 9 },
    ],
  },
  {
    id: "3",
    title: "Somebody to Love",
    artist: "Queen",
    imageUrl:
      "https://images.unsplash.com/photo-1718947109846-f19c3fe3062e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE11c2ljJTIwYmFuZCUyMHBlcmZvcm1hbmNlfGVufDB8fDB8fHww",
    phrases: [
      { id: "3-1", text: "Can anybody find me", start: 0, end: 3 },
      { id: "3-2", text: "Somebody to love", start: 3, end: 6 },
    ],
  },
]

// Mock AI scoring function
const calculateAIScore = (phrase: string) => {
  // Simulate AI scoring with some randomness
  const baseScore = 70 + Math.floor(Math.random() * 30)
  return baseScore
}

export default function VoiceShadowingScreen() {
  const [selectedTrack, setSelectedTrack] = useState(mockTracks[0])
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(0) // -12 to +12 semitones
  const [repeatMode, setRepeatMode] = useState(1) // 1x, 2x, 3x
  const [aiScore, setAiScore] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")
  const [pointsEarned, setPointsEarned] = useState(0)
  const [pulseAnim] = useState(new Animated.Value(1))

  const currentPhrase = selectedTrack.phrases[currentPhraseIndex]

  // Start pulse animation for play button
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    } else {
      pulseAnim.setValue(1)
    }
  }, [isPlaying])

  // Handle play/pause
  const togglePlayback = () => {
    if (isRecording) {
      // Stop recording and calculate score
      setIsRecording(false)
      const score = calculateAIScore(currentPhrase.text)
      setAiScore(score)

      // Generate feedback text based on score
      let feedback = ""
      if (score >= 90) {
        feedback = "Excellent! Perfect match!"
      } else if (score >= 80) {
        feedback = "Great job! Very close!"
      } else if (score >= 70) {
        feedback = "Good effort! Keep practicing!"
      } else {
        feedback = "Nice try! Try again for better results."
      }
      setFeedbackText(`${score}/100 - ${feedback}`)

      // Award points based on score
      const points = Math.floor(score / 2)
      setPointsEarned(points)
    } else {
      setIsPlaying(!isPlaying)
      if (!isPlaying) {
        // Start recording simulation
        setIsRecording(true)
        setAiScore(0)
        setFeedbackText("")
        setPointsEarned(0)
      }
    }
  }

  // Skip to next phrase
  const skipToNextPhrase = () => {
    if (currentPhraseIndex < selectedTrack.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1)
    } else {
      // Loop back to first phrase
      setCurrentPhraseIndex(0)
    }
    setIsPlaying(false)
    setIsRecording(false)
    setAiScore(0)
    setFeedbackText("")
    setPointsEarned(0)
  }

  // Skip to chorus (simulated)
  const skipToChorus = () => {
    // For this demo, we'll just go to phrase 2 if it exists
    if (selectedTrack.phrases.length > 2) {
      setCurrentPhraseIndex(2)
    }
    setIsPlaying(false)
    setIsRecording(false)
    setAiScore(0)
    setFeedbackText("")
    setPointsEarned(0)
  }

  // Handle track selection
  const selectTrack = (track: (typeof mockTracks)[0]) => {
    setSelectedTrack(track)
    setCurrentPhraseIndex(0)
    setIsPlaying(false)
    setIsRecording(false)
    setAiScore(0)
    setFeedbackText("")
    setPointsEarned(0)
  }

  // Toggle repeat mode
  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev % 3) + 1)
  }

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center bg-gray-800 pt-12 pb-4 px-4">
        <TouchableOpacity className="mr-3">
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Voice Shadowing</Text>
        <View className="w-6"></View>
      </View>

      <ScrollView className="flex-1 px-4 pb-24">
        {/* Track Info */}
        <View className="items-center mt-6 mb-8">
          <Image
            source={{ uri: selectedTrack.imageUrl }}
            className="w-48 h-48 rounded-2xl mb-4"
            resizeMode="cover"
          />
          <Text className="text-white text-2xl font-bold text-center">{selectedTrack.title}</Text>
          <Text className="text-gray-400 text-lg">{selectedTrack.artist}</Text>
        </View>

        {/* Track Selection */}
        <View className="mb-8">
          <Text className="text-white text-lg font-bold mb-3">Select Track</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-24">
            <View className="flex-row gap-3">
              {mockTracks.map((track) => (
                <TouchableOpacity
                  key={track.id}
                  className={`bg-gray-800 rounded-xl p-3 w-32 ${selectedTrack.id === track.id ? "border-2 border-green-500" : ""}`}
                  onPress={() => selectTrack(track)}
                >
                  <Text className="text-white font-medium text-sm" numberOfLines={1}>
                    {track.title}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>
                    {track.artist}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Current Phrase */}
        <View className="bg-gray-800 rounded-2xl p-6 mb-8">
          <Text className="text-gray-400 text-center mb-2">Current Phrase</Text>
          <Text className="text-white text-2xl font-bold text-center mb-6">
            "{currentPhrase.text}"
          </Text>

          {/* Playback Controls */}
          <View className="items-center mb-6">
            <View className="flex-row items-center justify-center mb-6">
              <TouchableOpacity className="mx-4" onPress={toggleRepeat}>
                <Text className="text-green-500 font-bold">{repeatMode}x</Text>
              </TouchableOpacity>

              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity
                  className="bg-green-500 rounded-full w-16 h-16 items-center justify-center mx-4"
                  onPress={togglePlayback}
                >
                  {isPlaying || isRecording ? (
                    <Pause size={32} color="#000000" />
                  ) : (
                    <Play size={32} color="#000000" />
                  )}
                </TouchableOpacity>
              </Animated.View>

              <TouchableOpacity className="mx-4" onPress={skipToNextPhrase}>
                <SkipForward size={32} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center w-full mb-4">
              <Text className="text-gray-400 mr-2">Pitch:</Text>
              <Slider
                style={{ flex: 1, height: 40 }}
                minimumValue={-12}
                maximumValue={12}
                value={playbackSpeed}
                onValueChange={setPlaybackSpeed}
                minimumTrackTintColor="#1ED760"
                maximumTrackTintColor="#3E3E3E"
                thumbStyle={{ backgroundColor: "#1ED760", width: 16, height: 16, borderRadius: 8 }}
              />
              <Text className="text-white ml-2 w-10 text-center">
                {playbackSpeed > 0 ? `+${playbackSpeed}` : playbackSpeed}
              </Text>
            </View>

            <TouchableOpacity
              className="bg-blue-600 rounded-full px-4 py-2 flex-row items-center"
              onPress={skipToChorus}
            >
              <Music size={16} color="#FFFFFF" />
              <Text className="text-white ml-2">Skip to Chorus</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Feedback Section */}
        {aiScore > 0 && (
          <View className="bg-gray-800 rounded-2xl p-6 mb-8">
            <Text className="text-white text-lg font-bold mb-4 text-center">AI Analysis</Text>

            {/* Score Bar */}
            <View className="mb-4">
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-400">Score</Text>
                <Text className="text-white font-bold">{aiScore}/100</Text>
              </View>
              <View className="h-4 bg-gray-700 rounded-full overflow-hidden">
                <View
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                  style={{ width: `${aiScore}%` }}
                />
              </View>
            </View>

            {/* Feedback Text */}
            <Text className="text-white text-center my-4">{feedbackText}</Text>

            {/* Points Badge */}
            {pointsEarned > 0 && (
              <View className="items-center mt-4">
                <View className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-full px-6 py-3 flex-row items-center">
                  <Trophy size={20} color="#FFFFFF" />
                  <Text className="text-white font-bold ml-2">+{pointsEarned} points</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Practice Tips */}
        <View className="bg-gray-800 rounded-2xl p-6 mb-8">
          <Text className="text-white text-lg font-bold mb-3">Tips for Voice Shadowing</Text>
          <View className="gap-3">
            <View className="flex-row items-start">
              <View className="bg-green-500 rounded-full w-6 h-6 items-center justify-center mt-1">
                <Text className="text-black text-xs font-bold">1</Text>
              </View>
              <Text className="text-gray-300 ml-3 flex-1">
                Listen carefully to the original phrase before attempting to repeat it
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="bg-green-500 rounded-full w-6 h-6 items-center justify-center mt-1">
                <Text className="text-black text-xs font-bold">2</Text>
              </View>
              <Text className="text-gray-300 ml-3 flex-1">
                Match the rhythm, pitch, and tone as closely as possible
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="bg-green-500 rounded-full w-6 h-6 items-center justify-center mt-1">
                <Text className="text-black text-xs font-bold">3</Text>
              </View>
              <Text className="text-gray-300 ml-3 flex-1">
                Practice the same phrase multiple times for better results
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Subscription Banner */}
      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-2xl">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold">Unlock Premium Tracks</Text>
            <Text className="text-gray-200 text-sm">Subscribe for $5/month</Text>
          </View>
          <TouchableOpacity className="bg-white rounded-full px-4 py-2">
            <Text className="text-blue-600 font-bold">Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

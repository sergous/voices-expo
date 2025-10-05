import { useRouter } from "expo-router"
import { Apple, BookOpen, ChevronRight, Mail, Music, Smartphone, User } from "lucide-react-native"
import React, { useEffect, useState } from "react"
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { supabase } from "../supabase/client"

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [fadeAnim] = useState(new Animated.Value(0))
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const router = useRouter()

  // Fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim, currentStep])

  const handleGoalSelect = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal))
    } else {
      setSelectedGoals([...selectedGoals, goal])
    }
  }

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      fadeAnim.setValue(0)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      fadeAnim.setValue(0)
    }
  }

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = isSignUp
        ? await supabase.auth.signUp({
            email,
            password,
          })
        : await supabase.auth.signInWithPassword({
            email,
            password,
          })

      if (error) throw error

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase.from("user_profiles").insert([
          {
            id: data.user.id,
            email: data.user.email!,
            goal: selectedGoals.map((g) => g.toLowerCase()).join(", "),
            subscription_status: "free",
            streak: 0,
          },
        ])

        if (profileError) throw profileError

        router.replace("/dashboard")
      }
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: "apple" | "google") => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: "voices-expo://dashboard",
        },
      })

      if (error) throw error

      // OAuth will redirect the user, profile creation will be handled after redirect
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFinishSetup = async () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name")
      return
    }

    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { error } = await supabase
          .from("user_profiles")
          .update({
            goal: selectedGoals.map((g) => g.toLowerCase()).join(", "),
          })
          .eq("id", user.id)

        if (error) throw error

        router.replace("/dashboard")
      }
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Animated.View style={{ opacity: fadeAnim }} className="flex-1">
            <Text className="text-3xl font-bold text-white text-center mb-2">
              Welcome to Voices
            </Text>
            <Text className="text-gray-300 text-center mb-10">
              Learn from the best vocal coaches
            </Text>

            <View className="flex-1 justify-center">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
                }}
                className="w-full h-64 rounded-2xl mb-10"
                resizeMode="cover"
              />

              <TouchableOpacity
                onPress={handleContinue}
                className="bg-[#1ED760] py-4 rounded-xl flex-row items-center justify-center mb-4"
              >
                <Text className="text-white font-bold text-lg">Get Started</Text>
                <ChevronRight color="white" size={20} className="ml-2" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )
      case 1:
        return (
          <Animated.View style={{ opacity: fadeAnim }} className="flex-1">
            <Text className="text-3xl font-bold text-white text-center mb-2">
              {isSignUp ? "Create Account" : "Log In"}
            </Text>
            <Text className="text-gray-300 text-center mb-10">Join our community of learners</Text>

            <View className="flex-1">
              {/* Email/Password Form */}
              <View className="mb-6">
                <TextInput
                  className="bg-gray-800 text-white p-4 rounded-xl mb-4"
                  placeholder="Email"
                  placeholderTextColor="#B3B3B3"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  className="bg-gray-800 text-white p-4 rounded-xl"
                  placeholder="Password"
                  placeholderTextColor="#B3B3B3"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                onPress={handleEmailAuth}
                disabled={isLoading}
                className="bg-[#1ED760] py-4 rounded-xl flex-row items-center justify-center mb-4"
              >
                <Mail color="white" size={24} className="mr-3" />
                <Text className="text-white font-bold text-lg">
                  {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleOAuthLogin("apple")}
                disabled={isLoading}
                className="bg-white py-4 rounded-xl flex-row items-center justify-center mb-4"
              >
                <Apple color="#1ED760" size={24} className="mr-3" />
                <Text className="text-black font-bold text-lg">Continue with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleOAuthLogin("google")}
                disabled={isLoading}
                className="bg-white py-4 rounded-xl flex-row items-center justify-center mb-4"
              >
                <Smartphone color="#1ED760" size={24} className="mr-3" />
                <Text className="text-black font-bold text-lg">Continue with Google</Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center mt-8">
                <Text className="text-gray-400">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </Text>
                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                  <Text className="text-[#1ED760] font-bold ml-2">
                    {isSignUp ? "Log In" : "Sign Up"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )
      case 2:
        return (
          <Animated.View style={{ opacity: fadeAnim }} className="flex-1">
            <Text className="text-3xl font-bold text-white text-center mb-2">
              What are your goals?
            </Text>
            <Text className="text-gray-300 text-center mb-10">
              Select what you're interested in learning
            </Text>

            <View className="flex-1">
              <TouchableOpacity
                onPress={() => handleGoalSelect("Podcasts")}
                className={`border-2 rounded-2xl p-6 mb-6 ${selectedGoals.includes("Podcasts") ? "border-[#1ED760] bg-[#1ED760]/10" : "border-gray-700"}`}
              >
                <View className="flex-row items-center">
                  <Music
                    color={selectedGoals.includes("Podcasts") ? "#1ED760" : "#B3B3B3"}
                    size={32}
                  />
                  <Text
                    className={`text-xl font-bold ml-4 ${selectedGoals.includes("Podcasts") ? "text-white" : "text-gray-300"}`}
                  >
                    Podcasts
                  </Text>
                </View>
                <Text className="text-gray-400 mt-2 ml-12">Listen to expert discussions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleGoalSelect("Courses")}
                className={`border-2 rounded-2xl p-6 mb-6 ${selectedGoals.includes("Courses") ? "border-[#1ED760] bg-[#1ED760]/10" : "border-gray-700"}`}
              >
                <View className="flex-row items-center">
                  <BookOpen
                    color={selectedGoals.includes("Courses") ? "#1ED760" : "#B3B3B3"}
                    size={32}
                  />
                  <Text
                    className={`text-xl font-bold ml-4 ${selectedGoals.includes("Courses") ? "text-white" : "text-gray-300"}`}
                  >
                    Courses
                  </Text>
                </View>
                <Text className="text-gray-400 mt-2 ml-12">Structured learning programs</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleGoalSelect("Shadowing")}
                className={`border-2 rounded-2xl p-6 mb-6 ${selectedGoals.includes("Shadowing") ? "border-[#1ED760] bg-[#1ED760]/10" : "border-gray-700"}`}
              >
                <View className="flex-row items-center">
                  <User
                    color={selectedGoals.includes("Shadowing") ? "#1ED760" : "#B3B3B3"}
                    size={32}
                  />
                  <Text
                    className={`text-xl font-bold ml-4 ${selectedGoals.includes("Shadowing") ? "text-white" : "text-gray-300"}`}
                  >
                    Shadowing
                  </Text>
                </View>
                <Text className="text-gray-400 mt-2 ml-12">Practice with voice tracks</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleGoalSelect("Analysis")}
                className={`border-2 rounded-2xl p-6 mb-6 ${selectedGoals.includes("Analysis") ? "border-[#1ED760] bg-[#1ED760]/10" : "border-gray-700"}`}
              >
                <View className="flex-row items-center">
                  <Music
                    color={selectedGoals.includes("Analysis") ? "#1ED760" : "#B3B3B3"}
                    size={32}
                  />
                  <Text
                    className={`text-xl font-bold ml-4 ${selectedGoals.includes("Analysis") ? "text-white" : "text-gray-300"}`}
                  >
                    Analysis
                  </Text>
                </View>
                <Text className="text-gray-400 mt-2 ml-12">Voice analysis and feedback</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleContinue}
                className={`py-4 rounded-xl flex-row items-center justify-center mt-8 ${selectedGoals.length > 0 ? "bg-[#1ED760]" : "bg-gray-700"}`}
                disabled={selectedGoals.length === 0}
              >
                <Text className="text-white font-bold text-lg">Continue</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )
      case 3:
        return (
          <Animated.View style={{ opacity: fadeAnim }} className="flex-1">
            <Text className="text-3xl font-bold text-white text-center mb-2">Complete Profile</Text>
            <Text className="text-gray-300 text-center mb-10">Personalize your experience</Text>

            <View className="flex-1">
              <View className="items-center mb-8">
                <View className="w-24 h-24 rounded-full bg-gray-700 items-center justify-center mb-4">
                  <User color="#B3B3B3" size={48} />
                </View>
                <TouchableOpacity>
                  <Text className="text-[#1ED760] font-bold">Add Profile Photo</Text>
                </TouchableOpacity>
              </View>

              <View className="bg-gray-800 rounded-xl p-4 mb-6">
                <Text className="text-gray-400 mb-2">Full Name</Text>
                <TextInput
                  className="text-white text-lg"
                  placeholder="Enter your full name"
                  placeholderTextColor="#B3B3B3"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View className="bg-gray-800 rounded-xl p-4 mb-6">
                <Text className="text-gray-400 mb-2">Email</Text>
                <Text className="text-white text-lg">{email}</Text>
              </View>

              <TouchableOpacity
                onPress={handleFinishSetup}
                disabled={isLoading}
                className="bg-[#1ED760] py-4 rounded-xl flex-row items-center justify-center mt-8"
              >
                <Text className="text-white font-bold text-lg">
                  {isLoading ? "Loading..." : "Finish Setup"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )
      default:
        return null
    }
  }

  return (
    <View className="flex-1 bg-[#121212] p-6 pt-16">
      {/* Progress indicator */}
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity onPress={handleBack} disabled={currentStep === 0}>
          <Text className={`text-lg ${currentStep === 0 ? "text-gray-600" : "text-white"}`}>
            Back
          </Text>
        </TouchableOpacity>

        <View className="flex-row">
          {[0, 1, 2, 3].map((step) => (
            <View
              key={step}
              className={`h-2 rounded-full mx-1 ${currentStep >= step ? "w-8 bg-[#1ED760]" : "w-2 bg-gray-700"}`}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleContinue} disabled={currentStep === 3}>
          <Text className="text-lg text-[#1ED760]">Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="pb-24">
        {renderStep()}
      </ScrollView>
    </View>
  )
}

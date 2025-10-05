import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Vibration, Dimensions } from 'react-native';
import { Microphone, ArrowLeft } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

// Mock data for voice analysis
const mockAnalysisResults = {
  voiceAge: 35,
  tension: 20,
  influence: 80,
  comparison: "Like Oprah!",
  exercise: "Try this meeting script: 'Good morning team, today we'll be discussing our quarterly goals and how we can exceed expectations together.' Focus on clear enunciation and confident tone."
};

// Screen dimensions for responsive design
const { width } = Dimensions.get('window');

export default function VoiceAnalysisScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [results, setResults] = useState<typeof mockAnalysisResults | null>(null);
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const voiceAgeValue = useRef(new Animated.Value(0)).current;
  const tensionValue = useRef(new Animated.Value(0)).current;
  const influenceValue = useRef(new Animated.Value(0)).current;

  // Start pulse animation for microphone (0.5s cycle)
  const startPulseAnimation = () => {
    pulseAnimation.setValue(1);
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Start scale animation for premium button
  const startButtonScale = () => {
    Animated.timing(scaleAnimation, {
      toValue: 1.05,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  // Handle recording simulation
  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      startPulseAnimation();
      
      // Simulate recording for 5 seconds
      setTimeout(() => {
        setIsRecording(false);
        pulseAnimation.stopAnimation();
        performAnalysis();
      }, 5000);
    }
  };

  // Simulate AI voice analysis
  const performAnalysis = () => {
    // Vibrate to indicate recording complete
    Vibration.vibrate(500);
    
    // Show loading state briefly
    setTimeout(() => {
      setResults(mockAnalysisResults);
      setAnalysisComplete(true);
      
      // Start count-up animations (0.3s duration)
      Animated.parallel([
        Animated.timing(voiceAgeValue, {
          toValue: mockAnalysisResults.voiceAge,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(tensionValue, {
          toValue: mockAnalysisResults.tension,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(influenceValue, {
          toValue: mockAnalysisResults.influence,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }, 1500);
  };

  // Reset analysis to start over
  const resetAnalysis = () => {
    setAnalysisComplete(false);
    setResults(null);
    voiceAgeValue.setValue(0);
    tensionValue.setValue(0);
    influenceValue.setValue(0);
  };

  // Navigate to payment screen (placeholder for now)
  const navigateToPayment = () => {
    startButtonScale();
    console.log("Navigate to payment screen");
    // In a real app with navigation, this would be:
    // navigation.navigate('Payment');
  };

  return (
    <View className="flex-1 bg-gray-900 p-4 pt-12">
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity className="p-2 mr-4">
          <ArrowLeft size={28} color="#1ED760" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Voice Analysis</Text>
      </View>

      {/* Main Content */}
      <View className="flex-1">
        {!analysisComplete ? (
          <View className="flex-1 items-center justify-center">
            {/* Center: Large TouchableOpacity with mic pulse animation */}
            <TouchableOpacity 
              onPress={handleRecord}
              disabled={isRecording}
              className={`items-center justify-center rounded-full mb-8 ${isRecording ? 'bg-red-500' : 'bg-[#1ED760]'}`}
              style={[styles.recordButton, { 
                width: 120, 
                height: 120,
                transform: [{ scale: pulseAnimation }]
              }]}
            >
              <Microphone 
                size={56} 
                color="white" 
                strokeWidth={1.5} 
              />
              {isRecording && (
                <View className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full items-center justify-center">
                  <View className="w-3 h-3 bg-white rounded-full" />
                </View>
              )}
            </TouchableOpacity>
            
            <Text className="text-white text-xl mb-2">
              {isRecording ? "Recording..." : "Speak a Phrase"}
            </Text>
            <Text className="text-gray-400 text-center mb-6">
              {isRecording 
                ? "Speak naturally for 5 seconds" 
                : "Tap the button to start recording"}
            </Text>
            
            {/* Instructions */}
            <View className="bg-gray-800 rounded-2xl p-4 mt-4">
              <Text className="text-white font-bold mb-2">Tips for best results:</Text>
              <Text className="text-gray-300 text-sm mb-1">• Speak in a normal, conversational tone</Text>
              <Text className="text-gray-300 text-sm mb-1">• Find a quiet environment</Text>
              <Text className="text-gray-300 text-sm">• Record for the full 5 seconds</Text>
            </View>
          </View>
        ) : (
          <View className="flex-1">
            {/* Analysis Results */}
            <View className="flex-1">
              <Text className="text-white text-xl font-bold text-center mb-6">Your Voice Report</Text>
              
              {/* Voice Age */}
              <View className="bg-gray-800 rounded-2xl p-4 mb-4">
                <Text className="text-gray-400 mb-2">Voice Age</Text>
                <Text className="text-white text-4xl font-bold">
                  <Animated.Text>
                    {voiceAgeValue.interpolate({
                      inputRange: [0, mockAnalysisResults.voiceAge],
                      outputRange: ['0', `${mockAnalysisResults.voiceAge}`],
                      extrapolate: 'clamp'
                    }).__getValue().toFixed(0)}
                  </Animated.Text>
                </Text>
              </View>
              
              {/* Tension */}
              <View className="bg-gray-800 rounded-2xl p-4 mb-4">
                <Text className="text-gray-400 mb-2">Tension</Text>
                <Text className="text-white text-4xl font-bold">
                  <Animated.Text>
                    {tensionValue.interpolate({
                      inputRange: [0, mockAnalysisResults.tension],
                      outputRange: ['0', `${mockAnalysisResults.tension}`],
                      extrapolate: 'clamp'
                    }).__getValue().toFixed(0)}%
                  </Animated.Text>
                </Text>
              </View>
              
              {/* Influence */}
              <View className="bg-gray-800 rounded-2xl p-4 mb-4">
                <Text className="text-gray-400 mb-2">Influence</Text>
                <Text className="text-white text-4xl font-bold">
                  <Animated.Text>
                    {influenceValue.interpolate({
                      inputRange: [0, mockAnalysisResults.influence],
                      outputRange: ['0', `${mockAnalysisResults.influence}`],
                      extrapolate: 'clamp'
                    }).__getValue().toFixed(0)}/100
                  </Animated.Text>
                </Text>
              </View>
              
              {/* Comparison */}
              <View className="bg-blue-900/30 rounded-2xl p-4 mb-4">
                <Text className="text-blue-300 italic text-center text-lg">
                  "{results?.comparison}"
                </Text>
              </View>
              
              {/* Exercise Recommendation */}
              <View className="bg-gray-800 rounded-2xl p-4 mb-6">
                <Text className="text-white text-xl font-bold mb-3">Exercise Suggestion</Text>
                <Text className="text-gray-300">
                  {results?.exercise}
                </Text>
              </View>
              
              {/* Action Buttons */}
              <View className="flex-row gap-4 mb-6">
                <TouchableOpacity 
                  onPress={resetAnalysis}
                  className="flex-1 bg-gray-800 rounded-xl p-4 items-center"
                >
                  <Text className="text-white text-lg font-bold">Re-analyze</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
      
      {/* Bottom: Premium CTA Button */}
      <TouchableOpacity 
        className="bg-[#2D5BFF] rounded-xl p-4 items-center mt-4"
        onPress={navigateToPayment}
        activeOpacity={0.8}
        style={{ transform: [{ scale: scaleAnimation }] }}
      >
        <Text className="text-white text-lg font-bold">
          Unlock Premium Analysis: $10/month
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  recordButton: {
    shadowColor: '#1ED760',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  }
});

// Add cssInterop for any components that need className support
cssInterop(Microphone, {
  className: 'style',
});
cssInterop(ArrowLeft, {
  className: 'style',
});
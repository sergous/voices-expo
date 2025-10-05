import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Play, Download, Mic, Lock, User, Home, Search, Library, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data for podcasts and courses
const mockContent = [
  {
    id: '1',
    title: 'Foundations of Vocal Power',
    type: 'podcast',
    duration: '42 min',
    price: 2,
    isPurchased: false,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '2',
    title: 'Breath Control Mastery',
    type: 'course',
    duration: '8 lessons',
    price: 2,
    isPurchased: true,
    imageUrl: 'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '3',
    title: 'Vocal Range Expansion',
    type: 'podcast',
    duration: '38 min',
    price: 2,
    isPurchased: false,
    imageUrl: 'https://images.unsplash.com/photo-1515073838964-4d4d56a58b21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3R1ZGVudCUyMGxlYXJuZXIlMjBwdXBpbCUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '4',
    title: 'Emotional Expression in Song',
    type: 'course',
    duration: '12 lessons',
    price: 2,
    isPurchased: false,
    imageUrl: 'https://images.unsplash.com/photo-1590098563686-06ab8778a6a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl0Y2glMjBkZWNrfGVufDB8fDB8fHww',
  },
];

const subscriptionPlans = [
  { id: 'monthly', name: 'Monthly', price: 50, description: 'Full access to all content' },
  { id: 'annual', name: 'Annual', price: 500, description: 'Save 20% with annual plan' },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="bg-gray-900 pt-12 pb-4 px-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-2xl font-bold">Voices</Text>
            <Text className="text-green-400 text-sm">Vocal Training with Juliana</Text>
          </View>
          <TouchableOpacity className="bg-gray-800 rounded-full p-2">
            <User color="#1ED760" size={24} />
          </TouchableOpacity>
        </View>
        
        {/* Subscription Banner */}
        {!isSubscribed && (
          <View className="mt-4 bg-gradient-to-r from-green-700 to-blue-700 rounded-xl p-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold text-lg">Unlock All Content</Text>
                <Text className="text-gray-200 text-sm">Subscribe for $50/month</Text>
              </View>
              <TouchableOpacity 
                className="bg-white rounded-full px-4 py-2"
                onPress={() => setIsSubscribed(true)}
              >
                <Text className="text-green-700 font-bold">Subscribe</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-4 pb-20">
        {/* Greeting */}
        <View className="mt-6 mb-6">
          <Text className="text-white text-2xl font-bold">Good morning, Alex</Text>
          <Text className="text-gray-400">Ready to improve your voice today?</Text>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Categories</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="bg-gray-800 rounded-2xl px-4 py-3 flex-1 items-center">
              <Mic color="#1ED760" size={20} />
              <Text className="text-white mt-1">Podcasts</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 rounded-2xl px-4 py-3 flex-1 items-center">
              <Library color="#1ED760" size={20} />
              <Text className="text-white mt-1">Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-800 rounded-2xl px-4 py-3 flex-1 items-center">
              <Star color="#1ED760" size={20} />
              <Text className="text-white mt-1">Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Learning */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Continue Learning</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-40">
            <View className="flex-row gap-4">
              <View className="bg-gray-800 rounded-2xl p-4 w-64">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white font-bold">Breath Control Mastery</Text>
                    <Text className="text-gray-400 text-sm">Lesson 3 of 8</Text>
                  </View>
                  <TouchableOpacity className="bg-green-600 rounded-full p-2">
                    <Play color="white" size={16} />
                  </TouchableOpacity>
                </View>
                <View className="mt-3 h-2 bg-gray-700 rounded-full">
                  <View className="h-2 bg-green-500 rounded-full w-3/4"></View>
                </View>
              </View>
              
              <View className="bg-gray-800 rounded-2xl p-4 w-64">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-white font-bold">Vocal Warmups</Text>
                    <Text className="text-gray-400 text-sm">Not started</Text>
                  </View>
                  <TouchableOpacity className="bg-gray-700 rounded-full p-2">
                    <Play color="white" size={16} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Featured Content */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Featured Content</Text>
          <View className="gap-4">
            {mockContent.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                className="bg-gray-800 rounded-2xl overflow-hidden"
              >
                <View className="flex-row">
                  <Image 
                    source={{ uri: item.imageUrl }} 
                    className="w-24 h-24 rounded-l-2xl"
                  />
                  <View className="flex-1 p-3 justify-between">
                    <View>
                      <Text className="text-white font-bold">{item.title}</Text>
                      <Text className="text-gray-400 text-sm">{item.duration}</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        {item.isPurchased ? (
                          <TouchableOpacity className="bg-green-600 rounded-full p-2">
                            <Play color="white" size={16} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity className="bg-blue-600 rounded-full px-3 py-1 flex-row items-center">
                            <Lock color="white" size={14} />
                            <Text className="text-white text-sm ml-1">${item.price}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <TouchableOpacity className="bg-gray-700 rounded-full p-2">
                        <Download color="white" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <View className="flex-row justify-around py-3">
          <TouchableOpacity 
            className={`items-center px-4 py-2 rounded-full ${activeTab === 'home' ? 'bg-gray-800' : ''}`}
            onPress={() => setActiveTab('home')}
          >
            <Home color={activeTab === 'home' ? '#1ED760' : '#9CA3AF'} size={24} />
            <Text className={`text-xs mt-1 ${activeTab === 'home' ? 'text-green-400' : 'text-gray-400'}`}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`items-center px-4 py-2 rounded-full ${activeTab === 'search' ? 'bg-gray-800' : ''}`}
            onPress={() => setActiveTab('search')}
          >
            <Search color={activeTab === 'search' ? '#1ED760' : '#9CA3AF'} size={24} />
            <Text className={`text-xs mt-1 ${activeTab === 'search' ? 'text-green-400' : 'text-gray-400'}`}>Search</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`items-center px-4 py-2 rounded-full ${activeTab === 'library' ? 'bg-gray-800' : ''}`}
            onPress={() => setActiveTab('library')}
          >
            <Library color={activeTab === 'library' ? '#1ED760' : '#9CA3AF'} size={24} />
            <Text className={`text-xs mt-1 ${activeTab === 'library' ? 'text-green-400' : 'text-gray-400'}`}>Library</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`items-center px-4 py-2 rounded-full ${activeTab === 'profile' ? 'bg-gray-800' : ''}`}
            onPress={() => setActiveTab('profile')}
          >
            <User color={activeTab === 'profile' ? '#1ED760' : '#9CA3AF'} size={24} />
            <Text className={`text-xs mt-1 ${activeTab === 'profile' ? 'text-green-400' : 'text-gray-400'}`}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
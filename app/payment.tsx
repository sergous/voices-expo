import { router, useLocalSearchParams } from "expo-router"
import { ArrowLeft, CheckCircle, CreditCard, Lock, Shield, Smartphone } from "lucide-react-native"
import React, { useState } from "react"
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [name, setName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Get item details from navigation params
  const params = useLocalSearchParams()
  const itemTitle = (params.title as string) || "Premium Content"
  const itemPrice = (params.price as string) || "2.00"
  const itemType = (params.type as string) || "Content"
  const itemDuration = (params.duration as string) || ""

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/)
    if (match) {
      const parts = []
      if (match[1]) parts.push(match[1])
      if (match[2]) parts.push(match[2])
      if (match[3]) parts.push(match[3])
      if (match[4]) parts.push(match[4])
      return parts.join(" ")
    }
    return text
  }

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, "")
    if (cleaned.length >= 3) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`
    }
    return cleaned
  }

  const handlePayment = () => {
    if (!cardNumber || !expiry || !cvv || !name) {
      Alert.alert("Error", "Please fill in all payment details")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      Alert.alert("Payment Successful", "Your payment has been processed successfully!", [
        { text: "OK" },
      ])
    }, 2000)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900" edges={["top", "bottom"]}>
      {/* Header with Back Button */}
      <View className="bg-gray-800 px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity className="p-2 mr-3" onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white text-xl font-bold text-center">Secure Checkout</Text>
            <Text className="text-gray-400 text-center text-sm mt-1">Powered by Stripe</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Security Banner */}
        <View className="bg-blue-900/30 border border-blue-700 rounded-xl p-3 flex-row items-center mb-6">
          <Shield color="#3b82f6" size={20} />
          <Text className="text-blue-300 ml-2 text-sm">256-bit SSL encryption</Text>
        </View>

        {/* Order Summary */}
        <View className="bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-bold mb-3">Order Summary</Text>

          <View className="mb-3">
            <Text className="text-white font-medium">{itemTitle}</Text>
            <Text className="text-gray-400 text-sm">
              {itemType} • {itemDuration}
            </Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-white">${itemPrice}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400">Tax</Text>
            <Text className="text-white">${(parseFloat(itemPrice) * 0.07).toFixed(2)}</Text>
          </View>

          <View className="border-t border-gray-700 my-2" />

          <View className="flex-row justify-between">
            <Text className="text-white font-bold">Total</Text>
            <Text className="text-white font-bold">
              ${(parseFloat(itemPrice) * 1.07).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Payment Form */}
        <View className="bg-gray-800 rounded-xl p-4 mb-6">
          <Text className="text-white text-lg font-bold mb-4">Payment Details</Text>

          {/* Card Number */}
          <View className="mb-4">
            <Text className="text-gray-400 text-sm mb-1">Card Number</Text>
            <View className="flex-row items-center bg-gray-700 rounded-lg px-3">
              <CreditCard color="#9CA3AF" size={20} />
              <TextInput
                className="flex-1 text-white py-3 px-2"
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#9CA3AF"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
          </View>

          {/* Expiry & CVV */}
          <View className="flex-row gap-4 mb-4">
            <View className="flex-1">
              <Text className="text-gray-400 text-sm mb-1">Expiry Date</Text>
              <TextInput
                className="bg-gray-700 rounded-lg text-white py-3 px-3"
                placeholder="MM/YY"
                placeholderTextColor="#9CA3AF"
                value={expiry}
                onChangeText={(text) => setExpiry(formatExpiry(text))}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View className="flex-1">
              <Text className="text-gray-400 text-sm mb-1">CVV</Text>
              <TextInput
                className="bg-gray-700 rounded-lg text-white py-3 px-3"
                placeholder="123"
                placeholderTextColor="#9CA3AF"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>

          {/* Name on Card */}
          <View className="mb-4">
            <Text className="text-gray-400 text-sm mb-1">Name on Card</Text>
            <TextInput
              className="bg-gray-700 rounded-lg text-white py-3 px-3"
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Apple Pay Option */}
          <TouchableOpacity className="bg-black rounded-xl p-3 flex-row items-center justify-center mb-4">
            <Smartphone color="white" size={20} />
            <Text className="text-white font-bold ml-2">Pay with Apple Pay</Text>
          </TouchableOpacity>
        </View>

        {/* Security Features */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-3">Security Features</Text>
          <View className="bg-gray-800 rounded-xl p-4">
            <View className="flex-row items-center mb-3">
              <CheckCircle color="#10B981" size={20} />
              <Text className="text-white ml-2">PCI DSS Compliant</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <CheckCircle color="#10B981" size={20} />
              <Text className="text-white ml-2">Bank-Level Encryption</Text>
            </View>
            <View className="flex-row items-center">
              <CheckCircle color="#10B981" size={20} />
              <Text className="text-white ml-2">3D Secure Authentication</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Payment Button with Safe Area */}
      {/* <SafeAreaView className="bg-gray-900 border-t border-gray-800"> */}
      <View className="p-4">
        <TouchableOpacity
          className="bg-green-500 rounded-xl py-4 flex-row items-center justify-center"
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Lock color="white" size={20} />
              <Text className="text-white font-bold text-lg ml-2">Processing Payment...</Text>
            </>
          ) : (
            <>
              <Lock color="white" size={20} />
              <Text className="text-white font-bold text-lg ml-2">
                Pay ${(parseFloat(itemPrice) * 1.07).toFixed(2)}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

import { View, Text, TextInput, Alert } from 'react-native'
import { useState } from 'react'
import Button from '../../components/common/Button'
import apiClient from '../../services/apiClient'

export default function CreateOrderScreen() {
  const [email, setEmail] = useState('')
  const [productId, setProductId] = useState('')
  const [qty, setQty] = useState('1')

  const createOrder = async () => {
    try {
      await apiClient.post('/orders', {
        billing: { email },
        line_items: [
          { product_id: Number(productId), quantity: Number(qty) }
        ],
      })
      Alert.alert('Success', 'Order created successfully')
    } catch (e) {
      Alert.alert('Error', 'Failed to create order')
    }
  }

  return (
    <View className="p-4 bg-white flex-1">
      <Text className="text-lg font-bold mb-4">Create Order</Text>

      <TextInput
        className="border p-3 rounded mb-3"
        placeholder="Customer Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border p-3 rounded mb-3"
        placeholder="Product ID"
        keyboardType="numeric"
        value={productId}
        onChangeText={setProductId}
      />

      <TextInput
        className="border p-3 rounded mb-3"
        placeholder="Quantity"
        keyboardType="numeric"
        value={qty}
        onChangeText={setQty}
      />

      <Button title="Create Order" onPress={createOrder} />
    </View>
  )
}

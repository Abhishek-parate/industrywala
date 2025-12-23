import { View, Text, TextInput, Alert } from 'react-native'
import { useState } from 'react'
import Button from '../../components/common/Button'
import { saveCredentials } from '../../storage/secureStore'

export default function SettingsScreen() {
  const [key, setKey] = useState('')
  const [secret, setSecret] = useState('')

  const save = async () => {
    await saveCredentials(key, secret)
    Alert.alert('Saved', 'API keys saved securely')
  }

  return (
    <View className="p-4 bg-white flex-1">
      <Text className="text-lg font-bold mb-4">WooCommerce API</Text>

      <TextInput
        placeholder="Consumer Key"
        className="border p-3 rounded mb-3"
        value={key}
        onChangeText={setKey}
      />

      <TextInput
        placeholder="Consumer Secret"
        className="border p-3 rounded mb-3"
        value={secret}
        onChangeText={setSecret}
      />

      <Button title="Save Credentials" onPress={save} />
    </View>
  )
}

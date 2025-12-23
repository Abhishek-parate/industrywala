import { View, ActivityIndicator } from 'react-native'

export default function Loader() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" />
    </View>
  )
}

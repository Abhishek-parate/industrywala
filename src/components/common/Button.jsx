import { TouchableOpacity, Text } from 'react-native'

export default function Button({ title, onPress, variant = 'primary' }) {
  const styles = {
    primary: 'bg-primary',
    danger: 'bg-danger',
    success: 'bg-success'
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${styles[variant]} p-3 rounded-lg`}
    >
      <Text className="text-white text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}

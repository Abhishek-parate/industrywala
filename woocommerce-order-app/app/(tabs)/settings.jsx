import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Fixed Header */}
      <View className="bg-primary-600 pt-12  px-4">
        <Text className="text-3xl font-bold text-white mb-2">Settings</Text>
   
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {/* App Settings */}
          <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
            App Settings
          </Text>
          <View className="bg-white rounded-2xl mb-4 border border-gray-100 overflow-hidden">
            <TouchableOpacity 
              className="px-5 py-4 border-b border-gray-100 flex-row items-center active:bg-gray-50"
              onPress={() => Alert.alert('Notifications', 'Coming soon!')}
            >
              <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">🔔</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-0.5">
                  Notifications
                </Text>
                <Text className="text-xs text-gray-500">Manage notification preferences</Text>
              </View>
              <Text className="text-gray-400 text-xl">›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="px-5 py-4 border-b border-gray-100 flex-row items-center active:bg-gray-50"
              onPress={() => Alert.alert('Theme', 'Coming soon!')}
            >
              <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">🎨</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-0.5">Theme</Text>
                <Text className="text-xs text-gray-500">Light mode</Text>
              </View>
              <Text className="text-gray-400 text-xl">›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="px-5 py-4 flex-row items-center active:bg-gray-50"
              onPress={() => Alert.alert('Language', 'Coming soon!')}
            >
              <View className="w-10 h-10 bg-green-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">🌐</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-0.5">Language</Text>
                <Text className="text-xs text-gray-500">English</Text>
              </View>
              <Text className="text-gray-400 text-xl">›</Text>
            </TouchableOpacity>
          </View>

          {/* Account */}
          <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1 mt-2">
            Account
          </Text>
          <View className="bg-white rounded-2xl mb-4 border border-gray-100 overflow-hidden">
            <TouchableOpacity 
              className="px-5 py-4 border-b border-gray-100 flex-row items-center active:bg-gray-50"
              onPress={() => Alert.alert('API Credentials', 'Configure in app.json')}
            >
              <View className="w-10 h-10 bg-yellow-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">🔑</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-0.5">
                  API Credentials
                </Text>
                <Text className="text-xs text-gray-500">Manage WooCommerce API keys</Text>
              </View>
              <Text className="text-gray-400 text-xl">›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="px-5 py-4 flex-row items-center active:bg-gray-50"
              onPress={() => Alert.alert('Cache Cleared', 'Storage freed successfully!')}
            >
              <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">🗑️</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-0.5">
                  Clear Cache
                </Text>
                <Text className="text-xs text-gray-500">Free up storage space</Text>
              </View>
              <Text className="text-gray-400 text-xl">›</Text>
            </TouchableOpacity>
          </View>

          {/* About */}
          <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1 mt-2">
            About
          </Text>
          <View className="bg-white rounded-2xl mb-4 border border-gray-100 overflow-hidden">
            <View className="px-5 py-4 border-b border-gray-100">
              <Text className="text-xs text-gray-500 mb-1">App Version</Text>
              <Text className="text-base font-semibold text-gray-900">1.0.0</Text>
            </View>

            <TouchableOpacity 
              className="px-5 py-4 border-b border-gray-100 flex-row items-center justify-between active:bg-gray-50"
              onPress={() => Alert.alert('Privacy Policy', 'Coming soon!')}
            >
              <Text className="text-base font-medium text-gray-900">Privacy Policy</Text>
              <Text className="text-gray-400 text-xl">›</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="px-5 py-4 flex-row items-center justify-between active:bg-gray-50"
              onPress={() => Alert.alert('Terms', 'Coming soon!')}
            >
              <Text className="text-base font-medium text-gray-900">Terms of Service</Text>
              <Text className="text-gray-400 text-xl">›</Text>
            </TouchableOpacity>
          </View>

          {/* Danger Zone */}
          <Text className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3 px-1 mt-2">
            Danger Zone
          </Text>
          <View className="bg-white rounded-2xl mb-4 border-2 border-red-200 overflow-hidden">
            <TouchableOpacity 
              className="px-5 py-4 flex-row items-center active:bg-red-50"
              onPress={() => 
                Alert.alert(
                  'Logout',
                  'Are you sure you want to logout?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Logout', style: 'destructive', onPress: () => {} },
                  ]
                )
              }
            >
              <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center mr-3">
                <Text className="text-xl">🚪</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-red-600">Logout</Text>
              </View>
              <Text className="text-red-400 text-xl">›</Text>
            </TouchableOpacity>
          </View>

          <View className="h-6" />
        </View>
      </ScrollView>
    </View>
  );
}

import { Tabs } from 'expo-router';
import { View, Text, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

function TabBarIcon({ focused, iconName, label }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1 : 0.9,
      useNativeDriver: true,
      friction: 8,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      className="flex-1 items-center justify-center py-1 px-2"
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      <View
        className={`items-center justify-center w-14 h-14 rounded-2xl mb-1.5 ${
          focused ? 'bg-primary-50' : 'bg-transparent'
        }`}
      >
        <Ionicons
          name={iconName}
          size={26}
          color={focused ? '#7C3AED' : '#9CA3AF'}
        />
      </View>

      <Text
        className={`text-xs text-center min-w-[60px] ${
          focused ? 'text-primary-600 font-bold' : 'text-gray-500 font-medium'
        }`}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 88 : 70,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 10,
          paddingHorizontal: 16,
          elevation: 16,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.1,
          shadowRadius: 14,
        },
        tabBarShowLabel: false,
      }}
    >
      {/* MAIN TABS */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconName={focused ? 'receipt' : 'receipt-outline'}
              label="Orders"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconName={focused ? 'add-circle' : 'add-circle-outline'}
              label="Create"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              iconName={focused ? 'settings' : 'settings-outline'}
              label="Settings"
            />
          ),
        }}
      />

      {/* DETAIL SCREEN – footer visible, icon hidden */}
      <Tabs.Screen
        name="order/[id]"
        options={{
          href: null, // no tab icon, but still inside Tabs
        }}
      />
    </Tabs>
  );
}

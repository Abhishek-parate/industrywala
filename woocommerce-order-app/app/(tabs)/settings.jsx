import { View, Text, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import Button from '../../components/Button';

export default function SettingsScreen() {
  const [apiInfo, setApiInfo] = useState({
    baseUrl: '',
    consumerKey: '',
  });
  
  useEffect(() => {
    const baseUrl = Constants.expoConfig?.extra?.WOO_BASE_URL || process.env.WOO_BASE_URL || '';
    const key = Constants.expoConfig?.extra?.WOO_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY || '';
    
    setApiInfo({
      baseUrl,
      consumerKey: key ? `${key.substring(0, 8)}...` : 'Not configured',
    });
  }, []);
  
  const openWooCommerceSettings = () => {
    const baseUrl = apiInfo.baseUrl.replace('/wp-json/wc/v3', '');
    Linking.openURL(`${baseUrl}/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys`);
  };
  
  const SettingItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row items-center"
      activeOpacity={0.7}
    >
      <Text className="text-3xl mr-4">{icon}</Text>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
        )}
      </View>
      <Text className="text-gray-400 text-xl">›</Text>
    </TouchableOpacity>
  );
  
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* API Configuration */}
      <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          API Configuration
        </Text>
        
        <View className="mb-3">
          <Text className="text-sm text-gray-500 mb-1">Base URL</Text>
          <Text className="text-base text-gray-800 font-mono">
            {apiInfo.baseUrl || 'Not configured'}
          </Text>
        </View>
        
        <View className="mb-3">
          <Text className="text-sm text-gray-500 mb-1">Consumer Key</Text>
          <Text className="text-base text-gray-800 font-mono">
            {apiInfo.consumerKey}
          </Text>
        </View>
        
        <Button
          title="Manage API Keys"
          variant="outline"
          size="sm"
          onPress={openWooCommerceSettings}
        />
      </View>
      
      {/* App Information */}
      <Text className="text-lg font-bold text-gray-800 mb-3">
        App Information
      </Text>
      
      <SettingItem
        icon="📱"
        title="App Version"
        subtitle="1.0.0"
      />
      
      <SettingItem
        icon="📚"
        title="WooCommerce API Version"
        subtitle="v3"
      />
      
      {/* Support */}
      <Text className="text-lg font-bold text-gray-800 mb-3 mt-6">
        Support
      </Text>
      
      <SettingItem
        icon="📖"
        title="Documentation"
        subtitle="View WooCommerce REST API docs"
        onPress={() => Linking.openURL('https://woocommerce.github.io/woocommerce-rest-api-docs/')}
      />
      
      <SettingItem
        icon="🐛"
        title="Report a Bug"
        subtitle="Help us improve the app"
        onPress={() => Alert.alert('Report Bug', 'Bug reporting feature coming soon')}
      />
      
      {/* Danger Zone */}
      <Text className="text-lg font-bold text-red-600 mb-3 mt-6">
        Danger Zone
      </Text>
      
      <Button
        title="Clear Cache"
        variant="danger"
        onPress={() => Alert.alert('Clear Cache', 'Cache cleared successfully!')}
      />
      
      {/* Footer */}
      <View className="mt-8 mb-4">
        <Text className="text-center text-sm text-gray-500">
          Made with ❤️ for WooCommerce
        </Text>
        <Text className="text-center text-xs text-gray-400 mt-1">
          © 2025 All rights reserved
        </Text>
      </View>
    </ScrollView>
  );
}

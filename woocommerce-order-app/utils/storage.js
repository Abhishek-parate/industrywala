import * as SecureStore from 'expo-secure-store';

// Secure storage for sensitive data
export const secureStorage = {
  // Save data securely
  async setItem(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (error) {
      console.error('Error saving secure data:', error);
      return false;
    }
  },

  // Get secure data
  async getItem(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error retrieving secure data:', error);
      return null;
    }
  },

  // Delete secure data
  async removeItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      console.error('Error deleting secure data:', error);
      return false;
    }
  },
};

// Keys for storage
export const STORAGE_KEYS = {
  WOO_CONSUMER_KEY: 'woo_consumer_key',
  WOO_CONSUMER_SECRET: 'woo_consumer_secret',
  WOO_BASE_URL: 'woo_base_url',
};

import * as SecureStore from 'expo-secure-store';

const KEYS = {
  CONSUMER_KEY: 'woo_consumer_key',
  CONSUMER_SECRET: 'woo_consumer_secret',
  STORE_URL: 'woo_store_url',
};

/**
 * Save WooCommerce credentials securely
 */
export const saveCredentials = async (consumerKey, consumerSecret, storeUrl) => {
  try {
    await SecureStore.setItemAsync(KEYS.CONSUMER_KEY, consumerKey);
    await SecureStore.setItemAsync(KEYS.CONSUMER_SECRET, consumerSecret);
    await SecureStore.setItemAsync(KEYS.STORE_URL, storeUrl);
    return { success: true };
  } catch (error) {
    console.error('Error saving credentials:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get saved WooCommerce credentials
 */
export const getCredentials = async () => {
  try {
    const consumerKey = await SecureStore.getItemAsync(KEYS.CONSUMER_KEY);
    const consumerSecret = await SecureStore.getItemAsync(KEYS.CONSUMER_SECRET);
    const storeUrl = await SecureStore.getItemAsync(KEYS.STORE_URL);
    
    if (!consumerKey || !consumerSecret || !storeUrl) {
      return null;
    }
    
    return { consumerKey, consumerSecret, storeUrl };
  } catch (error) {
    console.error('Error getting credentials:', error);
    return null;
  }
};

/**
 * Clear all saved credentials
 */
export const clearCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync(KEYS.CONSUMER_KEY);
    await SecureStore.deleteItemAsync(KEYS.CONSUMER_SECRET);
    await SecureStore.deleteItemAsync(KEYS.STORE_URL);
    return { success: true };
  } catch (error) {
    console.error('Error clearing credentials:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Check if credentials are configured
 */
export const hasCredentials = async () => {
  const credentials = await getCredentials();
  return credentials !== null;
};

import * as SecureStore from 'expo-secure-store'

const KEY_NAME = 'woo_credentials'

export async function saveCredentials(key, secret) {
  await SecureStore.setItemAsync(
    KEY_NAME,
    JSON.stringify({ key, secret })
  )
}

export async function getCredentials() {
  const data = await SecureStore.getItemAsync(KEY_NAME)
  return data ? JSON.parse(data) : {}
}

export async function clearCredentials() {
  await SecureStore.deleteItemAsync(KEY_NAME)
}

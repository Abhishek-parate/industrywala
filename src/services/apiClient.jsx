import axios from 'axios'
import { Alert } from 'react-native'
import { getCredentials } from '../storage/secureStore'

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_WOO_BASE_URL,
  timeout: 15000,
})

apiClient.interceptors.request.use(
  async (config) => {
    const { key, secret } = await getCredentials()

    if (key && secret) {
      config.auth = {
        username: key,
        password: secret,
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    Alert.alert(
      'API Error',
      error?.response?.data?.message || 'Something went wrong'
    )
    return Promise.reject(error)
  }
)

export default apiClient

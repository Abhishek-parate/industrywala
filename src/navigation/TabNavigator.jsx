import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrdersStack from './OrdersStack'
import CreateOrderScreen from '../screens/create/CreateOrderScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Create Order" component={CreateOrderScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

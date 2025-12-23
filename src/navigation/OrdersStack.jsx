import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrdersScreen from '../screens/orders/OrdersScreen'
import OrderDetailsScreen from '../screens/orders/OrderDetailsScreen'
import UpdateOrderScreen from '../screens/orders/UpdateOrderScreen'

const Stack = createNativeStackNavigator()

export default function OrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrdersList" component={OrdersScreen} options={{ title: 'Orders' }} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: 'Order Details' }} />
      <Stack.Screen name="UpdateOrder" component={UpdateOrderScreen} options={{ title: 'Update Status' }} />
    </Stack.Navigator>
  )
}

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#7c3aed" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7c3aed',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="order/[id]" 
          options={{ 
            title: 'Order Details',
            headerBackTitle: 'Back',
          }} 
        />
      </Stack>
    </>
  );
}

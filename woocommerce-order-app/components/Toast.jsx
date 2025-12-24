import { View, Text } from 'react-native';
import { useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

export default function Toast({ message, type = 'success', onHide }) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Show animation
    translateY.value = withSpring(0);
    opacity.value = withTiming(1);

    // Hide after 3 seconds
    const timer = setTimeout(() => {
      translateY.value = withTiming(-100);
      opacity.value = withTiming(0);
      setTimeout(onHide, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <Animated.View
      style={animatedStyle}
      className={`absolute top-12 left-4 right-4 ${bgColors[type]} rounded-lg p-4 shadow-lg z-50`}
    >
      <Text className="text-white font-semibold text-center">{message}</Text>
    </Animated.View>
  );
}

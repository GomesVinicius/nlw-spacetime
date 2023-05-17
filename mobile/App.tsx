import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className='flex-1 bg-slate-700 items-center justify-center'>
      <Text className='text-zinc-50'>Open up App.js to start working on your app!</Text>
      <StatusBar style="light" translucent />
    </View>
  );
}

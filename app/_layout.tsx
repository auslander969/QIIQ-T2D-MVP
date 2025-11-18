import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFrameworkReady } from '@/hooks/useFrameworkReady'

export default function RootLayout() {
  useFrameworkReady()

  return (
    <>
      <Stack
        initialRouteName="sahha-test"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="sahha-test"
          options={{ headerShown: true, title: 'Sahha Test' }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="metric-detail" options={{ headerShown: true }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}


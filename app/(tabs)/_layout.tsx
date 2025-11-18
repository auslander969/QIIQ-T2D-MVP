import { Tabs } from 'expo-router';
import { Home, Sparkles, Users, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5B7CFF',
        tabBarInactiveTintColor: '#6E6E80',
        tabBarStyle: {
          backgroundColor: '#0F1129',
          borderTopColor: '#1C1C2E',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 24,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Journey',
          tabBarIcon: ({ size, color }) => (
            <Sparkles size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Community',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}

import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { NavigationState } from '@react-navigation/native';
import { Tabs, router } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/common/components';
import { theme } from '@/theme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        headerShown: false,
        tabBarButton: HapticTab,
        animation: 'shift',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lobby',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerShown: false,
          popToTopOnBlur: true,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            const state = navigation.getState();
            const eventsRoute = state.routes.find(
              (route: NavigationState['routes'][number]) => route.name === 'events',
            );
            const isEventsFocused = state.routes[state.index]?.name === 'events';
            const eventsStackIndex = eventsRoute?.state?.index ?? 0;

            if (isEventsFocused && eventsStackIndex > 0) {
              e.preventDefault();
              router.dismissTo('/events');
            }
          },
        })}
      />
    </Tabs>
  );
}

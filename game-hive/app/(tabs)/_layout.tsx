import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: () => {
            const image = require("../../assets/images/logo.png");
            return (
                <Image
                    src="https://media.discordapp.net/attachments/704725720953389076/1335506417498456094/logo.png?ex=67a06ac6&is=679f1946&hm=f7209f417d85ed0a1d913123e22b730390f8921d79aaeaa7a02cdd07568975e2&=&format=webp&quality=lossless&width=100&height=100"
                    style={{height:36, width:24}}
                />
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => {
            const searchIcon = require("../../assets/images/search.svg");
            return (
                <Image
                    source={searchIcon}
                    style={{height:36, width:24}}
                />
            );
          },
        }}
      />
      
    </Tabs>
  );
}

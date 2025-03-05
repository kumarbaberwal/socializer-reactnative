import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/Theme'

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.grey,
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 40,
                    paddingBottom: 8,
                    position: 'absolute',
                }
            }}
        >
            <Tabs.Screen name="index"
                options={{ tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color} /> }}
            />
            <Tabs.Screen name="bookmarks"
                options={{ tabBarIcon: ({ size, color }) => <Ionicons name='bookmarks' size={size} color={color} /> }}
            />
            <Tabs.Screen name="create"
                options={{ tabBarIcon: ({ size, color }) => <Ionicons name='add-circle' size={size} color={COLORS.primary} /> }}
            />
            <Tabs.Screen name="notifications"
                options={{ tabBarIcon: ({ size, color }) => <Ionicons name='heart' size={size} color={color} /> }}
            />
            <Tabs.Screen name="profile"
                options={{ tabBarIcon: ({ size, color }) => <Ionicons name='person-circle' size={size} color={color} /> }}
            />
        </Tabs>
    )
}
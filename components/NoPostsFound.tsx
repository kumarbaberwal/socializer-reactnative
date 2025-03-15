import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/Theme'
import { Ionicons } from '@expo/vector-icons'

export default function NoPostsFound() {
    return (
        <View
            style={{
                height: '100%',
                backgroundColor: COLORS.background,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Ionicons
                name={'image-outline'}
                size={48}
                color={COLORS.primary}
            />
            <Text
                style={{
                    fontSize: 20,
                    color: COLORS.white,
                }}
            >
                No posts yet
            </Text>
        </View>
    )
}
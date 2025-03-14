import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/Theme'

export default function NoBookmarksFound() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.background,
            }}
        >
            <Text
                style={{
                    color: COLORS.primary,
                    fontSize: 22
                }}
            >
                No Bookmarked posts yet
            </Text>
        </View>
    )
}
import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/styles/feed.styles'
import { COLORS } from '@/constants/Theme'

export default function NoPostFound() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.background,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    color: COLORS.grey
                }}
            >No posts yet</Text>
        </View>
    )
}
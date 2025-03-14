import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/styles/notifications.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/Theme'

export default function NoNotificationsFound() {
    return (
        <View
            style={[styles.container, styles.centered]}
        >
            <Ionicons
                name={'notifications-outline'}
                size={48}
                color={COLORS.primary}
            />
            <Text
                style={{
                    fontSize: 20,
                    color: COLORS.white,
                }}
            >
                No notifications yet
            </Text>
        </View>
    )
}
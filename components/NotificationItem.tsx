import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/notifications.styles'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/Theme'
import { formatDistanceToNow } from 'date-fns'

export default function NotificationItem({ notification }: any) {
    return (
        <View
            style={styles.notificationItem}
        >
            <View
                style={styles.notificationContent}
            >
                <Link
                    href={{ pathname: '/user/[id]', params: { id: notification.sender._id } }}
                    asChild
                >
                    <TouchableOpacity
                        style={styles.avatarContainer}
                    >
                        <Image
                            source={notification.sender.image}
                            style={styles.avatar}
                            contentFit='cover'
                            transition={200}
                        />
                        <View
                            style={styles.iconBadge}
                        >
                            {notification.type === 'like' ? (
                                <Ionicons
                                    name={'heart'}
                                    size={14}
                                    color={COLORS.primary}
                                />
                            ) : notification.type === 'follow' ? (
                                <Ionicons
                                    name={'person-add'}
                                    size={14}
                                    color={'#8b5cf6'}
                                />
                            ) : (
                                <Ionicons
                                    name={'chatbubble'}
                                    size={14}
                                    color={'#3b82f6'}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </Link>

                <View
                    style={styles.notificationInfo}
                >
                    <Link
                        href={'/'}
                        asChild
                    >
                        <TouchableOpacity>
                            <Text
                                style={styles.username}
                            >
                                {notification.sender.username}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                    <Text
                        style={styles.action}
                    >
                        {notification.type === 'follow' ? "Started follow you" : notification.type === 'like' ? 'Liked your post' : `Commented: ${notification.comment}`}
                    </Text>
                    <Text
                        style={styles.timeAgo}
                    >
                        {formatDistanceToNow(notification._creationTime, { addSuffix: true })}
                    </Text>
                </View>
            </View>

            {
                notification.post && (
                    <Image
                        source={notification.post.imageUrl}
                        style={styles.postImage}
                        contentFit={'cover'}
                        transition={200}
                    />
                )
            }
        </View>
    )
}
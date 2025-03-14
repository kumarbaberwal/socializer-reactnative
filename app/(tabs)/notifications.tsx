import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from '@/components/Loader';
import NoNotificationsFound from '@/components/NoNotificationsFound';
import { styles } from '@/styles/notifications.styles';
import NotificationItem from '@/components/NotificationItem';

export default function Notifications() {
    const notifications = useQuery(api.notifications.getNotifications);

    if (notifications === undefined) return <Loader />

    if (notifications.length === 0) return <NoNotificationsFound />
    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.header}
            >
                <Text
                    style={styles.headerTitle}
                >
                    Notifications
                </Text>
            </View>

            {/* flatlist */}

            <FlatList
                data={notifications}
                renderItem={({ item }) => <NotificationItem notification={item} />}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
}
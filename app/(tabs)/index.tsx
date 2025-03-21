import Loader from '@/components/Loader';
import NoPostFound from '@/components/NoPostFound';
import Post from '@/components/Post';
import StoriesSection from '@/components/StoriesSection';
import { COLORS } from '@/constants/Theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/feed.styles';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
    const { signOut } = useAuth();
    const [refreshing, setRefreshing] = useState(false);
    const post = useQuery(api.posts.getFeedPosts);

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(()=> {
            setRefreshing(false)
        }, 2000)
     }

    if (post === undefined) return <Loader />

    if (post.length === 0) return <NoPostFound />
    return (
        <View
            style={styles.container}
        >
            {/* Header */}
            <View
                style={styles.header}
            >
                <Text
                    style={styles.headerTitle}
                >
                    Socializer
                </Text>
                <TouchableOpacity
                    onPress={() => signOut()}
                >
                    <Ionicons
                        name='log-out-outline'
                        size={24}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>


            {/* FlatList */}

            <FlatList
                data={post}
                renderItem={({ item }) => <Post post={item} />}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                ListHeaderComponent={<StoriesSection />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                    />
                }
            />
        </View>
    )
}
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { styles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Theme';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import NoPostFound from '@/components/NoPostFound';
import Loader from '@/components/Loader';
import Post from '@/components/Post';
import StoriesSection from '@/components/StoriesSection';

export default function Index() {
    const { signOut } = useAuth();
    const post = useQuery(api.posts.getFeedPosts);

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
                    Socialize
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
            />
        </View>
    )
}
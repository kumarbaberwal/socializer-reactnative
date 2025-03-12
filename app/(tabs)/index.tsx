import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { styles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Theme';
import { Stories } from '@/constants/MockData';
import Story from '@/components/Story';
import { useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import NoPostFound from '@/components/NoPostFound';
import Loader from '@/components/Loader';
import Post from '@/components/Post';

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
                    onPress={() => signOut}
                >
                    <Ionicons
                        name='log-out-outline'
                        size={24}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>


            {/* scroll view */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    marginBottom: 60
                }}
            >
                <ScrollView
                    horizontal
                    showsVerticalScrollIndicator={false}
                    style={styles.storiesContainer}
                >
                    {Stories.map((story) => (
                        <Story
                            story={story}
                            key={story.id}
                        />
                    ))}
                </ScrollView>

                {post.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </ScrollView>
        </View>
    )
}
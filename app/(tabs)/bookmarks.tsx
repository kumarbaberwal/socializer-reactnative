import Loader from '@/components/Loader';
import NoBookmarksFound from '@/components/NoBookmarksFound';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/feed.styles';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

export default function Bookmarks() {
    const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

    if (bookmarkedPosts === undefined) return <Loader />;

    if (bookmarkedPosts.length === 0) return <NoBookmarksFound />;

    return (
        <View
            style={styles.container}
        >
            {/* header */}
            <View
                style={styles.header}
            >
                <Text
                    style={styles.headerTitle}
                >
                    Bookmarks
                </Text>
            </View>


            {/* posts */}
            <FlatList
                data={bookmarkedPosts}
                keyExtractor={(item) => item ? item._id : ''}
                numColumns={3}
                contentContainerStyle={{
                    padding: 8,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    item &&
                    <View
                        style={{
                            flex: 1,
                            margin: 2,
                        }}
                    >
                        <Image
                            source={item.imageUrl}
                            style={{
                                width: '100%',
                                aspectRatio: 1,
                            }}
                            contentFit='cover'
                            transition={200}
                            cachePolicy={'memory-disk'}
                        />
                    </View>
                )}
            />
        </View>
    )
}
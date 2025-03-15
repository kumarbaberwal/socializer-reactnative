import Loader from '@/components/Loader';
import NoBookmarksFound from '@/components/NoBookmarksFound';
import { COLORS } from '@/constants/Theme';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { styles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function Bookmarks() {
    const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);
    const [selectedPost, setSelectedPost] = useState<Doc<'post'> | null>(null);

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
                    <TouchableOpacity
                        style={{
                            flex: 1 / 3,
                            margin: 2,
                        }}
                        onPress={() => setSelectedPost(item)}
                    >
                        <Image
                            source={item.imageUrl}
                            style={{
                                flex: 1,
                                aspectRatio: 1,
                            }}
                            contentFit='cover'
                            transition={200}
                            cachePolicy={'memory-disk'}
                        />
                    </TouchableOpacity>
                )}
            />

            {/* selected Image Modal */}
            <Modal
                visible={!!selectedPost}
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => setSelectedPost(null)}
            >
                <View
                    style={styles.modalBackdrop}
                >
                    {selectedPost && (
                        <View
                            style={styles.postDetailContainer}
                        >
                            <View
                                style={styles.postDetailHeader}
                            >
                                <TouchableOpacity
                                    onPress={() => setSelectedPost(null)}
                                >
                                    <Ionicons
                                        name={'close'}
                                        size={24}
                                        color={COLORS.white}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Image
                                source={selectedPost.imageUrl}
                                cachePolicy={'memory-disk'}
                                style={styles.postDetailImage}
                            />
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    )
}
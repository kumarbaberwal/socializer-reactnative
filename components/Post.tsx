import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/feed.styles';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/Theme';


export default function Post({ post }: {
    post: any;
}) {
    return (
        <View
            style={styles.post}
        >
            {/* posts */}
            <View
                style={styles.postHeader}
            >
                <Link
                    href={'/'}
                >
                    <TouchableOpacity
                        style={styles.postHeaderLeft}
                    >
                        <Image
                            source={post.author.image}
                            style={styles.postAvatar}
                            contentFit='cover'
                            transition={200}
                            cachePolicy={'memory-disk'}
                        />
                        <Text
                            style={styles.postUsername}
                        >
                            {post.author.username}
                        </Text>
                    </TouchableOpacity>
                </Link>

                {/* show a delete button */}
                {/* <TouchableOpacity>
                    <Ionicons
                        name='ellipsis-horizontal'
                        size={20}
                        color={COLORS.white}
                    />
                </TouchableOpacity> */}
                <TouchableOpacity>
                    <Ionicons
                        name='trash-outline'
                        size={20}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            </View>
            {/* image */}
            <Image
                source={post.imageUrl}
                style={styles.postImage}
                contentFit='cover'
                transition={200}
                cachePolicy={'memory-disk'}
            />
            {/* post actions */}
            <View
                style={styles.postAction}
            >
                <View
                    style={styles.postActionLeft}
                >
                    <TouchableOpacity>
                        <Ionicons
                            name='heart-outline'
                            size={24}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name='chatbubble-outline'
                            size={22}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Ionicons
                        name='bookmark-outline'
                        size={22}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>


            {/* post info */}
            <View
                style={styles.postInfo}
            >
                <Text
                    style={styles.likesText}
                >
                    Be the first to like
                </Text>
                {post.caption && (
                    <View
                        style={styles.captionContainer}
                    >
                        <Text
                            style={styles.captionUsername}
                        >
                            {post.author.username}
                        </Text>
                        <Text
                            style={styles.captionText}
                        >
                            {post.caption}
                        </Text>
                    </View>
                )}

                <TouchableOpacity>
                    <Text
                        style={styles.commentsText}
                    >
                        View all 2 comments
                    </Text>
                </TouchableOpacity>
                <Text
                    style={styles.timeAgo}
                >
                    2 hours ago
                </Text>
            </View>
        </View>
    )
}
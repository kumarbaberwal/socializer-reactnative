import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
export default defineSchema({
    users: defineTable({
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        followers: v.number(),
        following: v.number(),
        posts: v.number(),
        clerkId: v.string(),
    }).index('by_clerk_id', ['clerkId']),

    post: defineTable({
        userId: v.id('users'),
        imageUrl: v.string(),
        storageId: v.id('storage'),
        caption: v.optional(v.string()),
        likes: v.number(),
        comments: v.number(),
    }).index('by_user_id', ['userId']),

    likes: defineTable({
        postId: v.id('post'),
        userId: v.id('users'),
    }).index('by_post_id', ['postId']).index('by_user_and_post_id', ['userId', 'postId']),

    comments: defineTable({
        postId: v.id('post'),
        userId: v.id('users'),
        comment: v.string(),
    }).index('by_post_id', ['postId']),

    follows: defineTable({
        followerId: v.id('users'),
        followingId: v.id('users'),
    }).index('by_follower_id', ['followerId']).index('by_following_id', ['followingId']).index('by_follower_and_following_id', ['followerId', 'followingId']),

    notifications: defineTable({
        receiverId: v.id('users'),
        senderId: v.id('users'),
        type: v.union(v.literal('like'), v.literal('comment'), v.literal('follow')),
        postId: v.optional(v.id('post')),
        commentId: v.optional(v.id('comments')),
    }).index('by_receiver_id', ['receiverId']),

    bookmark: defineTable({
        userId: v.id('users'),
        postId: v.id('post'),
    }).index('by_user_id', ['userId']).index('by_post_id', ['postId']).index('by_user_and_post_id', ['userId', 'postId']),
})
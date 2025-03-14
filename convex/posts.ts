import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { createUser, getAuthenticatedUser } from "./users";


export const generateUploadUrl = mutation(async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return await ctx.storage.generateUploadUrl();
})

export const createPost = mutation({
    args: {
        caption: v.optional(v.string()),
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx)
        const imageUrl = await ctx.storage.getUrl(args.storageId)
        if (!imageUrl) throw new Error("Image not found");
        // create post

        const postId = await ctx.db.insert('post', {
            userId: currentUser._id,
            imageUrl,
            storageId: args.storageId,
            caption: args.caption,
            likes: 0,
            comments: 0,
        })


        // increament the number of user post by 1

        await ctx.db.patch(currentUser._id, {
            posts: currentUser.posts + 1,
        })

        return postId
    }
})


export const getFeedPosts = query({
    handler: async (ctx) => {
        const currentUser = await getAuthenticatedUser(ctx);


        // get all posts

        const posts = await ctx.db.query('post').order('desc').collect()

        if (posts.length === 0) return [];

        // enhance post user data and interaction status

        const postsWithInfo = await Promise.all(
            posts.map(async (post) => {
                const postAuthor = (await ctx.db.get(post.userId))!;

                const like = await ctx.db.query('likes').withIndex('by_user_and_post_id', (q) => q.eq('userId', currentUser._id).eq('postId', post._id)).first()


                const bookmark = await ctx.db.query('bookmark').withIndex('by_user_and_post_id', (q) => q.eq('userId', currentUser._id).eq('postId', post._id)).first()

                return {
                    ...post,
                    author: {
                        _id: postAuthor?._id,
                        username: postAuthor?.username,
                        image: postAuthor?.image,
                    },
                    isLiked: !!like,
                    isBookmarked: !!bookmark,
                }
            })
        )

        return postsWithInfo;
    }
})


export const toggleLike = mutation({
    args: {
        postId: v.id('post'),
    },
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);
        const existing = await ctx.db.query('likes').withIndex('by_user_and_post_id', (q) => q.eq('userId', currentUser._id).eq('postId', args.postId)).first()

        const post = await ctx.db.get(args.postId);
        if (!post) throw new Error('Post not found');

        if (existing) {
            // remove like
            await ctx.db.delete(existing._id)
            await ctx.db.patch(args.postId, { likes: post.likes - 1 })
            return false;
        } else {
            // add like
            await ctx.db.insert('likes', {
                userId: currentUser._id,
                postId: args.postId,
            })

            await ctx.db.patch(args.postId, {
                likes: post.likes + 1
            })

            // if it's not my post send a notification
            if (currentUser._id !== post.userId) {
                await ctx.db.insert('notifications', {
                    receiverId: post.userId,
                    senderId: currentUser._id,
                    type: 'like',
                    postId: args.postId,
                });
            }

            return true;
        }
    }
})


export const deletePost = mutation({
    args: {
        postId: v.id('post')
    },
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx)

        const post = await ctx.db.get(args.postId)
        if (!post) throw new Error("Post not found")

        // veryfy ownership

        if (post.userId !== currentUser._id) throw new Error('Not authorized to delete this post');


        // delete associated likes
        const likes = await ctx.db.query('likes').withIndex('by_post_id', (q) => q.eq('postId', args.postId)).collect()

        for (const like of likes) {
            await ctx.db.delete(like._id);
        }

        // delete associated comments 
        const comments = await ctx.db.query('comments').withIndex('by_post_id', (q) => q.eq('postId', args.postId)).collect();

        for (const comment of comments) {
            await ctx.db.delete(comment._id);
        }

        // delete associated bookmarks

        const bookmarks = await ctx.db.query('bookmark').withIndex('by_post_id', (q) => q.eq('postId', args.postId)).collect();

        for (const bookmark of bookmarks) {
            await ctx.db.delete(bookmark._id)
        }

        // delete the post from storage
        await ctx.storage.delete(post.storageId);

        // delete post
        await ctx.db.delete(args.postId)

        // decreament user's post count by 1

        await ctx.db.patch(currentUser._id, {
            posts: Math.max(0, (currentUser.posts || 1) - 1)
        })
    }
})
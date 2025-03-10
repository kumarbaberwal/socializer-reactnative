import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";


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
                const postAuthor = await ctx.db.get(post.userId);

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
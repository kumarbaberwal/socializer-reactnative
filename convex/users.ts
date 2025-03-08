import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
    args: {
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db.query('users').withIndex('by_clerk_id', (index) =>
            index.eq('clerkId', args.clerkId)
        ).first()

        if (existingUser) return

        await ctx.db.insert('users', {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            bio: args.bio,
            image: args.image,
            clerkId: args.clerkId,
            followers: 0,
            following: 0,
            posts: 0,
        });
    }
});
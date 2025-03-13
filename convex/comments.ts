import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addComment = mutation({
    args: {
        content: v.string(),
        postId: v.id('post')
    },
    handler: async (ctx, req) => { 

    }
})
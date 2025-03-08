import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
    path: '/clerk-webhook',
    method: 'POST',
    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error('Missing CLERK_WEBHOOK_SECRET environment variable');
        }

        // check headers
        const svix_id = request.headers.get('svix-id');
        const svix_signature = request.headers.get('svix-signature');
        const svix_timestamp = request.headers.get('svix-timestamp');

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("Error occured - no svix headers", { status: 400 });
        }

        const payload = await request.json();
        const body = await JSON.stringify(payload);
        const webhook = new Webhook(webhookSecret);

        let event: any;


        // verfy webhook
        try {
            event = webhook.verify(body, { 'svix-id': svix_id, 'svix-timestamp': svix_timestamp, 'svix-signature': svix_signature }) as any;

        } catch (error) {
            console.log('Error occured - invalid svix signature', error);
            return new Response("Error occured - invalid svix signature", { status: 400 });
        }

        const eventType = event.type;
        if (eventType === "user.created") {
            const { id, email_address, first_name, last_name, image_url } = event.data;
            const email = email_address[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();
            try {
                await ctx.runMutation(api.users.createUser, {
                    email,
                    fullname: name,
                    image: image_url,
                    clerkId: id,
                    username: email.split('@')[0],
                })
            } catch (error) {
                console.log('Error creating user', error);
                return new Response("Error creating user", { status: 500 });

            }
        }
        return new Response("Webhook processed sucessfully", { status: 200 });
    })
})
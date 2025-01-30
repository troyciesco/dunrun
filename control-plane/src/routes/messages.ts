import { Hono } from "hono"
// import type { Server } from "your-server-type" // adjust import based on your WebSocket server type

const topic = "anonymous-chat-room"

// Create a function that returns the routes and takes server as parameter
export function createMessageRoutes(server: any) {
	const messages: any[] = []

	return new Hono()
		.basePath("/messages")
		.get("/", (c) => {
			return c.json(messages)
		})
		.post("/", async (c) => {
			const body = await c.req.text()
			const currentDateTime = new Date()
			const message = {
				id: Number(currentDateTime),
				date: currentDateTime.toLocaleString(),
				text: body
			}
			const data = {
				action: "update chat",
				message: message
			}

			messages.push(message)
			server.publish(topic, JSON.stringify(data))

			return c.json({ ok: true })
		})
}

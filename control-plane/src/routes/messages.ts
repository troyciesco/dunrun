import { Hono } from "hono"
// import type { Server } from "your-server-type" // adjust import based on your WebSocket server type

const topic = "dungeon-runs"

// Create a function that returns the routes and takes server as parameter
export function createMessageRoutes(server: any) {
	const messages: any[] = []

	return new Hono()
		.basePath("/messages")
		.get("/", (c) => {
			return c.json(messages)
		})
		.post("/", async (c) => {
			const data = await c.req.text()
			const currentDateTime = new Date()
			const body = {
				id: Number(currentDateTime),
				date: currentDateTime.toLocaleString(),
				data
			}
			const message = {
				level: "info",
				body
			}

			messages.push(message)
			server.publish(topic, JSON.stringify(message))

			await new Promise((resolve) => setTimeout(resolve, 1000))

			return c.json({ ok: true })
		})
}

import { Hono } from "hono"
import { randomUUIDv7, type Server } from "bun"

const topic = "dungeon-runs"

export function createMessageRoutes(server: Server) {
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
				id: randomUUIDv7(),
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

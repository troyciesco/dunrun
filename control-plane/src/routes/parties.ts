import { Hono } from "hono"

export const parties = new Hono()
	.basePath("/parties")
	.get("/", async (c) => {
		const res = await fetch(`http://localhost:9999/parties`)
		const data = await res.json()
		return c.json(data)
	})
	.get("/:id", async (c) => {
		const res = await fetch(
			`http://localhost:9999/parties/${c.req.param("id")}`
		)
		const data = await res.json()
		return c.json(data)
	})

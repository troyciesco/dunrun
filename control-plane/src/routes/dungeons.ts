import { Hono } from "hono"

export const dungeons = new Hono()
	.basePath("/dm")
	.get("/", async (c) => {
		const res = await fetch(`http://localhost:9999/dungeons`)
		const data = await res.json()
		return c.json(data)
	})
	.get("/:id", async (c) => {
		const res = await fetch(
			`http://localhost:9999/dungeons/${c.req.param("id")}`
		)
		const data = await res.json()
		return c.json(data)
	})

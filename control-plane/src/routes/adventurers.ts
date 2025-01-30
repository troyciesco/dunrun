import { Hono } from "hono"

export const adventurers = new Hono()
	.basePath("/adventurers")
	.get("/", async (c) => {
		const res = await fetch(`http://localhost:9999/adventurers`)
		const data = await res.json()
		return c.json(data)
	})
	.get("/:id", async (c) => {
		const res = await fetch(
			`http://localhost:9999/adventurers/${c.req.param("id")}`
		)
		const data = await res.json()
		return c.json(data)
	})

import { Dungeon } from "@/types"
import { Hono } from "hono"

export const dungeons = new Hono()
	.basePath("/dungeons")
	.get("/", async (c) => {
		const res = await fetch(`http://localhost:9999/dungeons`)
		const data: Dungeon[] = await res.json()
		return c.json(data)
	})
	.get("/:id", async (c) => {
		const res = await fetch(
			`http://localhost:9999/dungeons/${c.req.param("id")}`
		)
		const data: Dungeon = await res.json()
		return c.json(data)
	})

import { Dungeon } from "@/types"
import { Hono } from "hono"
import { env } from "hono/adapter"

export const dungeons = new Hono()
	.basePath("/dungeons")
	.get("/", async (c) => {
		const { DM_API_URL } = env<{ DM_API_URL: string }>(c)

		const res = await fetch(
			`${DM_API_URL}/dungeons?include=rooms,rooms.enemies`
		)
		const { data: dungeons }: { data: Dungeon[] } = await res.json()
		return c.json(dungeons)
	})
	.get("/:id", async (c) => {
		const { DM_API_URL } = env<{ DM_API_URL: string }>(c)

		const res = await fetch(
			`${DM_API_URL}/dungeons/${c.req.param("id")}?include=rooms,rooms.enemies`
		)
		const { data: dungeon }: { data: Dungeon } = await res.json()
		return c.json(dungeon)
	})

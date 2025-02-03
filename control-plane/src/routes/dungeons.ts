import type { Dungeon, Env } from "@/types"
import { Hono } from "hono"
import { env } from "hono/adapter"
import { prisma } from "~/prisma/client"

export const dungeons = new Hono<Env>()
	.basePath("/dungeons")
	.get("/", async (c) => {
		const { DM_API_URL } = env(c)

		const res = await fetch(
			`${DM_API_URL}/dungeons?include=rooms,rooms.enemies`
		)
		const { data: dungeons }: { data: Dungeon[] } = await res.json()
		return c.json(dungeons)
	})
	.get("/:id", async (c) => {
		const { DM_API_URL } = env(c)

		const res = await fetch(
			`${DM_API_URL}/dungeons/${c.req.param("id")}?include=rooms,rooms.enemies`
		)
		const { data: dungeon }: { data: Dungeon } = await res.json()
		const runs = await prisma.run.findMany({ where: { dungeonId: dungeon.id } })

		return c.json({ ...dungeon, runs })
	})

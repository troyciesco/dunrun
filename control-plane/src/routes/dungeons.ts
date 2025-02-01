import { Dungeon, Room } from "@/types"
import { Hono } from "hono"

export const dungeons = new Hono()
	.basePath("/dungeons")
	.get("/", async (c) => {
		const res = await fetch(
			`http://takhisis.test/api/dungeons?include=rooms,rooms.enemyTypes,rooms.uniqueEnemies`
		)
		const { data: dungeons }: { data: Dungeon[] } = await res.json()
		return c.json(dungeons)
	})
	.get("/:id", async (c) => {
		const res = await fetch(
			`http://takhisis.test/api/dungeons/${c.req.param(
				"id"
			)}?include=rooms,rooms.enemyTypes,rooms.uniqueEnemies`
		)
		const { data: dungeon }: { data: Dungeon } = await res.json()

		dungeon.rooms = dungeon.rooms.map(
			({ enemy_types, unique_enemies, ...room }: Room) => ({
				...room,
				enemies: [...(enemy_types || []), ...(unique_enemies || [])]
			})
		)
		return c.json(dungeon)
	})

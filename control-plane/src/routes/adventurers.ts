import { Adventurer, Env } from "@/types"
import { Hono } from "hono"
import { env } from "hono/adapter"
import { prisma } from "~/prisma/client"

export const adventurers = new Hono<Env>()
	.basePath("/adventurers")
	.get("/", async (c) => {
		const { PM_API_URL } = env(c)
		const res = await fetch(`${PM_API_URL}/adventurers`)
		const data = await res.json()

		const adventurers: Adventurer[] = data.map(
			({
				adventurer_class,
				...rest
			}: Adventurer & { adventurer_class: string }) => ({
				...rest,
				class: adventurer_class
			})
		)
		return c.json(adventurers)
	})
	.get("/:id", async (c) => {
		const { PM_API_URL } = env(c)

		const res = await fetch(`${PM_API_URL}/adventurers/${c.req.param("id")}`)
		const adventurer: Adventurer = await res.json()
		const battleData = await prisma.battleParticipant.findMany({
			where: { entityId: adventurer.id, entityType: "adventurer" },
			include: { battle: true }
		})

		return c.json({
			...adventurer,
			class: adventurer.adventurer_class,
			battleData
		})
	})

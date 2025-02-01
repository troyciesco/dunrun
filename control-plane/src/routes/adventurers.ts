import { Adventurer } from "@/types"
import { Hono } from "hono"

export const adventurers = new Hono()
	.basePath("/adventurers")
	.get("/", async (c) => {
		const res = await fetch(`http://localhost:8000/api/adventurers`)
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
		const res = await fetch(
			`http://localhost:9999/adventurers/${c.req.param("id")}`
		)
		const data: Adventurer = await res.json()
		return c.json(data)
	})

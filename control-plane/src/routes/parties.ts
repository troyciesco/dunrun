import { Env, Party } from "@/types"
import { Hono } from "hono"
import { env } from "hono/adapter"

export const parties = new Hono<Env>()
	.basePath("/parties")
	.get("/", async (c) => {
		const { PM_API_URL } = env(c)
		const res = await fetch(`${PM_API_URL}/parties`)
		const data: Party[] = await res.json()
		return c.json(data)
	})
	.get("/:id", async (c) => {
		const { PM_API_URL } = env(c)

		const res = await fetch(`${PM_API_URL}/parties/${c.req.param("id")}`)
		const data: Party = await res.json()
		console.log(data)
		return c.json(data)
	})

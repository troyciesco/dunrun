import { Hono } from "hono"

type Run = {
	id: number
	dungeonId: number
	partyId: number
	roomId: number
	isActive: boolean
}

const currentRuns: Run[] = []

const sendMsg = async (message: string) => {
	await fetch(`http://localhost:1111/messages`, {
		method: "POST",
		body: JSON.stringify({
			meta: {
				dungeonId: 1,
				partyId: 1,
				roomId: 1
			},
			message
		})
	})
}

const simulateRun = async ({
	run,
	adventurers,
	dungeon
}: {
	run: Run
	adventurers: any
	dungeon: any
}) => {
	let isActive = run?.isActive
	let currentRoomId = run?.roomId

	while (isActive) {
		const enemies = dungeon.rooms.find(
			(r: any) => r.id === Number(currentRoomId)
		).enemies

		await sendMsg(
			`The party enters room ${currentRoomId}. It has ${enemies.join(", ")}!`
		)

		for (let i = 0, k = 0; i < adventurers.length; i++, k++) {
			if (k > enemies.length - 1) {
				k = 0
			}
			await sendMsg(
				`${adventurers[i].name} hits ${enemies[k]} for ${
					Math.floor(Math.random() * 20) + 1
				} damage!`
			)
			await sendMsg(
				`${enemies[k]} hits ${adventurers[i].name} for ${
					Math.floor(Math.random() * 20) + 1
				} damage!`
			)
		}

		if (currentRoomId === dungeon.rooms[dungeon.rooms.length - 1].id) {
			isActive = false
		} else {
			const idx = dungeon.rooms.findIndex((r) => r.id === currentRoomId)
			currentRoomId = dungeon.rooms[idx + 1].id
			console.log(currentRoomId)
		}
	}
}

export const runsRoute = new Hono()
	.basePath("/runs")
	.get("/", async (c) => {
		return c.json(["1"])
	})
	.get("/:id", async (c) => {
		return c.json(["runs by run id"])
	})
	.post("/create", async (c) => {
		const newRun = {
			id: currentRuns.length + 1,
			dungeonId: 1,
			partyId: 1,
			roomId: 1,
			isActive: true
		}
		currentRuns.push(newRun)

		await sendMsg(
			`new run created with id of ${newRun.id} for dungeon ${newRun.dungeonId}`
		)
		return c.json(newRun)
	})
	.post("/:id/execute", async (c) => {
		const run = currentRuns.find(
			(r) => r.id === Number(c.req.param("id"))
		) as Run
		const partyFetch = await fetch(
			`http://localhost:9999/parties/${run?.partyId}`
		)
		const party = await partyFetch.json()
		const dungeonFetch = await fetch(
			`http://localhost:9999/dungeons/${run?.dungeonId}`
		)
		const dungeon = await dungeonFetch.json()

		const adventurers = await Promise.all(
			party.adventurers.map(async (member) => {
				const response = await fetch(
					`http://localhost:9999/adventurers/${member.adventurerId}`
				)
				return response.json()
			})
		)

		sendMsg("The party has started the run in the dungeon!")
		simulateRun({ run, adventurers, dungeon })
		return c.json("run started")
	})

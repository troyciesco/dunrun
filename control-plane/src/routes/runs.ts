import { Hono } from "hono"

type Run = {
	id: number
	dungeonId: number
	partyId: number
	roomId: number
	isActive: boolean
}

const currentRuns: Run[] = []

const sendMsg = async ({
	dungeonId,
	partyId,
	roomId,
	message
}: {
	dungeonId: number
	partyId: number
	roomId: number
	message: string
}) => {
	await fetch(`http://localhost:1111/messages`, {
		method: "POST",
		body: JSON.stringify({
			meta: {
				dungeonId,
				partyId,
				roomId
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

		const meta = { dungeonId: dungeon.id, partyId: 1, roomId: currentRoomId }
		await sendMsg({
			...meta,
			message: `The party enters room ${currentRoomId}. It has ${enemies.join(
				", "
			)}!`
		})

		for (let i = 0, k = 0; i < adventurers.length; i++, k++) {
			if (k > enemies.length - 1) {
				k = 0
			}
			await sendMsg({
				...meta,
				message: `${adventurers[i].name} hits ${enemies[k]} for ${
					Math.floor(Math.random() * 20) + 1
				} damage!`
			})
			await sendMsg({
				...meta,
				message: `${enemies[k]} hits ${adventurers[i].name} for ${
					Math.floor(Math.random() * 20) + 1
				} damage!`
			})
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
		return c.json(currentRuns)
	})
	.get("/:id", async (c) => {
		return c.json(["runs by run id"])
	})
	.post("/create", async (c) => {
		const { did, pid } = c.req.query()

		const newRun = {
			id: currentRuns.length + 1,
			dungeonId: Number(did),
			partyId: Number(pid),
			roomId: 1,
			isActive: true
		}
		currentRuns.push(newRun)

		await sendMsg({
			dungeonId: newRun.dungeonId,
			partyId: newRun.partyId,
			roomId: newRun.roomId,
			message: `new run created with id of ${newRun.id} for dungeon ${newRun.dungeonId}`
		})
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

		sendMsg({
			dungeonId: dungeon.id,
			partyId: party.id,
			roomId: 1,
			message: "The party has started the run in the dungeon!"
		})
		simulateRun({ run, adventurers, dungeon })
		return c.json("run started")
	})

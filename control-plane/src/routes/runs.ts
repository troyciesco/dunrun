import { Adventurer, Dungeon, Env, Party } from "@/types"
import { Hono } from "hono"
import { env } from "hono/adapter"

type Run = {
	id: number
	dungeonId: number
	partyId: number
	roomId: number
	status: "pending" | "active" | "completed"
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

// @ts-expect-error
const simulateRun = async ({
	run,
	party,
	dungeon
}: {
	run: Run
	party: Party
	dungeon: Dungeon
}) => {
	let isActive = run.status === "active"
	let currentRoomId = run.roomId

	while (isActive) {
		// @TODO: error handling
		const enemies =
			dungeon.rooms.find((r) => r.id === Number(currentRoomId))!.enemies || []

		const meta = {
			//
			dungeonId: dungeon.id,
			partyId: party.id,
			roomId: currentRoomId
		}
		await sendMsg({
			...meta,
			message: `The party enters room ${currentRoomId}. It has ${enemies
				.map((e) => e.name)
				.join(", ")}!`
		})

		// roll for initiative (or maybe just random sort. does something other than an array of ids make sense here?)
		// first character chooses target - lowest current_hp of opponents
		// character chooses melee, ranged, or spell based on class and stats
		// rolls 1d20, adds proficiency bonus (?), adds stat bonus, compares to opponent AC
		// if attack roll > AC, attack hits. (or is it >=?)
		// damage roll is 1d8 for everyone for now
		// POST to something like /enemy/{id}, subtract from current_hp, check if it's now 0, and if it is update the enemy's is_knocked_out field and send that plus new_hp back to the requesting process.
		// if they're knocked out, remove them from the round robin
		// if that team no longer has players in the round robin, end the simulation. otherwise it's the next person's turn.

		for (let i = 0, k = 0; i < party.adventurers.length; i++, k++) {
			if (k > enemies.length - 1) {
				k = 0
			}
			await sendMsg({
				...meta,
				// @TODO: error handling
				message: `${party.adventurers[i]!.name} hits ${enemies[k]?.name} for ${
					Math.floor(Math.random() * 20) + 1
				} damage!`
			})
			await sendMsg({
				...meta,
				// @TODO: error handling
				message: `${enemies[k]?.name} hits ${party.adventurers[i]!.name} for ${
					Math.floor(Math.random() * 20) + 1
				} damage!`
			})
		}

		// @TODO: error handling
		if (currentRoomId === dungeon.rooms[dungeon.rooms.length - 1]!.id) {
			const runIndex = currentRuns.indexOf(run)
			isActive = false
			currentRuns[runIndex]!.status = "completed"
		} else {
			const idx = dungeon.rooms.findIndex((r) => r.id === currentRoomId)
			// @TODO: error handling
			currentRoomId = dungeon.rooms[idx + 1]!.id
			console.log(currentRoomId)
		}
	}
}

const simulateRunV1 = async ({
	run,
	party,
	dungeon
}: {
	run: Run
	party: Party
	dungeon: Dungeon
}) => {
	let isActive = run.status === "active"
	let currentRoomId = run.roomId

	while (isActive) {
		// @TODO: error handling
		const enemies =
			dungeon.rooms.find((r) => r.id === Number(currentRoomId))!.enemies || []

		const meta = { dungeonId: dungeon.id, partyId: 1, roomId: currentRoomId }
		await sendMsg({
			...meta,
			message: `The party enters room ${currentRoomId}. It has ${enemies
				.map((e) => e.name)
				.join(", ")}!`
		})

		for (let i = 0, k = 0; i < party.adventurers.length; i++, k++) {
			if (k > enemies.length - 1) {
				k = 0
			}
			await sendMsg({
				...meta,
				// @TODO: error handling
				message: `${party.adventurers[i]!.name} hits ${enemies[k]?.name} for ${
					Math.floor(Math.random() * 20) + 1
				} damage!`
			})
			await sendMsg({
				...meta,
				// @TODO: error handling
				message: `${enemies[k]?.name} hits ${party.adventurers[i]!.name} for ${
					Math.floor(Math.random() * 20) + 1
				} damage!`
			})
		}

		// @TODO: error handling
		if (currentRoomId === dungeon.rooms[dungeon.rooms.length - 1]!.id) {
			const runIndex = currentRuns.indexOf(run)
			isActive = false
			currentRuns[runIndex]!.status = "completed"
		} else {
			const idx = dungeon.rooms.findIndex((r) => r.id === currentRoomId)
			// @TODO: error handling
			currentRoomId = dungeon.rooms[idx + 1]!.id
			console.log(currentRoomId)
		}
	}
}

export const runsRoute = new Hono<Env>()
	.basePath("/runs")
	.get("/", async (c) => {
		return c.json(currentRuns)
	})
	.get("/:id", async (c) => {
		return c.json(["runs by run id"])
	})
	.post("/create", async (c) => {
		const { did, pid } = c.req.query()

		const newRun: Run = {
			id: currentRuns.length + 1,
			dungeonId: Number(did),
			partyId: Number(pid),
			roomId: 1,
			status: "active"
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
		const { DM_API_URL, PM_API_URL } = env(c)

		const run = currentRuns.find(
			(r) => r.id === Number(c.req.param("id"))
		) as Run

		const runIndex = currentRuns.indexOf(run)
		currentRuns[runIndex]!.status = "active"

		const partyFetch = await fetch(`${PM_API_URL}/parties/${run?.partyId}`)
		const party: Party = await partyFetch.json()

		const dungeonFetch = await fetch(
			`${DM_API_URL}/dungeons/${run?.dungeonId}?include=rooms,rooms.enemies`
		)
		const { data: dungeon }: { data: Dungeon } = await dungeonFetch.json()

		sendMsg({
			dungeonId: dungeon.id,
			partyId: party.id,
			roomId: 1,
			message: "The party has started the run in the dungeon!"
		})
		simulateRunV1({ run, party, dungeon })
		return c.json("run started")
	})

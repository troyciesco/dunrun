import { Dungeon, Env, Party } from "@/types"
import { Hono } from "hono"
import { env } from "hono/adapter"
import { prisma } from "~/prisma/client"

type Run = {
	id: number
	dungeonId: number
	partyId: number
	currentRoomId: number
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

// https://www.codemzy.com/blog/shuffle-array-javascript
function shuffleArray(array: unknown[]) {
	let length = array.length
	let shuffle = array.slice() // copy of array
	// loop over the array
	for (let i = length - 1; i > 0; i -= 1) {
		let random = Math.floor(Math.random() * (i + 1)) // random card position
		let current = shuffle[i] // current card
		// swap the random card and the current card
		shuffle[i] = shuffle[random] // move the random card to the current position
		shuffle[random] = current // put the current card in the random position
	}
	return shuffle // return shuffled array
}

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
	let currentRoomId = run.currentRoomId

	const battle = await prisma.battle.create({
		data: {
			roomId: currentRoomId,
			status: "pending",
			run: {
				connect: {
					id: run.id
				}
			}
		}
	})

	const participants = [
		...party.adventurers.map((a) => ({ id: a.id, type: "adventurer" })),
		...dungeon.rooms[currentRoomId]!.enemies!.map((e) => ({
			id: e.id,
			type: "enemy"
		}))
	]

	const shuffledParticipants = shuffleArray(participants) as {
		id: number
		type: "adventurer" | "enemy"
	}[]

	const adventurers = await prisma.battleParticipant.createManyAndReturn({
		data: party.adventurers.map((a) => ({
			battleId: battle.id,
			entityId: a.id,
			entityType: "adventurer",
			cachedHp: a.hp_current,
			turnOrder:
				shuffledParticipants.findIndex(
					(p) => p.id === a.id && p.type === "adventurer"
				) + 1
		}))
	})

	const enemies = await prisma.battleParticipant.createManyAndReturn({
		data: dungeon.rooms[currentRoomId]!.enemies!.map((e) => ({
			battleId: battle.id,
			entityId: e.id,
			entityType: "enemy",
			cachedHp: e.current_hp,
			turnOrder:
				shuffledParticipants.findIndex(
					(p) => p.id === e.id && p.type === "enemy"
				) + 1
		}))
	})

	// @TODO: maybe this should actually be a linked list? although i think lookups will be less efficient
	let initiativeOrder = [...adventurers, ...enemies].sort(
		(a, b) => a.turnOrder! - b.turnOrder!
	)

	let startedBattle = await prisma.battle.update({
		where: { id: battle.id },
		data: { currentTurnId: initiativeOrder[0]!.id, status: "active" }
	})

	while (isActive) {
		const activeEntity = initiativeOrder.find(
			(entity) => entity.id === startedBattle.currentTurnId
		)

		const targetedEntity = initiativeOrder.find(
			(entity) =>
				entity.cachedHp! > 0 &&
				entity.entityType ===
					(activeEntity?.entityType === "adventurer" ? "enemy" : "adventurer")
		)

		if (!targetedEntity) {
			console.log(
				`battle complete! Victory for the ${activeEntity?.entityType}`
			)
			await prisma.battle.update({
				where: { id: battle.id },
				data: {
					status: "completed",
					currentTurn: { disconnect: true }
				}
			})
			isActive = false
			break
		}

		const damage = Math.floor(Math.random() * 11)

		if (damage === 0) {
			console.log(
				`${activeEntity?.entityType} ${activeEntity?.entityId} tried to hit ${targetedEntity?.entityType} ${targetedEntity?.entityId} but missed!`
			)
		} else {
			const damageResult =
				targetedEntity!.cachedHp! - damage > 0
					? { decrement: damage }
					: { set: 0 }
			const updatedEntity = await prisma.battleParticipant.update({
				where: { id: targetedEntity!.id },
				data: { cachedHp: damageResult }
			})
			initiativeOrder = initiativeOrder.map((entity) =>
				entity.id === updatedEntity.id ? updatedEntity : entity
			)
			console.log(
				`${activeEntity?.entityType} ${activeEntity?.entityId} hit ${targetedEntity?.entityType} ${targetedEntity?.entityId} for ${damage} damage!`
			)
			console.log("damage result", damageResult)
			if (updatedEntity.cachedHp === 0) {
				console.log(
					`${updatedEntity.entityType} ${updatedEntity.entityId} knocked out!`
				)
			}
		}

		const activeIndex = initiativeOrder.findIndex(
			(i) => i.id === activeEntity?.id
		)

		// First try searching from current position to end
		let nextActiveEntity = initiativeOrder
			.slice(activeIndex + 1)
			.find((entity) => (entity.cachedHp as number) > 0)

		// If not found, wrap around to beginning and search up to (and incl.) current position
		if (!nextActiveEntity) {
			nextActiveEntity = initiativeOrder
				.slice(0, activeIndex + 1)
				.find((entity) => (entity.cachedHp as number) > 0)
		}

		startedBattle = await prisma.battle.update({
			where: { id: battle.id },
			data: { currentTurnId: nextActiveEntity!.id }
		})
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	// 	// roll for initiative (or maybe just random sort. does something other than an array of ids make sense here?)
	// 	// first character chooses target - lowest current_hp of opponents
	// 	// character chooses melee, ranged, or spell based on class and stats
	// 	// rolls 1d20, adds proficiency bonus (?), adds stat bonus, compares to opponent AC
	// 	// if attack roll > AC, attack hits. (or is it >=?)
	// 	// damage roll is 1d8 for everyone for now
	// 	// POST to something like /enemy/{id}, subtract from current_hp, check if it's now 0, and if it is update the enemy's is_knocked_out field and send that plus new_hp back to the requesting process.
	// 	// if they're knocked out, remove them from the round robin
	// 	// if that team no longer has players in the round robin, end the simulation. otherwise it's the next person's turn.

	// }
}

// @ts-expect-error
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
	let currentRoomId = run.currentRoomId

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
		const runs = await prisma.run.findMany()
		return c.json(runs)
	})
	.get("/:id", async (c) => {
		return c.json(["runs by run id"])
	})
	.post("/create", async (c) => {
		const { did, pid } = c.req.query()

		const newRun = await prisma.run.create({
			data: {
				dungeonId: Number(did),
				partyId: Number(pid),
				status: "pending"
			}
		})

		console.log(newRun)
		await sendMsg({
			dungeonId: newRun.dungeonId,
			partyId: newRun.partyId,
			roomId: 0,
			message: `new run created with id of ${newRun.id} for dungeon ${newRun.dungeonId}`
		})
		return c.json(newRun)
	})
	.post("/:id/execute", async (c) => {
		const { DM_API_URL, PM_API_URL } = env(c)

		const run = await prisma.run.findUnique({
			where: { id: Number(c.req.param("id")) }
		})

		const partyFetch = await fetch(`${PM_API_URL}/parties/${run?.partyId}`)
		const party: Party = await partyFetch.json()

		const dungeonFetch = await fetch(
			`${DM_API_URL}/dungeons/${run?.dungeonId}?include=rooms,rooms.enemies`
		)
		const { data: dungeon }: { data: Dungeon } = await dungeonFetch.json()

		const activatedRun = await prisma.run.update({
			where: { id: Number(c.req.param("id")) },
			data: { status: "active", currentRoomId: dungeon.rooms[0]!.id }
		})
		sendMsg({
			dungeonId: dungeon.id,
			partyId: party.id,
			roomId: dungeon.rooms[0]!.id,
			message: "The party has started the run in the dungeon!"
		})
		simulateRun({ run: activatedRun, party, dungeon })
		return c.json("run started")
	})

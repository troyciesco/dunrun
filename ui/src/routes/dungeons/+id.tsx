import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { Dungeon } from "@/types"
import { AnimatePresence } from "motion/react"
import { EventCard } from "@/components/EventCard"

export function DungeonRoute() {
	const params = useParams()
	const queryClient = useQueryClient()

	const query = useQuery<Dungeon>({
		queryKey: ["dungeons", params.id],
		queryFn: async () =>
			await fetch(`http://localhost:1111/dungeons/${params.id}`).then(
				async (data) => await data.json()
			)
	})

	const [messages, setMessages] = useState<any[]>([])
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:1111/ws")
		ws.onopen = () => {
			console.log("connected")
		}
		ws.onmessage = (event) => {
			const eventData = JSON.parse(event.data)
			const data = JSON.parse(eventData.body.data)
			if (Number(data.meta.dungeonId) === Number(params.id)) {
				setMessages((m) => [eventData, ...m])
			}
		}

		return () => {
			ws.close()
		}
	}, [params.id])

	const handleCreateRun = async () => {
		await fetch(
			`http://localhost:1111/runs/create?did=${Number(params.id)}&pid=1`,
			{
				method: "POST"
				// body: JSON.stringify({ dungeonId: Number(params.id), partyId: 1 })
			}
		)
		queryClient.invalidateQueries({ queryKey: ["dungeons", params.id] })
	}

	const handleExecuteRun = async (id: number) => {
		await fetch(`http://localhost:1111/runs/${id}/execute`, {
			method: "POST"
		})
	}

	return (
		<>
			<h1 className="mb-4 text-2xl">Dungeon: {query.data?.name}</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4 mb-10">
					{query.data &&
						query.data.rooms.map((room, index) => (
							<Link
								to={`/dungeons/${query.data?.id}/rooms/${room.number}`}
								key={room.id}
								className="hover:bg-red-200 p-4 border transition-all">
								<div>
									Room {index + 1} (id: {room.id})
								</div>
								<div>
									{room.enemies && room.enemies.map((e) => e.name).join(", ")}
								</div>
							</Link>
						))}
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<div className="flex gap-8 items-center mb-4">
							<h2 className="text-3xl">Runs</h2>
							<button
								className="p-2 border cursor-pointer"
								onClick={handleCreateRun}>
								Create Run
							</button>
						</div>
						<div>
							{query.data &&
								query.data.runs.map((run) => (
									<div key={run.id} className="flex gap-8 items-center">
										<div>
											id: {run.id} | partyId: {run.partyId}
										</div>
										<button
											className="p-2 border cursor-pointer"
											onClick={() => handleExecuteRun(run.id)}>
											Execute Run
										</button>
									</div>
								))}
						</div>
					</div>
					<div>
						<h2 className="text-3xl">Events</h2>
						<ul className="px-8 space-y-2">
							<AnimatePresence>
								{messages.map((message) => {
									const isKnockout = JSON.parse(
										message.body.data
									).message.includes("knocked out")
									return (
										<EventCard
											key={message.data.id}
											message={message}
											isKnockout={isKnockout}
										/>
									)
								})}
							</AnimatePresence>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

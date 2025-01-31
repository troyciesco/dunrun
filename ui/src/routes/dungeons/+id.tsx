import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"

export function DungeonRoute() {
	const params = useParams()
	const query = useQuery({
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
	}

	const handleExecuteRun = async () => {
		const res = await fetch(`http://localhost:1111/runs`)
		const runs = await res.json()
		const run = runs.find((r) => r.dungeonId === Number(params.id))
		await fetch(`http://localhost:1111/runs/${run.id}/execute`, {
			method: "POST"
		})
	}

	return (
		<>
			<h1 className="text-2xl mb-4">Dungeon: {query.data?.name}</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4 mb-10">
					{query.data &&
						query.data.rooms.map((room, index) => (
							<Link
								to={`/dungeons/${query.data?.id}/rooms/${room.id}`}
								key={room.id}
								className="p-4 border hover:bg-red-200 transition-all">
								<div>
									Room {index + 1} (id: {room.id})
								</div>
								<div>{room.enemies.join(", ")}</div>
							</Link>
						))}
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center gap-4">
						<button
							className="p-2 border cursor-pointer"
							onClick={handleCreateRun}>
							Create Run
						</button>
						<button
							className="p-2 border cursor-pointer"
							onClick={handleExecuteRun}>
							Execute Run
						</button>
					</div>
					<div>
						<h2 className="text-3xl">Events</h2>
						<div className="space-y-2">
							{messages &&
								messages.map((message) => (
									<div key={message.body.id}>
										{JSON.parse(message.body.data).message}
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

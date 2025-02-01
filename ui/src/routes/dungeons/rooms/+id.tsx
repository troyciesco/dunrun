import { Dungeon } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export function RoomRoute() {
	const params = useParams()
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
			if (
				Number(data.meta.dungeonId) === Number(params.id) &&
				Number(data.meta.roomId) === Number(params.roomId)
			) {
				setMessages((m) => [eventData, ...m])
			}
		}

		return () => {
			ws.close()
		}
	}, [params.id, params.roomId])

	return (
		<>
			<h1 className="mb-4 text-2xl">
				Dungeon: {query.data?.name} | Room : {params.roomId}
			</h1>
			<p>
				Enemies:{" "}
				{query.data &&
					query.data.rooms
						.find((r) => r.id === Number(params.roomId))!
						.enemies!.map((e) => e.name)
						.join(", ")}
			</p>
			<div className="max-w-7xl">
				<div className="grid grid-cols-2 gap-4">
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

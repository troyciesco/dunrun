import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

export function DungeonRoute() {
	const params = useParams()
	const query = useQuery({
		queryKey: ["dungeons", params.id],
		queryFn: async () =>
			await fetch(`http://localhost:1111/dm/${params.id}`).then(
				async (data) => await data.json()
			)
	})

	return (
		<>
			<h1 className="text-2xl mb-4">Dungeon: {query.data?.name}</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4">
					{query.data &&
						query.data.rooms.map((room, index) => (
							<div
								key={room.id}
								className="p-4 border hover:bg-red-200 transition-all">
								<div>
									Room {index + 1} (id: {room.id})
								</div>
								<div>{room.enemies.join(", ")}</div>
							</div>
						))}
				</div>
			</div>
		</>
	)
}

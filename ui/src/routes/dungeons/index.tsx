// import { API_URL } from "@/constants"
import { Dungeon } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

const API_URL = import.meta.env.VITE_API_URL
export function DungeonsRoute() {
	const query = useQuery({
		queryKey: ["dungeons"],
		queryFn: async () =>
			await fetch(`${API_URL}/dungeons`).then(
				async (data) => (await data.json()) as Dungeon[]
			)
	})

	return (
		<>
			<h1 className="mb-4 text-2xl">Dungeons</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4">
					{query.data &&
						query.data.map((dungeon) => (
							<Link
								// Start of Selection
								to={`/dungeons/${dungeon.id}`}
								key={dungeon.id}
								className="hover:bg-red-200 p-4 border transition-all">
								<div className="mb-2">
									<h2 className="text-xl font-bold">{dungeon.name}</h2>
									<p className="italic">{dungeon.location}</p>
								</div>
								<p>
									{dungeon.rooms.length} rooms |{" "}
									{dungeon.rooms.reduce(
										(acc, room) => acc + room.enemies!.length,
										0
									)}{" "}
									enemies
								</p>
							</Link>
						))}
				</div>
			</div>
		</>
	)
}

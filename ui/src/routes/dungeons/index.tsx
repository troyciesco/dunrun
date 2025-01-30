import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

export function DungeonsRoute() {
	const query = useQuery({
		queryKey: ["dungeons"],
		queryFn: async () =>
			await fetch("http://localhost:1111/dungeons").then(
				async (data) => await data.json()
			)
	})

	return (
		<>
			<h1 className="text-2xl mb-4">Dungeons</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4">
					{query.data &&
						query.data.map((dungeon) => (
							<Link
								// Start of Selection
								to={`/dungeons/${dungeon.id}`}
								key={dungeon.id}
								className="p-4 border hover:bg-red-200 transition-all">
								<div className="mb-2">
									<h2 className="text-xl font-bold">{dungeon.name}</h2>
									<p className="italic">{dungeon.location}</p>
								</div>
								<p>
									{dungeon.rooms.length} rooms |{" "}
									{dungeon.rooms.reduce(
										(acc, room) => acc + room.enemies.length,
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

import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

export function AdventurersRoute() {
	const query = useQuery({
		queryKey: ["adventurers"],
		queryFn: async () =>
			await fetch("http://localhost:1111/adventurers").then(
				async (data) => await data.json()
			)
	})

	return (
		<>
			<h1 className="text-2xl mb-4">Adventurers</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4">
					{query.data &&
						query.data.map((adventurer) => (
							<Link
								// Start of Selection
								to={`/adventurers/${adventurer.id}`}
								key={adventurer.id}
								className="p-4 border hover:bg-red-200 transition-all">
								<div className="mb-2">
									<h2 className="text-xl font-bold">{adventurer.name}</h2>
									<p className="italic">
										{adventurer.species} {adventurer.class}
									</p>
								</div>
							</Link>
						))}
				</div>
			</div>
		</>
	)
}

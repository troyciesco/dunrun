import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router"

export function PartyRoute() {
	const params = useParams()
	const query = useQuery({
		queryKey: ["parties", params.id],
		queryFn: async () =>
			await fetch(`http://localhost:1111/parties/${params.id}`).then(
				async (data) => await data.json()
			)
	})

	return (
		<>
			<h1 className="text-2xl mb-4">Party: {query.data?.id}</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4">
					{query.data &&
						query.data.adventurers.map((adventurer) => (
							<Link
								// Start of Selection
								to={`/adventurers/${adventurer.adventurerId}`}
								key={adventurer.adventurerId}
								className="p-4 border hover:bg-red-200 transition-all">
								<div className="mb-2">
									<h2 className="text-xl font-bold">
										{adventurer.adventurerId}
									</h2>
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

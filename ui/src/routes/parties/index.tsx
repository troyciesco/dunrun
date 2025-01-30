import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

export function PartiesRoute() {
	const query = useQuery({
		queryKey: ["parties"],
		queryFn: async () =>
			await fetch("http://localhost:1111/parties").then(
				async (data) => await data.json()
			)
	})

	return (
		<>
			<h1 className="text-2xl mb-4">Parties</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4">
					{query.data &&
						query.data.map((party) => (
							<Link
								// Start of Selection
								to={`/parties/${party.id}`}
								key={party.id}
								className="p-4 border hover:bg-red-200 transition-all">
								<div className="mb-2">
									<h2 className="text-xl font-bold">{party.id}</h2>
								</div>
								<p>{party.adventurers.length} adventurers</p>
							</Link>
						))}
				</div>
			</div>
		</>
	)
}

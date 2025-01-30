import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

export function AdventurerRoute() {
	const params = useParams()
	const query = useQuery({
		queryKey: ["adventurers", params.id],
		queryFn: async () =>
			await fetch(`http://localhost:1111/adventurers/${params.id}`).then(
				async (data) => await data.json()
			)
	})

	return (
		<>
			<h1 className="text-2xl mb-4">Adventurer: {query.data?.name}</h1>
			<div className="max-w-7xl">
				<div className="grid grid-cols-4 gap-4">
					<pre>{JSON.stringify(query.data, null, 2)}</pre>
				</div>
			</div>
		</>
	)
}

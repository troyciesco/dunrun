import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
	name: z.string().min(1, { message: "A name for the dungeon is required" }),
	// location: z.string().min(1, { message: "A location is required" })
	location: z.enum(["Alpha", "Bravo", "Charlie"], {
		message: "gotta be alpha or bravo or charlie"
	})
})

export function DungeonCreateRoute() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	})

	return (
		<>
			<div>Create a dungeon</div>
			<form onSubmit={handleSubmit((d) => console.log(d))}>
				<input className="border" {...register("name")} />
				{errors.name?.message && <p>{errors.name?.message.toString()}</p>}
				<input className="border" {...register("location")} />
				{errors.location?.message && (
					<p>{errors.location?.message.toString()}</p>
				)}
				<button>Submit</button>
			</form>
		</>
	)
}

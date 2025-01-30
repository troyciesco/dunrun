import { useForm } from "react-hook-form"
import { arktypeResolver } from "@hookform/resolvers/arktype"
import { type } from "arktype"

const adventurerSpecies = [
	"Dwarf",
	"Elf",
	"Halfling",
	"Human",
	"Dragonborn",
	"Gnome",
	"Half-Elf",
	"Half-Orc",
	"Tiefling"
] as const

const schema = type({
	name: type.string.moreThanLength(7).describe("at least seven chars fam"),
	species: type.enumerated([...adventurerSpecies]).describe("a valid species"),
	class: "string>1"
})

export function AdventurerCreateRoute() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: arktypeResolver(schema)
	})

	return (
		<div>
			<h1>Create an Adventurer</h1>
			<form onSubmit={handleSubmit((d) => console.log(d))}>
				<div>
					<label>
						Name
						<input className="border" {...register("name")} />
					</label>
					<p>{errors.name?.message?.toString()}</p>
				</div>
				<div>
					<label>
						Species
						<input className="border" {...register("species")} />
					</label>
					<p>{errors.species?.message?.toString()}</p>
				</div>
				<div>
					<label>
						Class
						<input className="border" {...register("class")} />
					</label>
					<p>{errors.class?.message?.toString()}</p>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

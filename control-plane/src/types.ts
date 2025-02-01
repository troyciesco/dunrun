type Species =
	| "Dragonborn"
	| "Dwarf"
	| "Elf"
	| "Gnome"
	| "Halfling"
	| "Half-Elf"
	| "Half-Orc"
	| "Human"
	| "Tiefling"

type AdventurerClass =
	| "Barbarian"
	| "Bard"
	| "Cleric"
	| "Druid"
	| "Fighter"
	| "Monk"
	| "Paladin"
	| "Ranger"
	| "Rogue"
	| "Sorcerer"
	| "Warlock"
	| "Wizard"

export type Adventurer = {
	id: number
	name: string
	species: Species
	class: AdventurerClass
	level: number
	strength: number
	dexterity: number
	constitution: number
	intelligence: number
	wisdom: number
	charisma: number
	hp_base: number
	hp_current: number
}

export type Party = {
	id: number
	adventurers: { adventurerId: number }[]
}

export type Room = {
	id: number
	enemies: string[]
}

export type Dungeon = {
	id: number
	name: string
	location: string
	rooms: Room[]
}

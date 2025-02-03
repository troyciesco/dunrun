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
	adventurers: Adventurer[]
}

export type Enemy = {
	id: number
	room_id: number | null
	name: string
	base_type: string
	tier: string
	is_unique: boolean
	current_hp: number
	max_hp: number
	is_alive: boolean
	is_available: boolean
}

export type Room = {
	id: number
	enemy_types?: string[]
	unique_enemies?: string[]
	enemies?: Enemy[]
}

export type Dungeon = {
	id: number
	name: string
	location: string
	rooms: Room[]
}

export type Env = {
	Bindings: {
		DM_API_URL: string
		PM_API_URL: string
	}
}

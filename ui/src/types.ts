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

export type EnemyType = {
	id: number
	name: string
	base_type: string
	tier: string
	available_count: number
	created_at: string
	updated_at: string
}

export type UniqueEnemy = {
	id: number
	enemy_type_id: number | null
	name: string
	is_available: boolean
	created_at: string
	updated_at: string
	base_type: string
	category: string
	room_id: number
}

export type Room = {
	id: number
	enemy_types?: string[]
	unique_enemies?: string[]
	enemies?: (EnemyType | UniqueEnemy)[]
}

export type Dungeon = {
	id: number
	name: string
	location: string
	rooms: Room[]
}

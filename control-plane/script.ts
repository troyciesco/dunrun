async function getRandomAdventurers() {
	const res = await fetch("http://localhost:9999/adventurers")
	const adventurers = await res.json()
	const shuffled = [...adventurers].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, 2)
}

async function sendBattleMessage(message: string) {
	await fetch("http://localhost:1111/messages", {
		method: "POST",
		body: message
	})
}

async function battle() {
	const [fighter1, fighter2] = await getRandomAdventurers()
	let currentAttacker = fighter1
	let currentDefender = fighter2

	setInterval(async () => {
		const damage = Math.floor(Math.random() * 20) + 1
		const hits = Math.random() < 0.7

		let message
		if (hits) {
			message = `${currentAttacker.name} deals ${damage} damage to ${currentDefender.name}!`
		} else {
			message = `${currentAttacker.name} tries to deal ${damage} damage to ${currentDefender.name} but misses!`
		}

		await sendBattleMessage(message)

		// Swap attacker and defender
		const temp = currentAttacker
		currentAttacker = currentDefender
		currentDefender = temp
	}, 1000)
}

battle().catch(console.error)

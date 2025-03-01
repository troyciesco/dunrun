// import { useAuth } from "@clerk/react-router"
import { Message } from "@/types"
import { EventCard } from "../components/EventCard"
import { AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import { Link } from "react-router"

export function Home() {
	// const { getToken } = useAuth()
	const [messages, setMessages] = useState<Message[]>([])
	// info about double messages https://github.com/facebook/create-react-app/issues/10387
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:1111/ws")
		ws.onopen = () => {
			console.log("connected")
		}
		ws.onmessage = (event) => {
			console.log(event)
			setMessages((m) => [...m, event.data as string])
		}

		return () => {
			ws.close()
		}
	}, [])

	const handleClick = async () => {
		await fetch(`http://localhost:1111/messages`, {
			method: "POST",
			body: JSON.stringify({ message: "hiiii" })
		})
	}

	// const handleCheckAuth = async () => {
	// 	console.log("hit")
	// 	const token = await getToken()
	// 	const res = await fetch(`http://localhost:1111`, {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${token}`
	// 		}
	// 	})
	// 	const data = await res.json()
	// 	console.log(data)
	// }
	return (
		<div>
			<h1 className="mb-10 text-7xl">hello world</h1>
			<div className="flex gap-4 items-center">
				<button
					className="px-4 py-2 border cursor-pointer"
					onClick={handleClick}>
					post to events
				</button>
				{/* <button
					className="px-4 py-2 border cursor-pointer"
					onClick={handleCheckAuth}>
					check auth
				</button> */}
			</div>
			<Link to="/dungeons">Go to dungeons</Link>
			<AnimatePresence>
				{messages.map((message) => {
					const isKnockout =
						message.body &&
						JSON.parse(message.body?.data).message.includes("knocked out")

					const parsedMessage = JSON.parse(message)
					return (
						<EventCard
							key={parsedMessage.body.id}
							message={parsedMessage}
							isKnockout={isKnockout}
						/>
					)
				})}
			</AnimatePresence>
		</div>
	)
}

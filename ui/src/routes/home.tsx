import { useEffect, useState } from "react"
import { Link } from "react-router"

export function Home() {
	const [messages, setMessages] = useState<string[]>([])
	// info about double messages https://github.com/facebook/create-react-app/issues/10387
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:1111/ws")
		ws.onopen = () => {
			console.log("connected")
		}
		ws.onmessage = (event) => {
			setMessages((m) => [...m, event.data as string])
		}

		return () => {
			ws.close()
		}
	}, [])

	return (
		<div className="bg-red-400">
			<h1 className="text-7xl">hello world</h1>
			<Link to="/dungeons">Go to dungeons</Link>
			{messages.map((message) => (
				<div key={message}>{message}</div>
			))}
		</div>
	)
}

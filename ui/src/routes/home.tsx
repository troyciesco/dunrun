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
			body: "hiiii"
		})
	}
	return (
		<div className="bg-red-400">
			<h1 className="text-7xl">hello world</h1>
			<button onClick={handleClick}>clickkk</button>
			<Link to="/dungeons">Go to dungeons</Link>
			{messages.map((message) => (
				<div key={message}>{message}</div>
			))}
		</div>
	)
}

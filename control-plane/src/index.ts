import { Hono } from "hono"
import { cors } from "hono/cors"
import { dungeons } from "./routes/dungeons"
import { adventurers } from "./routes/adventurers"
import { parties } from "./routes/parties"
import { createBunWebSocket } from "hono/bun"
import { createMessageRoutes } from "./routes/messages"

const topic = "anonymous-chat-room"

const app = new Hono()
const { upgradeWebSocket, websocket } = createBunWebSocket<any>()

app.use("/*", cors())

app.get("/", (c) => {
	return c.text("Hello Hono!")
})

app.route("/", dungeons)
app.route("/", adventurers)
app.route("/", parties)

app.get(
	"/ws",
	upgradeWebSocket((_c) => {
		return {
			onOpen(_event, ws) {
				const rawWs = ws.raw
				rawWs.subscribe(topic)
				console.log(
					`WebSocket server opened and subscribed to topic '${topic}'`
				)
			},
			onClose(_event, ws) {
				const rawWs = ws.raw
				rawWs.unsubscribe(topic)
				console.log(
					`WebSocket server closed and unsubscribed from topic '${topic}'`
				)
			}
		}
	})
)

const port = 1111
console.log(`Server is running on http://localhost:${port}`)

const server = Bun.serve({
	fetch: app.fetch,
	port,
	websocket
})

app.route("/", createMessageRoutes(server))

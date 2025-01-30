import { Hono } from "hono"
import { cors } from "hono/cors"
import { dungeons } from "./routes/dungeons"
import { adventurers } from "./routes/adventurers"
import { parties } from "./routes/parties"
import { createBunWebSocket } from "hono/bun"

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
	upgradeWebSocket((c) => {
		let intervalId: any

		return {
			onOpen(_event, ws) {
				intervalId = setInterval(() => {
					ws.send(new Date().toString())
				}, 1000)
			},
			onClose() {
				clearInterval(intervalId)
			}
		}
	})
)

const port = 1111
console.log(`Server is running on http://localhost:${port}`)

export default {
	fetch: app.fetch,
	port,
	websocket
}

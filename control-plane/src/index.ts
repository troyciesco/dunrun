import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { dungeons } from "./routes/dungeons"

const app = new Hono()

app.use("/*", cors())

app.get("/", (c) => {
	return c.text("Hello Hono!")
})

app.route("/", dungeons)

const port = 1111
console.log(`Server is running on http://localhost:${port}`)

serve({
	fetch: app.fetch,
	port
})

import { NavLink, Route, Routes } from "react-router"
import { Home } from "./routes/home"
import { Dungeons } from "./routes/dungeons"
import { DungeonRoute } from "./routes/dungeons/+id"
import { DungeonCreateRoute } from "./routes/dungeons/create"

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="p-4 border-b">DunRun</div>
			<div className="grid grid-cols-12 w-full min-h-[calc(100vh-57px)]">
				<div className="space-y-10  col-span-2 p-4 border-r">
					<ul className="flex flex-col">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
					</ul>
					<ul className="flex flex-col">
						<li>
							<NavLink to="/dungeons">Dungeons</NavLink>
						</li>
						<li>
							<NavLink to="/dungeons/create">Create a Dungeon</NavLink>
						</li>
					</ul>
					<ul className="flex flex-col">
						<li>
							<NavLink to="/adventurers">Adventurers</NavLink>
						</li>
						<li>
							<NavLink to="/adventurers/create">Create an Adventurer</NavLink>
						</li>
					</ul>
					<ul className="flex flex-col">
						<li>
							<NavLink to="/parties">Parties</NavLink>
						</li>

						<li>
							<NavLink to="/parties/create">Create a Party</NavLink>
						</li>
					</ul>
				</div>
				<main className="col-span-10 p-4">
					<Routes>
						<Route index element={<Home />} />
						<Route path="dungeons">
							<Route index element={<Dungeons />} />
							<Route path=":id" element={<DungeonRoute />} />
							<Route path="create" element={<DungeonCreateRoute />} />
						</Route>
					</Routes>
				</main>
			</div>
		</div>
	)
}

export default App

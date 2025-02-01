import { NavLink, Route, Routes } from "react-router"
import { Home } from "./routes/home"
import { DungeonsRoute } from "./routes/dungeons"
import { DungeonRoute } from "./routes/dungeons/+id"
import { DungeonCreateRoute } from "./routes/dungeons/create"
import { AdventurersRoute } from "./routes/adventurers"
import { AdventurerRoute } from "./routes/adventurers/+id"
import { AdventurerCreateRoute } from "./routes/adventurers/create"
import { PartiesRoute } from "./routes/parties"
import { PartyRoute } from "./routes/parties/+id"
import { PartyCreateRoute } from "./routes/parties/create"
import { RoomRoute } from "./routes/dungeons/rooms/+id"
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton
} from "@clerk/react-router"

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="p-4 border-b flex items-center justify-between">
				<div>DunRun</div>
				<div>
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</header>
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
							<Route index element={<DungeonsRoute />} />
							<Route path=":id">
								<Route index element={<DungeonRoute />} />
								<Route path="rooms/:roomId" element={<RoomRoute />} />
							</Route>
							<Route path="create" element={<DungeonCreateRoute />} />
						</Route>
						<Route path="adventurers">
							<Route index element={<AdventurersRoute />} />
							<Route path=":id" element={<AdventurerRoute />} />
							<Route path="create" element={<AdventurerCreateRoute />} />
						</Route>
						<Route path="parties">
							<Route index element={<PartiesRoute />} />
							<Route path=":id" element={<PartyRoute />} />
							<Route path="create" element={<PartyCreateRoute />} />
						</Route>
					</Routes>
				</main>
			</div>
		</div>
	)
}

export default App

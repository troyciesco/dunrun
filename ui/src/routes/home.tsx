import { Link } from "react-router"

export function Home() {
	return (
		<div className="bg-red-400">
			<h1 className="text-7xl">hello world</h1>
			<Link to="/dungeons">Go to dungeons</Link>
		</div>
	)
}

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router"
// import { ClerkProvider } from "@clerk/react-router"

const queryClient = new QueryClient()

// for react/go example: https://github.com/encoredev/examples/tree/main/clerk
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
// 	throw new Error("Missing Publishable Key")
// }

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				{/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
				<App />
				{/* </ClerkProvider> */}
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
)

import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Context from "./Context";
import Loader from "./components/Loader";
import ErrorPage from "./Pages/Error/ErrorPage";

const Home = lazy(() => import("./Pages/Home/Home"));
const Game = lazy(() => import("./Pages/Game/Game"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/game",
		element: <Game />,
		errorElement: <ErrorPage />,
	},
]);

export default function App() {
	return (
		<Context>
			<Suspense fallback={<Loader />}>
				<RouterProvider router={router} />
			</Suspense>
		</Context>
	);
}

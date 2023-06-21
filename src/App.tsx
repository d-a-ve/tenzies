import React, { Suspense } from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Context from "./Context";
import Loader from "./components/Loader";
import ErrorPage from "./Pages/Error/ErrorPage";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_FIREBASE_APPID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

const Home = React.lazy(() => import("./Pages/Home/Home"));
const Game = React.lazy(() => import("./Pages/Game/Game"));

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

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default function App() {
	return (
		<Context>
			<Suspense fallback={<Loader />}>
				<RouterProvider router={router} />
			</Suspense>
		</Context>
	);
}

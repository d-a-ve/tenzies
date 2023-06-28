import { ReactNode, useState, createContext } from "react";

export const GlobalContext = createContext({});

export default function Context({ children }: { children: ReactNode }) {
	const [tenziesStats, setTenziesStats] = useState({
		minutes: 0,
		seconds: 0,
	});
	const [rolls, setRolls] = useState(0)
	const [isGameOver, setIsGameOver] = useState(false);

	return (
		<GlobalContext.Provider
			value={{
				isGameOver,
				setIsGameOver,
				tenziesStats,
				setTenziesStats,
				rolls,
				setRolls
			}}>
			{children}
		</GlobalContext.Provider>
	);
}

import { ReactNode, useState, createContext } from "react";

export const GlobalContext = createContext({});

export default function Context({ children }: { children: ReactNode }) {
	const [isGameOver, setIsGameOver] = useState(false);
	const [rolls, setRolls] = useState(0);



	return (
		<GlobalContext.Provider
			value={{
				isGameOver,
				setIsGameOver,
				rolls, setRolls
			}}>
			{children}
		</GlobalContext.Provider>
	);
}

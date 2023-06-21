import React, { ReactNode } from "react";

export const GlobalContext = React.createContext({});

export default function Context({ children }: { children: ReactNode }) {
	const [isGameOver, setIsGameOver] = React.useState(false);
	const [usersScores, setUsersScores] = React.useState<any[]>();
	const [minutes, setMinutes] = React.useState(0);
	const [seconds, setSeconds] = React.useState(0);


	return (
		<GlobalContext.Provider
			value={{
				isGameOver,
				setIsGameOver,
				usersScores,
				setUsersScores,
				minutes,
				setMinutes,
				seconds,
				setSeconds
			}}>
			{children}
		</GlobalContext.Provider>
	);
}

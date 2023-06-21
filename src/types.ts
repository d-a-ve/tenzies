export type UserType = {
	email: string | null;
	name: string | null;
	uid: string | null;
};

export type UserStatsType = {
	name: string;
	uid: string;
	numOfRolls: number;
	gameTime: number;
}[];

export type HOFType = {
	setUsersScores: React.Dispatch<React.SetStateAction<any[] | undefined>>;
	usersScores: any[] | undefined
};

export type DiePropsType = {
	value: number;
	isHeld: boolean;
	id: string;
	hold: (id: string) => void;
};

export type HOFSingleType = {
	pos: number;
	name: string;
	timeSpent: string;
	numberOfRolls: string;
};

export type HighScoreModalType = {
	time: string;
	numOfRolls: number;
	signIn: () => void;
	playGame: () => void;
	btnLoading?: boolean
}
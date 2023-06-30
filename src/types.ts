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

export type DiePropsType = {
	value: number;
	isHeld: boolean;
	id: string;
	hold: (id: string) => void;
};

export type HallOfFameSingleType = {
	pos: number;
	name: string;
	timeSpent: string;
	numberOfRolls: number;
};

export type HighScoreModalType = {
	time: string;
	numOfRolls: number;
	signIn: () => void;
	playGame: () => void;
	btnLoading?: boolean
}

export type tenziesStatsType = {
	minutes: number;
	seconds: number;
	rolls: number;
};

export type ModalFooterType = {
	signIn: () => void;
	playGame: () => void;
	showJoinBtn: boolean;
	btnLoading?: boolean;
};
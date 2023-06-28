import { DiePropsType } from "../types";

export default function Die({ id, value, isHeld, hold }: DiePropsType) {
	return (
		<div
			onClick={() => hold(id)}
			className={`die-face ${isHeld ? "green" : "white"}`}>
			<p className="die-value">{value}</p>
		</div>
	);
}

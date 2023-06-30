import { HallOfFameSingleType } from "../types";

export default function HallOfFameSingle({
	pos,
	name,
	timeSpent,
	numberOfRolls,
}: HallOfFameSingleType) {
	return (
		<tr className="HOF-row">
			<td>{pos}</td>
			<td>{name}</td>
			<td>{timeSpent}</td>
			<td>{numberOfRolls}</td>
		</tr>
	);
}

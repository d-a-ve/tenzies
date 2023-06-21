import React from "react";
import { HOFSingleType } from "../types";

export default function HallOfFameSingle({
	pos,
	name,
	timeSpent,
	numberOfRolls,
}: HOFSingleType) {
	return (
		<tr className="HOF-row">
			<td>{pos}</td>
			<td>{name}</td>
			<td>{timeSpent}</td>
			<td>{numberOfRolls}</td>
		</tr>
	);
}

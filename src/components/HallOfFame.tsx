import { useState, useEffect } from "react";
import useFirebase from "../hooks/useFirebase";
import { formatTimeToMinsSecs } from "../helpers";
import HallOfFameSingle from "./HallOfFameSingle";
import Loader from "./Loader";

export default function HallOfFame() {
	const [loading, setLoading] = useState(true);
	const { getUsersScores } = useFirebase();
	const [usersScores, setUsersScores] = useState({}) as any;

	useEffect(() => {
		const fetchHallOfFame = async () => {
			const scores = await getUsersScores()
				.then((res) => res.sort((a, b) => a.gameTime - b.gameTime))
				.then((scores) =>
					scores.map((user, i) => {
						return (
							<HallOfFameSingle
								key={user.uid}
								pos={i + 1}
								name={user.name}
								timeSpent={formatTimeToMinsSecs(user.gameTime)}
								numberOfRolls={user.numOfRolls}
							/>
						);
					})
				);
			setLoading(false);
			setUsersScores(scores);
		};
		fetchHallOfFame();
	}, []);

	return (
		<div className="HOF">
			<h4 className="HOF-title">HALL OF FAME</h4>
			{loading ? (
				<Loader />
			) : (
				<div className="HOF-table-container">
					<table className="HOF-table">
						<thead>
							<tr className="HOF-row">
								<th className="col-1">POS</th>
								<th className="col-2">NAME</th>
								<th className="col-3">TIME</th>
								<th className="col-4">ROLLS</th>
							</tr>
						</thead>
						<tbody className="HOF-table-body">{usersScores}</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

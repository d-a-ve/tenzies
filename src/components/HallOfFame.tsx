import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../App";
import HallOfFameSingle from "./HallOfFameSingle";
import { HOFType } from "../types";
import { formatTimeToMinsSecs } from "../helpers";
import Loader from "./Loader";

export default function HallOfFame({
	usersScores,
	setUsersScores,
}: HOFType) {
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const getHOF = async () => {
			const scores = await getUsersScores()
				.then((res) => res.sort((a, b) => a.gameTime - b.gameTime))
				.then((scores) =>
					scores.map((user, i) => {
						return (
							<HallOfFameSingle
								key={user.uid}
								pos={i + 1}
								name={user.name}
								timeSpent={user.gameTime}
								numberOfRolls={user.numOfRolls}
							/>
						);
					})
				);
			setLoading(false);
			setUsersScores(scores);
		};
		getHOF();
	}, []);

	async function getUsersScores() {
		const res: any[] = [];
		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
			const { name, uid, numOfRolls, gameTime } = doc.data();
			res.push({
				name: name,
				uid: uid,
				numOfRolls: numOfRolls,
				gameTime: formatTimeToMinsSecs(gameTime),
			});
		});
		return res;
	}

	return (
		<div className="HOF">
			<h4 className="HOF-title">HALL OF FAME</h4>
			{loading ? (
				<Loader />
			) : (
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
			)}
		</div>
	);
}

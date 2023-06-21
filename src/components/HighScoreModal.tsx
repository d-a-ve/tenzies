import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../Context";
import HallOfFame from "./HallOfFame";
import ModalFooter from "./ModalFooter";
import { HighScoreModalType } from "../types";

export default function HighScoreModal({
	time,
	numOfRolls,
	signIn,
	playGame, btnLoading
}: HighScoreModalType) {

	return (
		<div className="modal">
			<div className="modal-stats">
				<h4>Congratulations &#127881; &#127881;</h4>
				<p>
					Time used: <strong>{time}</strong>
				</p>
				<p>
					Number of rolls: <strong>{numOfRolls}</strong>
				</p>
			</div>
			<div className="modal-details-container">
				<p>
					Add your name to the Hall of Fame by signing-in with your Google
					Account
				</p>
				<ModalFooter btnLoading={btnLoading} showJoin={true} signIn={signIn} playGame={playGame} />
			</div>
		</div>
	);
}
